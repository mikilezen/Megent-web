import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OP",
  description: "Megent OP: Centralized operations, routing, and governance for AI agents in production. Control, monitor, and secure your AI agent infrastructure at scale.",
  alternates: {
    canonical: "/op",
  },
  keywords: [
    "Megent OP",
    "AI operations",
    "agent routing",
    "AI governance",
    "agent operations platform",
  ],
  openGraph: {
    title: "Megent OP - AI Agent Operations Platform",
    description: "Centralized operations, routing, and governance for AI agents in production. Control, monitor, and secure your AI agent infrastructure.",
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
    title: "Megent OP - AI Agent Operations Platform",
    description: "Centralized operations, routing, and governance for AI agents in production.",
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
