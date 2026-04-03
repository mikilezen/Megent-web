"use client";

import { useEffect, useRef } from "react";

const PROBLEMS = [
  {
    icon: "🔓",
    title: "No visibility into what your agents actually do",
    body:
      "Your agent runs, returns an answer, and you ship it. But between the LLM call and the result, tool calls happened. Files were read. APIs were hit. Data moved. You have no record of any of it.",
    tag: "Observability gap",
  },
  {
    icon: "📦",
    title: "You installed a vendor agent you didn't write",
    body:
      "It works. You deployed it. But you have no idea what it does under the hood. When it starts making unexpected tool calls, you'll find out the hard way — after the incident, not before.",
    tag: "Supply chain risk",
  },
  {
    icon: "🏥",
    title: "One unmasked field ends your compliance story",
    body:
      "Fintech. Healthcare. Legal. Your agents process sensitive data. Your compliance framework says it can't appear in logs or agent context. Your agents don't know that. Megent does.",
    tag: "Regulatory exposure",
  },
];

export default function Problem() {
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
    <section className="py-28 bg-white" ref={ref} id="problem">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mb-16">
          <span className="reveal inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--indigo)] mb-4">
            The problem
          </span>
          <h2 className="reveal reveal-d1 text-[clamp(30px,4vw,50px)] font-extrabold tracking-[-1.8px] leading-[1.08] text-[var(--text)] mb-5">
            You're shipping AI agents into production.
            <br />
            <span className="text-[var(--text3)]">Do you know what they're doing?</span>
          </h2>
          <p className="reveal reveal-d2 text-[17px] text-[var(--text2)] leading-[1.75] max-w-xl">
            Most teams don't. That's fine — until a hallucination triggers a fund transfer,
            a vendor agent accesses a database it shouldn't, or a customer's SSN lands in a log file.
          </p>
        </div>

        {/* <div className="grid md:grid-cols-3 gap-5">
          {PROBLEMS.map((problem, i) => (
            <div
              key={problem.tag}
              className={`reveal reveal-d${i + 1} group relative bg-white border border-[var(--border)] rounded-2xl p-7 hover:border-[var(--indigo-border)] hover:shadow-card-md transition-all duration-300`}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 300px 200px at 50% -30%, rgba(79,70,229,0.04), transparent)" }}
              />
              <div className="relative space-y-3">
                <span className="text-3xl block">{problem.icon}</span>
                <h3 className="text-[19px] font-semibold tracking-[-0.6px] text-[var(--text)]">{problem.title}</h3>
                <p className="text-[15px] text-[var(--text2)] leading-[1.7]">{problem.body}</p>
                <span className="inline-flex px-3 py-1 text-[12px] font-mono text-[var(--text3)] border border-[var(--border)] rounded-full bg-[var(--bg1)]">
                  {problem.tag}
                </span>
              </div>
            </div>
          ))}
        </div> */}

        <div className="reveal mt-14 bg-[var(--indigo)] rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">
          <div
            className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, white, transparent)", transform: "translate(40%, -40%)" }}
          />
          <p className="relative text-[20px] md:text-[24px] font-bold tracking-[-0.5px] leading-[1.4] max-w-2xl">
            "The moment you deploy an agent that can take real actions, you need a runtime that enforces what it's allowed to do. Hoping for the best is not a security posture."
          </p>
          <p className="relative mt-4 font-mono text-[13px] text-indigo-200">— The Megent team</p>
        </div>
      </div>
    </section>
  );
}
