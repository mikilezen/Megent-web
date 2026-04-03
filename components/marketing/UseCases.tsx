"use client";

import { useState } from "react";

const USE_CASES = [
  {
    title: "Fintech",
    body: "Mask card data and block risky transfers by default.",
    label: "Payments",
  },
  {
    title: "Healthcare",
    body: "Hide PHI and enforce role checks before external calls.",
    label: "HIPAA",
  },
  {
    title: "Support",
    body: "Allow ticket updates, block credential changes.",
    label: "Customer ops",
  },
];

export default function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCase = USE_CASES[activeIndex];

  return (
    <section id="usecases" className="py-20 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <span className="inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--indigo)] mb-3">Use cases</span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-1.2px] leading-[1.1] text-[var(--text)] mb-3">
            Pick your workflow
          </h2>
          <p className="text-[15px] text-[var(--text2)] leading-[1.7]">Choose a case to preview the default guard behavior.</p>
        </div>

        <div className="flex flex-wrap gap-p2 mb-">
          {USE_CASES.map((useCase, i) => (
            <button
              key={useCase.title}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 rounded-0 border text-[13px] font-medium transition-colors ${
                activeIndex === i
                  ? "border-[var(--black)] bg-black text-white"
                  : "border-[var(--border)] bg-white text-[var(--text2)] hover:border-[var(--indigo-border)]"
              }`}
            >
              {useCase.title}
            </button>
          ))}
        </div>

        <div className="rounded-2oxl border border-[var(--border)] bg-[var(--bg10)] p-5 sm:p-6">
          <span className="inline-flex px-3 py-1 rounded-full text-[12px] font-mono text-[var(--text3)] border border-[var(--border)] bg-white mb-4">
            {activeCase.label}
          </span>
          <h3 className="text-[20px] font-semibold text-[var(--text)] mb-2">{activeCase.title}</h3>
          <p className="text-[15px] text-[var(--text2)] leading-[1.7]">{activeCase.body}</p>
        </div>
      </div>
    </section>
  );
}
