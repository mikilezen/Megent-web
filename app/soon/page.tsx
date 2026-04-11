import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "Enterprise features for Megent are coming soon.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SoonPage() {
  return (
    <main className="min-h-screen bg-[#f3f5f8] text-slate-900 flex flex-col items-center justify-center px-6">
      <a
        href="/"
        className="absolute left-5 top-5 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </a>
      <div className="text-center space-y-4 max-w-md">
        <p className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
          Enterprise
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">Coming Soon</h1>
        <p className="text-base leading-7 text-slate-600">
          Enterprise features are on the way. Join the waitlist to get early access.
        </p>
        <a
          href="/#waitlist"
          className="inline-block mt-4 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors"
        >
          Join waitlist
        </a>
      </div>
    </main>
  );
}
