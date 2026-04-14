"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function DemoPage() {
  useEffect(() => {
    const key = "magent_force_reload_demo";
    if (sessionStorage.getItem(key) === "1") {
      sessionStorage.removeItem(key);
      window.location.reload();
    }
  }, []);

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-24 text-[var(--text)]">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
        <p className="text-xs uppercase tracking-[0.12em] text-[var(--text3)]">Demo</p>
        <h1 className="mt-3 text-3xl font-medium [font-family:var(--font-serif)]">Megent Demo Workspace</h1>
        <p className="mt-4 leading-7 text-[var(--text2)]">
          You are signed in to the demo environment. Navigate freely without hitting a missing route.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="inline-flex items-center rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-medium text-[var(--primary-foreground)]">
            Go Home
          </Link>
          <Link href="/registry" className="inline-flex items-center rounded-xl border border-[var(--border2)] bg-[var(--card)] px-5 py-3 text-sm font-medium text-[var(--text)]">
            Open Registry
          </Link>
        </div>
      </div>
    </main>
  );
}
