"use client";

import { useState } from "react";

const USE_CASES = [
  {
    title: "Fintech",
    body: "Mask card data and block risky transfers by default.",
    label: "",
    gradient:
      "linear-gradient(135deg, #0f172a 0%, #1d4ed8 45%, #22d3ee 100%)",
  },
  {
    title: "Healthcare",
    body: "Hide PHI and enforce role checks before external calls.",
    label: "",
    gradient:
      "linear-gradient(140deg, #14532d 0%, #10b981 45%, #ecfeff 100%)",
  },
  // {
  //   title: "Support",
  //   body: "Allow ticket updates, block credential changes.",
  //   label: "Customer ops",
  //   image: "/images (4).jfif",
  // },
  {
    title: "Legal",
    body: "privilege, confidentiality, and billable-hour audit trails. Every AmLaw firm is blocked on agent deployment for exactly the reasons Megent solves. Huge budget, desperate buyers.",
    label: "",
    gradient:
      "linear-gradient(145deg, #2d1b69 0%, #6d28d9 42%, #f59e0b 100%)",
  },
  {
    title: "Insurance",
    body: "adjacent to fintech but distinct: underwriting decisions, claims automation, state-by-state regulatory variance (NAIC model laws). Policy-as-code maps 1:1 to their mental model.",
    label: "",
    gradient:
      "linear-gradient(130deg, #0c4a6e 0%, #0284c7 50%, #fde68a 100%)",
  },
  {
    title: "Government",
    body: "FedRAMP, FISMA, CJIS. Self-hosted + zero telemetry is your killer feature here. Even 'SLED' (state/local/education) is a real wedge.",
    label: "",
    gradient:
      "linear-gradient(150deg, #1f2937 0%, #334155 48%, #93c5fd 100%)",
  },
  {
    title: "Enterprise IT/ Internal Platforms",
    body: "the horizontal play. Any Fortune 500 deploying Copilot/Cursor/internal agents needs this. Less regulated but highest volume.",
    label: "",
    gradient:
      "linear-gradient(135deg, #1f2937 0%, #0f766e 46%, #6ee7b7 100%)",
  },
];

export default function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCase = USE_CASES[activeIndex];

  return (
    <section id="usecases" className="py-4 sm:py-2 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <span className="inline-block text-[11px] uppercase tracking-[0.12em] text-[var(--text3)] mb-3">Use cases</span>
          <h2 className="text-[clamp(30px,4vw,46px)] font-medium tracking-[-0.02em] leading-[1.1] text-[var(--text)] mb-3 [font-family:var(--font-serif)]">
            Pick your workflow
          </h2>
          <p className="text-[15px] text-[var(--text2)] leading-[1.7]">Choose a case to preview the default guard behavior.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {USE_CASES.map((useCase, i) => (
            <button
              key={useCase.title}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 rounded-xl border text-[13px] font-medium transition-colors ${
                activeIndex === i
                  ? "border-[var(--border2)] bg-[var(--card)] text-[var(--text)]"
                  : "border-[var(--border)] bg-[var(--background)] text-[var(--text2)] hover:border-[var(--border2)]"
              }`}
            >
              {useCase.title}
            </button>
          ))}
        </div>

        <div className="grid gap-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-7 shadow-[0_0_0_1px_var(--border)] lg:grid-cols-[1fr_0.9fr]">
          <div>
            <span className="inline-flex px-3 py-1 rounded-full text-[12px] [font-family:var(--font-mono-ui)] text-[var(--text3)] border border-[var(--border)] bg-[var(--background)] mb-4">
              {activeCase.label}
            </span>
            <h3 className="text-[28px] font-medium text-[var(--text)] mb-2 [font-family:var(--font-serif)]">{activeCase.title}</h3>
            <p className="text-[15px] text-[var(--text2)] leading-[1.7]">{activeCase.body}</p>
          </div>

          <div
            className="relative min-h-[180px] overflow-hidden rounded-xl border border-[var(--border)]"
            style={{ backgroundImage: activeCase.gradient }}
            aria-label={`${activeCase.title} workflow visual`}
            role="img"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.24),transparent_48%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.2),rgba(15,23,42,0))]" />
          </div>
        </div>
      </div>
    </section>
  );
}
