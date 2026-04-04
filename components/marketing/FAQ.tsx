"use client";

import { useEffect, useRef, useState } from "react";
import { FAQS } from "@/data/faq";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
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
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section id="faq" className="py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[340px_1fr] gap-14 xl:gap-20 items-start">
          <div>
            <span className="reveal inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--indigo)] mb-4">
              FAQ
            </span>
            <h2 className="reveal reveal-d1 text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1.5px] leading-[1.1] text-[var(--text)] mb-5">
              Answers to questions
            </h2>
            <p className="reveal reveal-d2 font-mono text-[13px] text-[var(--text2)] leading-[1.75] mb-6">
              Still have something we didn't cover?
            </p>
            <a
              href="mailto:hello@megent.dev"
              className="reveal reveal-d2 inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--indigo)] hover:underline"
            >
              Email us directly →
            </a>
          </div>

          <div className="reveal reveal-d1">
            {FAQS.map((item, i) => (
              <div
                key={item.q}
                className="border-b border-[var(--border)]"
              >
                <button
                  className="w-full py-4 flex items-start justify-between gap-4 text-left"
                  onClick={() => toggle(i)}
                  aria-expanded={open === i}
                >
                  <div>
                    <p className="text-[15px] sm:text-[16px] font-semibold text-[var(--text)]">{item.q}</p>
                    <p className={`mt-2 text-[14px] text-[var(--text2)] leading-[1.7] transition-all duration-200 ${open === i ? "opacity-100" : "opacity-0 max-h-0 overflow-hidden"}`}>
                      {item.a}
                    </p>
                  </div>
                  <span className="mt-1 text-[var(--text3)] font-mono text-[11px]">
                    {open === i ? "-" : "+"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
