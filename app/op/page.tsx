import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agent Operations Platform | Megent OP",
  description:
    "Megent OP centralizes operations, routing, and governance for production AI agents. Control tool calls, enforce policy, and monitor risk in one place.",
  alternates: {
    canonical: "/op",
  },
  keywords: [
    "AI agent operations platform",
    "Megent OP",
    "AI operations",
    "agent routing",
    "AI governance",
    "production AI agents",
    "tool call governance",
  ],
  openGraph: {
    title: "AI Agent Operations Platform | Megent OP",
    description:
      "Centralized operations, routing, and governance for production AI agents with runtime control and policy enforcement.",
    url: "https://megent.dev/op",
    type: "website",
    images: [
      {
        url: "/freepik__adjust__68767.png",
        width: 1200,
        height: 630,
        alt: "Megent OP Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Operations Platform | Megent OP",
    description:
      "Centralized operations and governance for production AI agents with policy enforcement.",
    images: ["/freepik__adjust__68767.png"],
  },
};

export default function OpPage() {
  return (
    <main className="min-h-screen bg-[#f3f5f8] text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-20">
        <div className="space-y-4">
          <p className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
            OP
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Megent Operations</h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Centralized operations, routing, and governance for AI agents in production.
          </p>
        </div>
      </section>
    </main>
  );
}
