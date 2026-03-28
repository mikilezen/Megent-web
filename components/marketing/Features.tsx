"use client";

import { useEffect, useRef } from "react";

const FEATURES = [
  {
    icon: "🔐",
    tag: "Core runtime",
    title: "Tool call interception",
    body: "Every tool call your agent makes is caught before it executes. Checked against policy. ALLOW or BLOCK returned in under a millisecond. Your systems only get called when they should.",
  },
  {
    icon: "🪪",
    tag: "Identity layer",
    title: "Agent JWT passports",
    body: "Each agent carries a signed JWT passport with a trust level baked in. The runtime verifies it on every call. No valid identity means no tool access — no exceptions.",
  },
  {
    icon: "🧹",
    tag: "Compliance",
    title: "PII masking before context",
    body: "Customer emails, SSNs, card numbers, DOBs — masked before the agent ever sees them. Choose replacement, hashing, or redaction per field type. Ships HIPAA and PCI-ready.",
  },
  {
    icon: "📦",
    tag: "Supply chain",
    title: "Third-party agent coverage",
    body: "Wrap any agent you didn't write — vendor plugins, marketplace agents, open-source bots — and enforce your rules regardless of what's inside the black box.",
  },
  {
    icon: "📋",
    tag: "GitOps-ready",
    title: "Policy as code",
    body: "YAML or Python. Version controlled. Reviewed in PRs. Deployed alongside your app. Your security policy is no longer a wiki page nobody reads — it's enforced, tested code.",
  },
  {
    icon: "⚡",
    tag: "Performance",
    title: "In-process, zero overhead",
    body: "No sidecar. No proxy. No extra API hop. Megent runs in-process with your agent. Average interception cost: under 1ms. You won't notice it — but your agents will.",
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <span className="reveal inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--indigo)] mb-4">
          Features
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <h2 className="reveal reveal-d1 text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-1.5px] leading-[1.08] text-[var(--text)] max-w-lg">
            Built for how agents actually run in production.
          </h2>
          <a
            href="https://docs.megent.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal reveal-d2 flex items-center gap-2 text-[13px] font-semibold text-[var(--indigo)] hover:underline shrink-0"
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
              className={`reveal reveal-d${(i % 3) + 1} group relative bg-white border border-[var(--border)] rounded-2xl p-7 hover:border-[var(--indigo-border)] hover:shadow-card-md transition-all duration-300 cursor-default`}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 260px 180px at 50% -20%, rgba(79,70,229,0.04), transparent)" }}
              />
              <div className="relative space-y-3">
                <span className="text-2xl block">{feature.icon}</span>
                <span className="inline-flex px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-[var(--text3)] border border-[var(--border)] rounded-full bg-[var(--bg1)]">
                  {feature.tag}
                </span>
                <h3 className="text-[19px] font-semibold tracking-[-0.6px] text-[var(--text)]">{feature.title}</h3>
                <p className="text-[15px] text-[var(--text2)] leading-[1.7]">{feature.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
