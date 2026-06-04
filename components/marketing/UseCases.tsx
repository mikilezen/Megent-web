"use client";

import { useState } from "react";
import {
  Banknote,
  Heart,
  Gavel,
  ShieldCheck,
  Building2,
  Briefcase,
  Shield,
} from "lucide-react";

const USE_CASES = [
  {
    title: "Fintech",
    body: "Mask card data and block risky transfers by default. Perfect for payment processors, neobanks, and trading platforms.",
    label: "Financial Services",
    icon: Banknote,
  },
  {
    title: "Healthcare",
    body: "Hide PHI and enforce role checks before external calls. HIPAA-compliant agent operations out of the box.",
    label: "Life Sciences",
    icon: Heart,
  },
  {
    title: "Legal",
    body: "Privilege, confidentiality, and billable-hour audit trails. Every AmLaw firm is blocked on agent deployment for exactly the reasons Megent solves.",
    label: "Professional Services",
    icon: Gavel,
  },
  {
    title: "Insurance",
    body: "Underwriting decisions, claims automation, state-by-state regulatory variance (NAIC model laws). Policy-as-code maps 1:1 to their mental model.",
    label: "Risk Management",
    icon: ShieldCheck,
  },
  {
    title: "Government",
    body: "FedRAMP, FISMA, CJIS. Self-hosted + zero telemetry is your killer feature here. SLED (state/local/education) is a real wedge.",
    label: "Public Sector",
    icon: Building2,
  },
  {
    title: "Enterprise IT",
    body: "The horizontal play. Any Fortune 500 deploying Copilot/Cursor/internal agents needs this. Less regulated but highest volume.",
    label: "Internal Platforms",
    icon: Briefcase,
  },
];

export default function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCase = USE_CASES[activeIndex];
  const Icon = activeCase.icon;

  return (
    <section id="usecases" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs uppercase tracking-wider text-primary/80 mb-4 font-semibold">
            Use Cases
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Pick your workflow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a case to preview the default guard behavior
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {USE_CASES.map((useCase, i) => {
            const CaseIcon = useCase.icon;
            return (
              <button
                key={useCase.title}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <CaseIcon className="w-4 h-4" />
                <span>{useCase.title}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 rounded-2xl border border-border bg-card p-8 lg:grid-cols-[1fr_0.9fr] shadow-xl">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary border border-primary/30 bg-primary/10 mb-4">
              <Shield className="w-3 h-3" />
              {activeCase.label}
            </span>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">
                {activeCase.title}
              </h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {activeCase.body}
            </p>
          </div>

          <div className="relative min-h-[200px] overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(201,100,66,0.15),transparent_70%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className="w-20 h-20 text-primary/20" strokeWidth={1} />
            </div>
            <div className="absolute bottom-4 right-4 text-primary/40 text-sm font-mono">
              {activeCase.label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
