"use client";

import { useEffect, useRef } from "react";

const USE_CASES = [
  {
    title: "Fintech",
    body: "Mask PANs, block unauthorized transfers, and require signed agent identities before touching money movement tools.",
    label: "Payments",
  },
  {
    title: "Healthcare",
    body: "Redact PHI before context, log every tool invocation, and enforce facility-level permissions on external APIs.",
    label: "HIPAA",
  },
  {
    title: "Support automation",
    body: "Keep third-party agents away from production databases. Allow ticket updates, block credential changes by default.",
    label: "Customer ops",
  },
  {
    title: "Security & IT",
    body: "Wrap vendor bots with Megent and enforce least privilege when they manage access, rotate keys, or run scripts.",
    label: "Zero trust",
  },
];

export default function UseCases() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 70);
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
    <section id="usecases" className="py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="reveal inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--indigo)] mb-3">
              Use cases
            </span>
            <h2 className="reveal reveal-d1 text-[clamp(28px,4vw,46px)] font-extrabold tracking-[-1.4px] leading-[1.08] text-[var(--text)]">
              Bring your own stack. Megent just enforces.
            </h2>
          </div>
          <p className="reveal reveal-d2 text-[14px] text-[var(--text2)] leading-[1.7] max-w-xl">
            Drop Megent between your agent and the real world: databases, email, payments, identity providers, and any tool calls.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {USE_CASES.map((useCase, i) => (
            <div
              key={useCase.title}
              className={`reveal reveal-d${(i % 3) + 1} relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg1)] p-6 hover:border-[var(--indigo-border)] hover:shadow-card-md transition-all`}
            >
              <div
                className="absolute inset-0 opacity-60 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 240px 180px at 40% 0%, rgba(79,70,229,0.06), transparent)",
                }}
              />
              <div className="relative space-y-2">
                <span className="inline-flex px-3 py-1 rounded-full text-[12px] font-mono text-[var(--text3)] border border-[var(--border)] bg-white">
                  {useCase.label}
                </span>
                <h3 className="text-[18px] font-semibold text-[var(--text)]">{useCase.title}</h3>
                <p className="text-[14px] text-[var(--text2)] leading-[1.7]">{useCase.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
