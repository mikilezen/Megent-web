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

async function sendWaitlistNotification(subscriberEmail: string) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.WAITLIST_FROM_EMAIL || "onboarding@resend.dev";

  if (!resendApiKey) {
    throw new Error("Notification skipped: missing RESEND_API_KEY.");
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [WAITLIST_NOTIFY_EMAIL],
      subject: `New waitlist signup: ${subscriberEmail}`,
      text: [
        "A new user joined your waitlist.",
        "",
        `Email: ${subscriberEmail}`,
        `Joined at: ${new Date().toISOString()}`,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(errorBody || "Failed to send waitlist notification email.");
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
      return NextResponse.json({ message: "You're already on the waitlist." }, { status: 200 });
    }

    entries.push({
      email: normalizedEmail,
      createdAt: new Date().toISOString(),
    });

    try {
      await writeWaitlist(entries);
    } catch (writeError) {
      console.error("Waitlist file write failed:", writeError);
    }

    try {
      await sendWaitlistNotification(normalizedEmail);
    } catch (notificationError) {
      console.error("Waitlist email notification failed:", notificationError);
    }

    return NextResponse.json({ message: "Joined waitlist successfully." }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Failed to join waitlist. Please try again." }, { status: 500 });
  }
}
