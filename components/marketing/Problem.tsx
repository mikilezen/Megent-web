"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PROBLEMS = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 72 72">
<path d="M 49 10 C 41.28 10 35 16.28 35 24 L 35 28 L 18 28 C 13.582 28 10 31.582 10 36 L 10 52 C 10 56.418 13.582 60 18 60 L 40 60 C 44.418 60 48 56.418 48 52 L 48 36 C 48 32.643974 45.930202 29.775473 43 28.587891 L 43 24 C 43 20.691 45.691 18 49 18 C 52.309 18 55 20.691 55 24 L 55 32 C 55 34.209 56.791 36 59 36 C 61.209 36 63 34.209 63 32 L 63 24 C 63 16.28 56.72 10 49 10 z"></path>
</svg>,
    title: "No visibility into what your agents actually do",
    body:
      "Your agent runs, returns an answer, and you ship it. But between the LLM call and the result, tool calls happened. Files were read. APIs were hit. Data moved. You have no record of any of it.",
    tag: "Observability gap",
  },
  {
    icon: <Image src="https://img.icons8.com/?size=100&id=112470&format=png&color=000000" alt="Supply chain risk" width={100} height={100} />,
    title: "You installed a vendor agent you didn't write",
    body:
      "It works. You deployed it. But you have no idea what it does under the hood. When it starts making unexpected tool calls, you'll find out the hard way — after the incident, not before.",
    tag: "Supply chain risk",
  },
  {
    icon: <Image src="https://img.icons8.com/?size=100&id=QWVOzOyIffWI&format=png&color=000000" alt="Compliance" width={100} height={100} />,
    title: "One unmasked field ends your compliance story",
    body:
      "Fintech. Healthcare. Legal. Your agents process sensitive data. Your compliance framework says it can't appear in logs or agent context. Your agents don't know that. Megent does.",
    tag: "Regulatory exposure",
  },
];

export default function Problem() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Reset reveal state so the section can animate again after route navigation.
    root.querySelectorAll(".reveal").forEach((el) => {
      el.classList.remove("visible");
    });

    const timeouts: number[] = [];

    const revealAll = () => {
      root.querySelectorAll(".reveal").forEach((el, i) => {
        const timeoutId = window.setTimeout(() => el.classList.add("visible"), i * 80);
        timeouts.push(timeoutId);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealAll();
            return;
          }

          root.querySelectorAll(".reveal").forEach((el) => {
            el.classList.remove("visible");
          });
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(root);

    // Fallback for cached/fast navigations where IntersectionObserver may not dispatch.
    const fallbackTimeout = window.setTimeout(() => {
      if (!root.querySelector(".reveal.visible")) {
        revealAll();
      }
    }, 260);
    timeouts.push(fallbackTimeout);

    return () => {
      observer.disconnect();
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [pathname]);

  return (
    <section className="py-24 bg-[var(--background)]" ref={ref} id="problem">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mb-16">
          <span className="reveal inline-block text-[11px] uppercase tracking-[0.12em] text-[var(--text3)] mb-4">
            The problem
          </span>
          <h2 className="reveal reveal-d1 text-[clamp(30px,4vw,52px)] font-medium tracking-[-0.02em] leading-[1.08] text-[var(--text)] mb-5 [font-family:var(--font-serif)]">
            You're shipping AI agents into production.
            <br />
            <span className="text-[var(--text3)]">Do you know what they're doing?</span>
          </h2>
          <p className="reveal reveal-d2 text-[17px] text-[var(--text2)] leading-[1.75] max-w-xl">
            Most teams don't. That's fine — until a hallucination triggers a fund transfer,
            a vendor agent accesses a database it shouldn't, or a customer's SSN lands in a log file.
          </p>
        </div>

        <div className="reveal mb-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_0_0_1px_var(--border),0_20px_38px_-30px_rgba(20,20,19,0.45)]">
          <div className="grid md:grid-cols-[0.4fr_0.9fr]">
            <div className="relative min-h-[220px]">
              <Image
                src="/2_objects.jpg"
                alt="Dashboard-style overview for agent runtime controls"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-7">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--text3)]">Runtime Snapshot</p>
              <h3 className="mt-2 text-[24px] leading-[1.12] text-[var(--text)] [font-family:var(--font-serif)]">
                See risky behavior before it ships
              </h3>
              <p className="mt-3 text-[14px] leading-[1.75] text-[var(--text2)]">
                Route actions through a policy layer so every important tool call is visible,
                evaluated, and traceable in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PROBLEMS.map((problem, i) => (
            <div
              key={problem.tag}
              className={`reveal reveal-d${i + 1} group relative bg-[var(--card)] border border-[var(--border)] rounded-2xl p-7 hover:border-[var(--border2)] hover:shadow-[0_0_0_1px_var(--border),0_22px_40px_-30px_rgba(20,20,19,0.5)] transition-all duration-300`}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 300px 200px at 50% -30%, rgba(201,100,66,0.08), transparent)" }}
              />
              <div className="relative space-y-3">
                <span className="text-3xl w-9 block">{problem.icon}</span>
                <h3 className="text-[24px] font-medium tracking-[-0.01em] text-[var(--text)] [font-family:var(--font-serif)]">{problem.title}</h3>
                <p className="text-[15px] text-[var(--text2)] leading-[1.7]">{problem.body}</p>
                <span className="inline-flex px-3 py-1 text-[12px] font-mono text-[var(--text3)] border border-[var(--border)] rounded-full bg-[var(--bg1)]">
                  {problem.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-14 bg-[var(--text)] rounded-2xl p-8 md:p-10 text-[#faf9f5] relative overflow-hidden">
          {/* <div
            className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, white, transparent)", transform: "translate(40%, -40%)" }}
          />
          <p className="relative text-[20px] md:text-[24px] font-medium tracking-[-0.01em] leading-[1.4] max-w-2xl [font-family:var(--font-serif)]">
            "The moment you deploy an agent that can take real actions, you need a runtime that enforces what it's allowed to do. Hoping for the best is not a security posture."
          </p>
          <p className="relative mt-4 text-[13px] text-[#b0aea5]">- The Megent team</p>
          */}
        </div>
      </div>
    </section>
  );
}
