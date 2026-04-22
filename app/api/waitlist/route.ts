import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

type WaitlistEntry = {
  email: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const WAITLIST_FILE = path.join(DATA_DIR, "waitlist.json");
const WAITLIST_NOTIFY_EMAIL = process.env.WAITLIST_NOTIFY_EMAIL || "mikilezen@gmail.com";
const RESEND_API_URL = "https://api.resend.com/emails";
const RESEND_AUDIENCE_API_URL = "https://api.resend.com/audiences";
const WAITLIST_RESEND_AUDIENCE_ID = process.env.WAITLIST_RESEND_AUDIENCE_ID?.trim();
type WaitlistEmailStatus = "sent" | "not-configured" | "failed";
type WaitlistAudienceStatus = "added" | "already-exists" | "not-configured" | "failed";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function readWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const content = await fs.readFile(WAITLIST_FILE, "utf-8");
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (readError) {
    console.error("Waitlist file read failed:", readError);
    return [];
  }
}

async function writeWaitlist(entries: WaitlistEntry[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

async function sendWaitlistNotification(
  subscriberEmail: string,
  options: { notifyAdmin?: boolean } = {}
): Promise<WaitlistEmailStatus> {
  const { notifyAdmin = true } = options;
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.WAITLIST_FROM_EMAIL || "onboarding@resend.dev";

  if (!resendApiKey) {
    return "not-configured";
  }

  const sendEmail = async ({ to, subject, text }: { to: string; subject: string; text: string }) => {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject,
        text,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      throw new Error(errorBody || "Failed to send waitlist email.");
    }
  };

  try {
    if (notifyAdmin) {
      await sendEmail({
        to: WAITLIST_NOTIFY_EMAIL,
        subject: "New Waitlist Registration",
        text: [
          "A new user has joined the waitlist.",
          "",
          `Email: ${subscriberEmail}`,
          `Registered at: ${new Date().toISOString()}`,
        ].join("\n"),
      });
    }

    await sendEmail({
      to: subscriberEmail,
      subject: "Thank You for Joining the Waitlist",
      text: [
        "Thank you for your interest.",
        "",
        "Your email has been successfully added to our waitlist.",
        "We will contact you with updates and next steps as soon as they are available.",
        "",
        "Best regards,",
        "https://megent.dev",
        "https://github.com/megents/megent",
        "if you want to unsubscribe go to megent.dev/unsubscribe"
      ].join("\n"),
    });

    return "sent";
  } catch (notificationError) {
    console.error("Waitlist email notification failed:", notificationError);
    return "failed";
  }
}

async function addWaitlistContactToResend(email: string): Promise<WaitlistAudienceStatus> {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();

  if (!resendApiKey || !WAITLIST_RESEND_AUDIENCE_ID) {
    return "not-configured";
  }

  try {
    const response = await fetch(`${RESEND_AUDIENCE_API_URL}/${WAITLIST_RESEND_AUDIENCE_ID}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
      }),
    });

    if (response.ok) {
      return "added";
    }

    const rawError = await response.text().catch(() => "");
    const normalized = rawError.toLowerCase();
    if (response.status === 409 || normalized.includes("already") || normalized.includes("exists")) {
      return "already-exists";
    }

    throw new Error(rawError || "Failed to create Resend contact.");
  } catch (contactError) {
    console.error("Resend audience contact create failed:", contactError);
    return "failed";
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as { email?: string };
    const normalizedEmail = body.email?.trim().toLowerCase();

    if (!normalizedEmail || !EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json({ message: "Please provide a valid email." }, { status: 400 });
    }

    const entries = await readWaitlist();
    const alreadyExists = entries.some((entry) => entry.email.toLowerCase() === normalizedEmail);

    if (alreadyExists) {
      const emailStatus = await sendWaitlistNotification(normalizedEmail, { notifyAdmin: false });

      if (emailStatus === "sent") {
        return NextResponse.json(
          {
            message: "Your email is already registered on the waitlist. A confirmation email has been re-sent.",
            emailStatus,
            audienceStatus: "already-exists",
          },
          { status: 200 }
        );
      }

      if (emailStatus === "failed") {
        return NextResponse.json(
          {
            message:
              "Your email is already registered, but we could not send a confirmation right now. Please try again shortly.",
            emailStatus,
            audienceStatus: "already-exists",
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          message: "Your email is already registered on the waitlist.",
          emailStatus,
          audienceStatus: "already-exists",
        },
        { status: 200 }
      );
    }

    entries.push({
      email: normalizedEmail,
      createdAt: new Date().toISOString(),
    });

    const audienceStatus = await addWaitlistContactToResend(normalizedEmail);

    let persisted = true;
    try {
      await writeWaitlist(entries);
    } catch (writeError) {
      persisted = false;
      console.error("Waitlist file write failed:", writeError);
    }

    const emailStatus = await sendWaitlistNotification(normalizedEmail);

    if (audienceStatus === "failed" && !persisted && emailStatus !== "sent") {
      return NextResponse.json(
        {
          message: "Waitlist is temporarily unavailable. Please try again in a few minutes.",
          emailStatus,
          audienceStatus,
        },
        { status: 503 }
      );
    }

    if (!persisted) {
      if (emailStatus === "sent") {
        return NextResponse.json(
          {
            message:
              "Your waitlist registration has been received successfully. A confirmation email has been sent.",
            emailStatus,
            audienceStatus,
          },
          { status: 201 }
        );
      }

      return NextResponse.json(
        {
          message:
            "Your request was received. If you do not get a confirmation message, please try again later.",
          emailStatus,
          audienceStatus,
        },
        { status: 202 }
      );
    }

    const message =
      emailStatus === "sent"
        ? "Your waitlist registration has been received successfully. A confirmation email has been sent."
        : "Your waitlist registration has been received successfully.";

    return NextResponse.json(
      {
        message,
        emailStatus,
        audienceStatus,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ message: "We could not process your request at this time. Please try again." }, { status: 500 });
  }
}
