"use client";

import Image from "next/image";
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
    callout: "ALLOW | BLOCK | MASK | HITL |STOP",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how" className="py-24 sm:py-24 bg-[var(--card)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <span className="inline-block text-[11px] uppercase tracking-[0.12em] text-[var(--text3)] mb-3">
            How it works
          </span>
          <h2 className="text-[clamp(30px,4vw,48px)] font-medium tracking-[-0.02em] leading-[1.1] text-[var(--text)] mb-3 [font-family:var(--font-serif)]">
            Three steps to runtime safety
          </h2>
          <p className="text-[15px] text-[var(--text2)] leading-[1.7]">
            Click a step to preview exactly what your team would configure.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {STEPS.map((step, i) => (
            <button
              key={step.title}
              type="button"
              onClick={() => setActiveStep(i)}
              className={`px-4 py-2 rounded-xl border text-[13px] font-medium transition-colors ${
                activeStep === i
                  ? "border-[var(--border2)] bg-[var(--background)] text-[var(--text)]"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--text2)] hover:border-[var(--border2)]"
              }`}
            >
              0{i + 1} {step.title}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5 sm:p-7 shadow-[0_0_0_1px_var(--border)]">
          <div className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center font-semibold text-[var(--text)] mb-4">
            0{activeStep + 1}
          </div>
          <h3 className="text-[28px] font-medium text-[var(--text)] mb-2 [font-family:var(--font-serif)]">{STEPS[activeStep].title}</h3>
          <p className="text-[15px] text-[var(--text2)] leading-[1.7] mb-4">{STEPS[activeStep].body}</p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-[12px] [font-family:var(--font-mono-ui)] text-[var(--text3)]">
            {STEPS[activeStep].callout}
          </div>

          {/* <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_1fr]">
            <div className="relative min-h-[150px] overflow-hidden rounded-xl border border-[var(--border)]">
              <Image
                src="/Frame.png"
                alt="Megent setup visual"
                fill
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-cover"
              />
            </div> */}
            {/* <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--text3)]">Quick Outcome</p>
              <p className="mt-2 text-[14px] leading-[1.75] text-[var(--text2)]">
                Simple setup for developers, strict control for security and compliance teams.
              </p>
            </div> */}
          {/* </div> */}
        </div>

        <div className="mt-5 flex gap-2">
          {STEPS.map((step, i) => (
            <button
              key={`dot-${step.title}`}
              type="button"
              onClick={() => setActiveStep(i)}
              aria-label={`Go to step ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${activeStep === i ? "w-8 bg-[var(--primary)]" : "w-2.5 bg-[var(--border2)]"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
