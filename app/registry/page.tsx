"use client";

import Nav from "@/components/marketing/Nav";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Check,
  Copy,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Code,
  ExternalLink,
  X,
} from "lucide-react";
import Link from "next/link";

type Policy = {
  id: string;
  name: string;
  publisher: string;
  verified: boolean;
  desc: string;
  tags: string[];
  installs: string;
  version: string;
  badge: string;
  category: string;
};

const policies: Policy[] = [
  {
    id: "pii-mask-strict",
    name: "PII Mask Strict",
    publisher: "megent",
    verified: true,
    desc: "Redacts SSN, email, phone, and credit card patterns before any tool call leaves your agent.",
    tags: ["pii", "compliance", "hipaa"],
    installs: "18.4k",
    version: "v2.1.0",
    badge: "Official",
    category: "Security",
  },
  {
    id: "fin-exfil-guard",
    name: "Financial Exfiltration Guard",
    publisher: "megent",
    verified: true,
    desc: "Detects multi-step data exfiltration chains in financial agent sessions. Built for PCI DSS.",
    tags: ["fintech", "exfiltration", "pci-dss"],
    installs: "9.2k",
    version: "v1.3.0",
    badge: "Verified",
    category: "Financial",
  },
  {
    id: "rate-limit-adaptive",
    name: "Adaptive Rate Limiter",
    publisher: "megent",
    verified: true,
    desc: "Token-bucket rate limiting per agent session. Adaptive backoff on anomaly detection.",
    tags: ["rate-limit", "ddos", "performance"],
    installs: "14.1k",
    version: "v1.8.0",
    badge: "Official",
    category: "Performance",
  },
  {
    id: "hipaa-audit-trail",
    name: "HIPAA Audit Trail",
    publisher: "healthai-labs",
    verified: false,
    desc: "Structured HIPAA-compliant audit logs with PHI tagging and access pattern analysis.",
    tags: ["hipaa", "healthcare", "compliance"],
    installs: "6.7k",
    version: "v1.0.0",
    badge: "Community",
    category: "Healthcare",
  },
  {
    id: "goal-drift-detector",
    name: "Goal Drift Detector",
    publisher: "megent",
    verified: true,
    desc: "LLM-scored behavioral sequence analysis. Flags when agent objectives deviate from initial intent.",
    tags: ["behavioral", "monitoring", "ai-safety"],
    installs: "4.3k",
    version: "v1.2.0",
    badge: "Official",
    category: "Safety",
  },
  {
    id: "jwt-agent-identity",
    name: "JWT Agent Identity",
    publisher: "megent",
    verified: true,
    desc: "Passport/visa model for agent identity. Scoped JWTs with TTL, rotation, and revocation.",
    tags: ["identity", "security", "enterprise"],
    installs: "3.1k",
    version: "v2.0.0",
    badge: "Official",
    category: "Security",
  },
];

const categories = [
  "All",
  "Security",
  "Financial",
  "Performance",
  "Healthcare",
  "Safety",
];

export default function RegistryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [installed, setInstalled] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const filtered = policies.filter((p) => {
    const matchCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const handleInstall = async (id: string) => {
    setInstalled((prev) => ({ ...prev, [id]: true }));
    try {
      await navigator.clipboard.writeText(`megent policy install ${id}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Security":
        return <Shield className="w-4 h-4" />;
      case "Financial":
        return <TrendingUp className="w-4 h-4" />;
      case "Performance":
        return <Zap className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Nav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-primary">Policy Marketplace</span>
          </div>

          <h1 className="fade-up stagger-item text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Agent Policy Registry
          </h1>

          <p className="fade-up stagger-item text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover, install, and manage production-ready policies for your AI
            agents
          </p>

          <div className="fade-up stagger-item max-w-2xl mx-auto">
            <div className="glass rounded-xl p-1 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search policies by name, description, or tags..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none py-3 text-foreground placeholder:text-muted-foreground"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="p-1 hover:bg-muted rounded-lg transition"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              <button className="btn-primary px-6 py-2">Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category, idx) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                  : "glass-white text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {category === "All" ? (
                category
              ) : (
                <span className="flex items-center gap-2">
                  {getCategoryIcon(category)}
                  {category}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Results Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-semibold">
              {filtered.length}
            </span>{" "}
            policies
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>Sort by: Popularity</span>
          </div>
        </div>
      </section>

      {/* Policy Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((policy, idx) => (
            <div
              key={policy.id}
              className={`premium-card group ${animateCards ? "scale-in" : ""}`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        policy.badge === "Official"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : policy.badge === "Verified"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      }`}
                    >
                      {policy.badge}
                    </div>
                    {policy.verified && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ↓ {policy.installs}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {policy.name}
                </h3>

                {/* Publisher */}
                <p className="text-sm text-muted-foreground mb-3">
                  by {policy.publisher}
                </p>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {policy.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {policy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    Version {policy.version}
                  </div>
                  <button
                    onClick={() => handleInstall(policy.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      installed[policy.id]
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20"
                    }`}
                  >
                    {copiedId === policy.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : installed[policy.id] ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Installed</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Install</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No policies found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </section>

      {/* Terminal Demo Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <p className="text-sm text-muted-foreground">terminal</p>
            </div>
            <div className="font-mono text-sm space-y-2">
              <p className="text-primary">
                $ megent policy search --category security
              </p>
              <p className="text-emerald-400">
                ✓ Found 12 policies matching your criteria
              </p>
              <p className="text-muted-foreground">
                $ megent policy install pii-mask-strict
              </p>
              <p className="text-emerald-400">
                ✓ Policy installed successfully
              </p>
              <div className="animate-pulse flex items-center gap-2 mt-2">
                <span className="text-primary">$</span>
                <span className="w-2 h-4 bg-primary animate-blink" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
