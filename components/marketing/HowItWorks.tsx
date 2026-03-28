"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    title: "Write your policy",
    body: "Describe allowed tools, arguments, identities, and masking rules in YAML or Python. Commit it with your code.",
    callout: "policy.yaml",
  },
  {
    title: "Wrap your agent",
    body: "Add the Megent guard decorator around your agent or tool router. No proxy, no sidecar, no extra network hop.",
    callout: "@guard(policy='policy.yaml')",
  },
  {
    title: "Ship with confidence",
    body: "Every tool call is checked at runtime. Violations are blocked, masked, and logged — without slowing down your LLM pipeline.",
    callout: "ALLOW | BLOCK | MASK",
  },
];

export default function HowItWorks() {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how" className="py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mb-12">
          <span className="reveal inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--indigo)] mb-3">
            How it works
          </span>
          <h2 className="reveal reveal-d1 text-[clamp(28px,4vw,46px)] font-extrabold tracking-[-1.4px] leading-[1.08] text-[var(--text)] mb-4">
            Guardrails that actually run with your agent.
          </h2>
          <p className="reveal reveal-d2 text-[16px] text-[var(--text2)] leading-[1.7] max-w-2xl">
            Drop Megent into your stack without rewrites. Policies stay in Git. Enforcement lives in-process. Telemetry stays in your infra.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
          <div className="space-y-5">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className={`reveal reveal-d${i + 1} flex gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg1)] hover:border-[var(--indigo-border)] transition-colors`}
              >
                <div className="w-9 h-9 rounded-full bg-white border border-[var(--border)] flex items-center justify-center font-semibold text-[var(--indigo)]">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-[var(--text)] mb-1">{step.title}</h3>
                  <p className="text-[14px] text-[var(--text2)] leading-[1.7]">{step.body}</p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-white text-[12px] font-mono text-[var(--text3)]">
                    {step.callout}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal reveal-d2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg1)] p-5 shadow-card-md">
              <div className="flex items-center justify-between mb-4 text-[12px] font-mono text-[var(--text3)]">
                <span>sample policy</span>
                <span>yaml</span>
              </div>
              <pre className="text-[13px] leading-[1.6] text-[var(--text)] bg-white border border-[var(--border)] rounded-xl p-4 overflow-x-auto whitespace-pre-wrap">
policy:
  name: billing-agent
  identity:
    require: jwt
  allow:
    - tool: read_invoice
    - tool: send_email
  block:
    - tool: transfer_funds
    - tool: delete_customer
  mask:
    email: redact
    ssn: hash
              </pre>
              <p className="mt-4 text-[13px] text-[var(--text2)] leading-[1.6]">
                Declarative policy. Enforced in-process. Logged for audit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
