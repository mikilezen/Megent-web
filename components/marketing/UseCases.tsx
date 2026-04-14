"use client";

import Image from "next/image";
import { useState } from "react";

const USE_CASES = [
  {
    title: "Fintech",
    body: "Mask card data and block risky transfers by default.",
    label: "Payments",
    image: "/images (2).png",
  },
  {
    title: "Healthcare",
    body: "Hide PHI and enforce role checks before external calls.",
    label: "HIPAA",
    image: "/images (3).jfif",
  },
  {
    title: "Support",
    body: "Allow ticket updates, block credential changes.",
    label: "Customer ops",
    image: "/images (4).jfif",
  },
];

export default function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCase = USE_CASES[activeIndex];

  return (
    <section id="usecases" className="py-24 sm:py-24 bg-[var(--background)]">
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

          <div className="relative min-h-[180px] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)]">
            <Image
              src={activeCase.image}
              alt={`${activeCase.title} workflow visual`}
              fill
              sizes="(max-width: 1024px) 100vw, 36vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
