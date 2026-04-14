"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-24 text-[var(--text)]">
      <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
        <p className="text-xs uppercase tracking-[0.12em] text-[var(--text3)]">404</p>
        <h1 className="mt-3 text-3xl font-medium [font-family:var(--font-serif)]">Page not found</h1>
        <p className="mt-4 leading-7 text-[var(--text2)]">
          The page you opened does not exist or has moved.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-medium text-[var(--primary-foreground)]"
          >
            Go to home
          </Link>
        </div>
      </div>
    </main>
  );
}
