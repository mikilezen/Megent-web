"use client";

import { useState } from "react";

const STEPS = [
  {
    title: "Write your policy",
    body: "Add one small policy file with the tools and rules you allow.",
    callout: "policy.yaml",
  },
  {
    title: "Wrap your agent",
    body: "Wrap your agent once. Megent checks tool calls at runtime.",
    callout: "@guard(policy='policy.yaml')",
  },
  {
    title: "Deploy",
    body: "Run your app. Violations are blocked and logged automatically.",
    callout: "ALLOW | BLOCK | MASK",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how" className="py-20 sm:py-24 bg-white">
      {/* <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <span className="inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--indigo)] mb-3">
            How it works
          </span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-1.2px] leading-[1.1] text-[var(--text)] mb-3">
            Simple, interactive setup
          </h2>
          <p className="text-[15px] text-[var(--text2)] leading-[1.7]">
            Click each step to preview what happens.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {STEPS.map((step, i) => (
            <button
              key={step.title}
              type="button"
              onClick={() => setActiveStep(i)}
              className={`px-4 py-2 rounded-full border text-[13px] font-medium transition-colors ${
                activeStep === i
                  ? "border-[var(--indigo-border)] bg-indigo-50 text-[var(--indigo)]"
                  : "border-[var(--border)] bg-white text-[var(--text2)] hover:border-[var(--indigo-border)]"
              }`}
            >
              0{i + 1} {step.title}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg1)] p-5 sm:p-6">
          <div className="w-10 h-10 rounded-full bg-white border border-[var(--border)] flex items-center justify-center font-semibold text-[var(--indigo)] mb-4">
            0{activeStep + 1}
          </div>
          <h3 className="text-[20px] font-bold text-[var(--text)] mb-2">{STEPS[activeStep].title}</h3>
          <p className="text-[15px] text-[var(--text2)] leading-[1.7] mb-4">{STEPS[activeStep].body}</p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-white text-[12px] font-mono text-[var(--text3)]">
            {STEPS[activeStep].callout}
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          {STEPS.map((step, i) => (
            <button
              key={`dot-${step.title}`}
              type="button"
              onClick={() => setActiveStep(i)}
              aria-label={`Go to step ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${activeStep === i ? "w-8 bg-[var(--indigo)]" : "w-2.5 bg-slate-300"}`}
            />
          ))}
        </div>
      </div> */}
    </section>
  );
}
