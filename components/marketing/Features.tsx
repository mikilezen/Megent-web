"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  Zap,
  Shield,
  Eye,
  Package,
  CreditCard,
  AlertTriangle,
  Fingerprint,
  Database,
  Mail,
  Lock,
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    tag: "Core runtime",
    title: "Tool call interception",
    body: "Every tool call your agent makes is caught before it executes. Checked against policy. ALLOW, STOP_TOOL, or HUMAN_IN_THE_LOOP decisions return in under a millisecond.",
  },
  {
    icon: Fingerprint,
    tag: "Identity layer",
    title: "Agent JWT passports",
    body: "Each agent carries a signed JWT passport with a trust level baked in. The runtime verifies it on every call. No valid identity means no tool access - no exceptions.",
  },
  {
    icon: Eye,
    tag: "Awareness",
    title: "Sensitive-data detection and rectification",
    body: "When an agent calls data and then runs search, Megent detects sensitive fields, rectifies risky values first, and allows only policy-compliant search/query to continue.",
  },
  {
    icon: Package,
    tag: "Supply chain",
    title: "Third-party agent coverage",
    body: "Wrap any agent you didn't write - vendor plugins, marketplace agents, open-source bots - and enforce your rules regardless of what's inside the black box.",
  },
  {
    icon: CreditCard,
    tag: "Governance",
    title: "Budget limiting policy",
    body: "Set spend caps by agent, workflow, or day. When a limit is reached, Megent pauses non-critical tools and keeps your core flow under control.",
  },
  {
    icon: Shield,
    tag: "Safety mode",
    title: "Stop tool, not whole agent",
    body: "When policy blocks an action, Megent can stop only that risky tool call instead of breaking the whole agent run, so your workflow degrades gracefully.",
  },
];

export default function Features() {
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
    <section id="features" className="py-24 bg-muted/30" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="reveal inline-block text-xs uppercase tracking-wider text-primary/80 mb-4 font-semibold">
            Features
          </span>
          <h2 className="reveal reveal-d1 text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for how agents actually run in production
          </h2>
          <p className="reveal reveal-d2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade security and governance for your AI agents
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`reveal reveal-d${
                  (i % 3) + 1
                } group relative bg-card border border-border rounded-2xl p-7 hover:border-primary/50 hover:shadow-xl transition-all duration-300`}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 260px 180px at 50% -20%, #c9644215, transparent)`,
                  }}
                />
                <div className="relative space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="inline-flex px-2.5 py-1 text-xs uppercase tracking-wider text-primary border border-primary/30 rounded-full bg-primary/10">
                    {feature.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
