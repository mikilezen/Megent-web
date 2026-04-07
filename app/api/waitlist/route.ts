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
type WaitlistEmailStatus = "sent" | "not-configured" | "failed";

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

async function sendWaitlistNotification(subscriberEmail: string): Promise<WaitlistEmailStatus> {
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
        " Megent",
      ].join("\n"),
    });

    return "sent";
  } catch (notificationError) {
    console.error("Waitlist email notification failed:", notificationError);
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
      return NextResponse.json({ message: "Your email is already registered on the waitlist." }, { status: 200 });
    }

    entries.push({
      email: normalizedEmail,
      createdAt: new Date().toISOString(),
    });

    let persisted = true;
    try {
      await writeWaitlist(entries);
    } catch (writeError) {
      persisted = false;
      console.error("Waitlist file write failed:", writeError);
    }

    const emailStatus = await sendWaitlistNotification(normalizedEmail);

    if (!persisted && emailStatus !== "sent") {
      return NextResponse.json(
        {
          message: "Waitlist is temporarily unavailable. Please try again in a few minutes.",
          emailStatus,
        },
        { status: 503 }
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
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ message: "We could not process your request at this time. Please try again." }, { status: 500 });
  }
}
