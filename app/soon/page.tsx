import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coming Soon | Megent",
  description: "Megent Enterprise is on its way. Join the waitlist to get early access.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SoonPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-6">
      <div className="text-center space-y-6 max-w-md">
        <p className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
          Coming Soon
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text)]">
          Megent Enterprise
        </h1>
        <p className="text-base leading-7 text-[var(--text2)]">
          Advanced governance, SSO, and dedicated support for teams at scale. We&apos;re putting the finishing touches on it.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/#waitlist"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[var(--indigo)] rounded-full hover:bg-indigo-600 transition-colors"
          >
            Join the waitlist
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[var(--text2)] rounded-full border border-[var(--border)] hover:border-[var(--border2)] hover:text-[var(--text)] transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
