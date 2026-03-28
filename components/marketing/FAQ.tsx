"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    q: "Does Megent work with LangChain, CrewAI, and OpenAI Agents?",
    a: "Yes — Megent works at the tool call layer, which is framework-agnostic. We have tested integrations for LangChain, LangGraph, CrewAI, OpenAI Agents SDK, and AutoGen. If your framework supports tool calling, Megent supports it. Bring your own framework.",
  },
  {
    q: "How much latency does interception actually add?",
    a: "Under 1ms for policy evaluation. Megent runs in-process — there's no network call, no external API, no proxy. The overhead is negligible compared to the actual LLM call, which takes hundreds of milliseconds. In production, you won't notice it.",
  },
  {
    q: "Is the core runtime really free? What's the business model?",
    a: "The core — interception, policy evaluation, PII masking, audit logging — is MIT licensed and free forever. Enterprise features like a centralized dashboard, SSO, managed rulesets, and SLA-backed support will eventually be commercial. We'll be honest about what's changing and when. The core stays free.",
  },
  {
    q: "Does Megent send any data to your servers?",
    a: "No. The current version is entirely self-hosted. Your tool calls, your policies, your audit logs — all of it stays in your infrastructure. We have zero visibility into your agent behavior. No telemetry, no phone-home, no analytics.",
  },
  {
    q: "Can I use Megent to control agents I didn't write?",
    a: "Yes — this is one of the core use cases. Wrap any third-party agent with Megent's guard decorator and point it at a policy file. It enforces your rules regardless of what the agent does internally. You get control without needing access to the agent's source code.",
  },
  {
    q: "What Python version do you support?",
    a: "Python 3.9 and above. We test against 3.9, 3.10, 3.11, and 3.12. Full async support (asyncio, async/await) is included from day one. TypeScript and Node.js support is on the roadmap.",
  },
  {
    q: "We're an early-stage startup. Can we get help getting set up?",
    a: "Email us at hello@megent.dev. We're a founder-stage team and we want to help early-stage companies get this right. The core is free, and we're happy to jump on a call. No sales process — just founders talking to founders.",
  },
];

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
