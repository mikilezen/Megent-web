"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINES = [
  { type: "cmd", text: "megent run --policy ./policy.yaml" },
  { type: "info", text: "rules: allow | stop_tool | hitl | awareness | budget" },
  { type: "ok", text: "ALLOW send_email(to=\"***@***.com\")" },
  { type: "warn", text: "HITL search_customer_history(...)" },
  { type: "info", text: "RECTIFY sensitive fields -> continue" },
  { type: "block", text: "STOP_TOOL transfer_funds(amount=14200)" },
];

export default function Hero() {
  const pathname = usePathname();
  const [shownLines, setShownLines] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const resetTimer = window.setTimeout(() => {
      setShownLines(0);
      setCopied(false);
    }, 0);

    return () => window.clearTimeout(resetTimer);
  }, [pathname]);

  useEffect(() => {
    if (shownLines >= LINES.length) return;
    const t = setTimeout(() => setShownLines((n) => n + 1), shownLines === 0 ? 180 : 260);
    return () => clearTimeout(t);
  }, [shownLines]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("pip install megent");
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-0 sm:pt-32 sm:pb-5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_8%,rgba(201,100,66,0.11),transparent_46%),radial-gradient(circle_at_88%_14%,rgba(135,134,127,0.2),transparent_42%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="fade-up">
          {/* <p className="mb-5 inline-flex rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-[12px] tracking-[0.12em] text-[var(--text3)] uppercase">
            Policy Guardrails for AI Agents
          </p> */}

          <h1 className="max-w-3xl text-[clamp(42px,7vw,78px)] font-medium leading-[1.02] tracking-[-0.02em] text-[var(--text)] [font-family:var(--font-serif)]">
            Control every agent tool call from one policy layer.
          </h1>

          <p className="mt-6 max-w-2xl text-[18px] leading-[1.65] text-[var(--text2)] sm:text-[20px]">
            Define what your agents can do.
Block what they cannot. Enforced at every tool call, before it executes.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="/price"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-[15px] font-medium text-[var(--primary-foreground)] shadow-[0_0_0_1px_var(--primary)] transition hover:brightness-95"
            >
              Get Started
              <ArrowRight />
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border2)] b-[var(--card)] px-4 py-3 text-[14px] font-medium text-[var(--text2)] shadow-[0_0_0_1px_var(--border)] transition hover:border-[var(--border2)] hover:text-[var(--text)]"
            >
              <CodeIcon />
              <span className="[font-family:var(--font-mono-ui)]">{copied ? "Copied" : "pip install megent"}</span>
            </button>
          </div>
        </div>

        <div className="fade-up rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[0_0_0_1px_var(--border),0_26px_44px_-34px_rgba(20,20,19,0.6)] sm:p-6">
          <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--text3)]">Live Runtime Stream</p>
              <p className="mt-1 text-[22px] leading-none text-[var(--text)] [font-family:var(--font-serif)]">policy.log</p>
            </div>
            {/* <span className="rounded-full border border-[var(--border2)] bg-[var(--muted)] px-3 py-1 text-[11px] text-[var(--text2)]">
              agent online
            </span> */}
          </div>

          <div className="rounded-2xl border border-[#30302e] bg-[#141413] p-4 [font-family:var(--font-mono-ui)]">
            {LINES.slice(0, shownLines).map((line) => (
              <p
                key={line.text}
                className={`text-[13px] leading-[1.8] ${
                  line.type === "cmd"
                    ? "text-[#faf9f5]"
                    : line.type === "ok"
                      ? "text-[#b8d6bd]"
                      : line.type === "block"
                        ? "text-[#e8b0a1]"
                        : line.type === "warn"
                          ? "text-[#e7cd85]"
                          : "text-[#b0aea5]"
                }`}
              >
                {line.text}
              </p>
            ))}
            {shownLines < LINES.length ? <p className="mt-1 text-[#b0aea5]">...</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2.5 6.5h8M8 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
