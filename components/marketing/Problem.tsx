"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { EyeOff, Package, ShieldAlert, BarChart3 } from "lucide-react";

const PROBLEMS = [
  {
    icon: EyeOff,
    title: "No visibility into what your agents actually do",
    body: "Your agent runs, returns an answer, and you ship it. But between the LLM call and the result, tool calls happened. Files were read. APIs were hit. Data moved. You have no record of any of it.",
    tag: "Observability gap",
  },
  {
    icon: Package,
    title: "You installed a vendor agent you didn't write",
    body: "It works. You deployed it. But you have no idea what it does under the hood. When it starts making unexpected tool calls, you'll find out the hard way - after the incident, not before.",
    tag: "Supply chain risk",
  },
  {
    icon: ShieldAlert,
    title: "One unmasked field ends your compliance story",
    body: "Fintech. Healthcare. Legal. Your agents process sensitive data. Your compliance framework says it can't appear in logs or agent context. Your agents don't know that. Megent does.",
    tag: "Regulatory exposure",
  },
];

export default function Problem() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    root.querySelectorAll(".reveal").forEach((el) => {
      el.classList.remove("visible");
    });

    const timeouts: number[] = [];

    const revealAll = () => {
      root.querySelectorAll(".reveal").forEach((el, i) => {
        const timeoutId = window.setTimeout(
          () => el.classList.add("visible"),
          i * 80
        );
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
    <section className="py-24 bg-background" ref={ref} id="problem">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="reveal inline-block text-xs uppercase tracking-wider text-primary/80 mb-4 font-semibold">
            The Problem
          </span>
          <h2 className="reveal reveal-d1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            You're shipping AI agents into production.
            <br />
            <span className="text-muted-foreground">
              Do you know what they're doing?
            </span>
          </h2>
          <p className="reveal reveal-d2 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Most teams don't. That's fine - until a hallucination triggers a
            fund transfer, a vendor agent accesses a database it shouldn't, or a
            customer's SSN lands in a log file.
          </p>
        </div>

        <div className="reveal mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          <div className="grid md:grid-cols-[0.4fr_0.9fr]">
            <div className="relative min-h-[220px] bg-gradient-to-br from-primary/10 to-secondary overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart3
                  className="w-24 h-24 text-primary/30"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
                Runtime Snapshot
              </p>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                See risky behavior before it ships
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Route actions through a policy layer so every important tool
                call is visible, evaluated, and traceable in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROBLEMS.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.tag}
                className={`reveal reveal-d${
                  i + 1
                } group relative bg-card border border-border rounded-2xl p-7 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300`}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 300px 200px at 50% -30%, #c9644215, transparent)`,
                  }}
                />
                <div className="relative space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary/20">
                    <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground leading-tight">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.body}
                  </p>
                  <span className="inline-flex px-3 py-1 text-xs font-mono rounded-full border border-primary/20 bg-primary/5 text-muted-foreground">
                    {problem.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
