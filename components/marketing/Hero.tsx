"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Terminal, Copy, Check, Sparkles, Shield, Zap } from "lucide-react";

const LINES = [
  { type: "cmd", text: "megent run --policy ./policy.yaml" },
  {
    type: "info",
    text: "rules: allow | stop_tool | hitl | awareness | budget",
  },
  { type: "ok", text: 'ALLOW send_email(to="***@***.com")' },
  { type: "warn", text: "HITL search_customer_history(...)" },
  { type: "info", text: "RECTIFY sensitive fields -> continue" },
  { type: "block", text: "STOP_TOOL transfer_funds(amount=14200)" },
];

export default function Hero() {
  const pathname = usePathname();
  const [shownLines, setShownLines] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const resetTimer = window.setTimeout(() => {
      setShownLines(0);
      setCopied(false);
    }, 0);

    return () => window.clearTimeout(resetTimer);
  }, [pathname]);

  useEffect(() => {
    if (shownLines >= LINES.length) return;
    const t = setTimeout(
      () => setShownLines((n) => n + 1),
      shownLines === 0 ? 180 : 260
    );
    return () => clearTimeout(t);
  }, [shownLines]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("pip install megent");
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(201,100,66,0.12),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(201,100,66,0.08),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge
            <div className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"></div> */}
            {/* Main Heading */}
            <h1 className="fade-up stagger-item text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                One policy,
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                total control.
              </span>
            </h1>
            {/* Description */}
            <p className="fade-up stagger-item text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Define what your agents can do. Block what they cannot. Enforced
              at every tool call, before it executes.
            </p>
            {/* CTA Buttons */}
            <div className="fade-up stagger-item flex flex-wrap items-center gap-4 pt-4">
              <a
                href="/price"
                className="btn-primary flex items-center gap-2 px-6 py-3 text-base group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="btn-secondary flex items-center gap-2 px-6 py-3 text-base group"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="font-mono text-sm">
                  {copied ? "Copied!" : "pip install megent"}
                </span>
              </button>
            </div>
            {/* Stats */}
            {/* <div className="fade-up stagger-item flex gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  &lt;1ms latency
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  MIT licensed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Python 3.9+
                </span>
              </div>
            </div> */}
          </div>

          {/* Right Column - Terminal */}
          <div className="fade-up stagger-item">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Terminal Window */}
              <div className="relative rounded-2xl border border-border bg-[#0a0a0f] shadow-2xl overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex items-center gap-1.5 ml-3">
                      <Terminal className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-mono">
                        megent-terminal
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    policy.log
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-5 font-mono text-sm">
                  {LINES.slice(0, shownLines).map((line, idx) => (
                    <div
                      key={idx}
                      className="py-0.5 animate-fadeIn"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <span
                        className={`${
                          line.type === "cmd"
                            ? "text-primary"
                            : line.type === "ok"
                            ? "text-emerald-400"
                            : line.type === "block"
                            ? "text-red-400"
                            : line.type === "warn"
                            ? "text-amber-400"
                            : "text-muted-foreground"
                        }`}
                      >
                        {line.type === "cmd" && (
                          <span className="text-primary mr-2">$</span>
                        )}
                        {line.text}
                      </span>
                    </div>
                  ))}
                  {shownLines < LINES.length && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-primary">$</span>
                      <div className="w-2 h-4 bg-primary animate-blink" />
                    </div>
                  )}
                </div>
              </div>

              {/* Terminal Decorative Elements */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />
              <div className="absolute -top-2 -left-2 w-16 h-16 bg-primary/5 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center">
          <div className="w-1 h-2 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 13 13"
      fill="none"
      className={className}
    >
      <path
        d="M2.5 6.5h8M8 3.5l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
