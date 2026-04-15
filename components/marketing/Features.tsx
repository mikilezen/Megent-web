"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const FEATURES = [
  {
    icon: "🔐",
    tag: "Core runtime",
    title: "Tool call interception",
    body: "Every tool call your agent makes is caught before it executes. Checked against policy. ALLOW, STOP_TOOL, or HUMAN_IN_THE_LOOP decisions return in under a millisecond.",
  },
  {
    icon: "🪪",
    tag: "Identity layer",
    title: "Agent JWT passports",
    body: "Each agent carries a signed JWT passport with a trust level baked in. The runtime verifies it on every call. No valid identity means no tool access — no exceptions.",
  },
  {
    icon: "🧠",
    tag: "Awareness",
    title: "Sensitive-data detection and rectification",
    body: "When an agent calls data and then runs search, Megent detects sensitive fields, rectifies risky values first, and allows only policy-compliant search/query to continue.",
  },
  {
    icon: "📦",
    tag: "Supply chain",
    title: "Third-party agent coverage",
    body: "Wrap any agent you didn't write — vendor plugins, marketplace agents, open-source bots — and enforce your rules regardless of what's inside the black box.",
  },
  {
    icon: "💸",
    tag: "Governance",
    title: "Budget limiting policy",
    body: "Set spend caps by agent, workflow, or day. When a limit is reached, Megent pauses non-critical tools and keeps your core flow under control.",
  },
  {
    icon: "🛑",
    tag: "Safety mode",
    title: "Stop tool, not whole agent",
    body: "When policy blocks an action, Megent can stop only that risky tool call instead of breaking the whole agent run, so your workflow degrades gracefully.",
  },
];

export default function Features() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    root.querySelectorAll(".reveal").forEach((el) => {
      el.classList.remove("visible");
    });

    const timeouts: number[] = [];
    const revealAll = () => {
      root.querySelectorAll(".reveal").forEach((el, i) => {
        const timeoutId = window.setTimeout(() => el.classList.add("visible"), i * 80);
        timeouts.push(timeoutId);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealAll();
            return;
          }

          root.querySelectorAll(".reveal").forEach((el) => {
            el.classList.remove("visible");
          });
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(root);

    const fallbackTimeout = window.setTimeout(() => {
      if (!root.querySelector(".reveal.visible")) {
        revealAll();
      }
    }, 260);
    timeouts.push(fallbackTimeout);

    return () => {
      observer.disconnect();
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [pathname]);

  return (
    <section id="features" className="py-24 bg-[var(--backgound)]" ref={ref}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <span className="reveal inline-block text-[11px] uppercase tracking-[0.12em] text-[var(--text3)] mb-4">
          Features
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <h2 className="reveal reveal-d1 text-[clamp(30px,4vw,50px)] font-medium tracking-[-0.02em] leading-[1.08] text-[var(--text)] max-w-2xl [font-family:var(--font-serif)]">
            Built for how agents actually run in production.
          </h2>
          <a
            href="https://docs.megent.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal reveal-d2 flex items-center gap-2 text-[14px] font-medium text-[var(--text2)] hover:text-[var(--text)] shrink-0"
          >
            View full docs
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 7h9M8.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`reveal reveal-d${(i % 3) + 1} group relative bg-[var(--background)] border border-[var(--border)] rounded-2xl p-7 hover:border-[var(--border2)] hover:shadow-[0_0_0_1px_var(--border),0_20px_40px_-30px_rgba(20,20,19,0.45)] transition-all duration-300 cursor-default`}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 260px 180px at 50% -20%, rgba(201,100,66,0.08), transparent)" }}
              />
              <div className="relative space-y-3">
                <span className="text-2xl block">{feature.icon}</span>
                <span className="inline-flex px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--text3)] border border-[var(--border)] rounded-full bg-[var(--card)]">
                  {feature.tag}
                </span>
                <h3 className="text-[24px] font-medium tracking-[-0.01em] text-[var(--text)] [font-family:var(--font-serif)]">{feature.title}</h3>
                <p className="text-[15px] text-[var(--text2)] leading-[1.7]">{feature.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
