"use client";

import { useState, type CSSProperties } from "react";

type Policy = {
  id: string;
  name: string;
  publisher: string;
  verified: boolean;
  desc: string;
  tags: string[];
  installs: string;
  stars: number;
  version: string;
  badge: string;
  badgeColor: string;
};

const policies: Policy[] = [
  {
    id: "pii-mask-strict",
    name: "pii-mask-strict",
    publisher: "megent-official",
    verified: true,
    desc: "Redacts SSN, email, phone, and credit card patterns before any tool call leaves your agent.",
    tags: ["pii", "compliance", "hipaa"],
    installs: "18.4k",
    stars: 312,
    version: "2.1.0",
    badge: "OFFICIAL",
    badgeColor: "#00ffa3",
  },
  {
    id: "fin-exfil-guard",
    name: "fin-exfil-guard",
    publisher: "stripe-security",
    verified: true,
    desc: "Detects multi-step data exfiltration chains in financial agent sessions. Built for PCI DSS.",
    tags: ["fintech", "exfiltration", "pci-dss"],
    installs: "9.2k",
    stars: 187,
    version: "1.4.2",
    badge: "PARTNER",
    badgeColor: "#635bff",
  },
  {
    id: "rate-limit-adaptive",
    name: "rate-limit-adaptive",
    publisher: "megent-official",
    verified: true,
    desc: "Token-bucket rate limiting per agent session. Adaptive backoff on anomaly detection.",
    tags: ["rate-limit", "ddos", "tokens"],
    installs: "14.1k",
    stars: 241,
    version: "3.0.1",
    badge: "OFFICIAL",
    badgeColor: "#00ffa3",
  },
  {
    id: "hipaa-audit-trail",
    name: "hipaa-audit-trail",
    publisher: "healthai-labs",
    verified: false,
    desc: "Structured HIPAA-compliant audit logs with PHI tagging and access pattern analysis.",
    tags: ["hipaa", "healthcare", "audit"],
    installs: "6.7k",
    stars: 98,
    version: "1.1.0",
    badge: "COMMUNITY",
    badgeColor: "#778ca3",
  },
  {
    id: "goal-drift-detector",
    name: "goal-drift-detector",
    publisher: "megent-official",
    verified: true,
    desc: "LLM-scored behavioral sequence analysis. Flags when agent objectives deviate from initial intent.",
    tags: ["behavioral", "drift", "llm-analysis"],
    installs: "4.3k",
    stars: 156,
    version: "0.9.1",
    badge: "OFFICIAL",
    badgeColor: "#00ffa3",
  },
  {
    id: "jwt-agent-identity",
    name: "jwt-agent-identity",
    publisher: "megent-official",
    verified: true,
    desc: "Passport/visa model for agent identity. Scoped JWTs with TTL, rotation, and revocation.",
    tags: ["identity", "jwt", "enterprise"],
    installs: "3.1k",
    stars: 129,
    version: "1.0.0",
    badge: "OFFICIAL",
    badgeColor: "#00ffa3",
  },
];

const categories = ["All", "pii", "fintech", "hipaa", "behavioral", "identity", "rate-limit"];

export default function RegistryPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [installed, setInstalled] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = policies.filter((p) => {
    const matchTag = activeTag === "All" || p.tags.includes(activeTag);
    const lowered = search.toLowerCase();
    const matchSearch =
      search === "" || p.name.toLowerCase().includes(lowered) || p.desc.toLowerCase().includes(lowered);
    return matchTag && matchSearch;
  });

  const handleInstall = (id: string) => {
    setInstalled((prev) => ({ ...prev, [id]: true }));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={styles.root}>
      <style>{css}</style>

      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>
            <span style={styles.logoM}>megent</span>
            <span style={styles.logoDot}>/</span>
            <span style={styles.logoRegistry}>registry</span>
          </span>
          <span style={styles.headerTag}>policy marketplace · {policies.length.toLocaleString()} policies</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.statPill}>↓ 52.8k installs/mo</span>
          <button style={styles.publishBtn}>Publish Policy ↗</button>
        </div>
      </header>

      <div style={styles.terminalBar}>
        <span style={styles.termPrompt}>$</span>
        <span style={styles.termCmd}>megent policy install </span>
        <span style={styles.termCursor}>pii-mask-strict</span>
        <span style={styles.termBlink}>▋</span>
      </div>

      <div style={styles.controls}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>⌕</span>
          <input
            style={styles.searchInput}
            placeholder="search policies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={styles.tags}>
          {categories.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              style={{
                ...styles.tagBtn,
                ...(activeTag === t ? styles.tagBtnActive : {}),
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.grid}>
        {filtered.map((p) => (
          <div key={p.id} className="policy-card" style={styles.card}>
            <div style={styles.cardTop}>
              <div style={styles.cardMeta}>
                <span style={{ ...styles.badge, color: p.badgeColor, borderColor: `${p.badgeColor}44` }}>
                  {p.badge}
                </span>
                {p.verified && <span style={styles.verified}>✓ verified</span>}
              </div>

              <div style={styles.cardName}>
                <span style={styles.publisher}>{p.publisher}/</span>
                <span style={styles.policyName}>{p.name}</span>
              </div>

              <p style={styles.desc}>{p.desc}</p>
            </div>

            <div style={styles.cardTags}>
              {p.tags.map((t) => (
                <span key={t} style={styles.tagChip}>
                  {t}
                </span>
              ))}
            </div>

            <div style={styles.cardBottom}>
              <div style={styles.cardStats}>
                <span style={styles.stat}>↓ {p.installs}</span>
                <span style={styles.statDivider}>·</span>
                <span style={styles.stat}>★ {p.stars}</span>
                <span style={styles.statDivider}>·</span>
                <span style={styles.statVer}>v{p.version}</span>
              </div>

              <button
                className="install-btn"
                onClick={() => handleInstall(p.id)}
                style={{
                  ...styles.installBtn,
                  ...(installed[p.id] ? styles.installBtnDone : {}),
                }}
              >
                {copiedId === p.id ? "✓ added" : installed[p.id] ? "installed" : "megent install"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer style={styles.footer}>
        <span>megent.dev</span>
        <span style={styles.footerDot}>·</span>
        <span>apache 2.0</span>
        <span style={styles.footerDot}>·</span>
        <span>submit a policy →</span>
      </footer>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@400;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f4f7fb; }

  .policy-card {
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  }
  .policy-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 34px rgba(13, 71, 161, 0.1), 0 4px 10px rgba(15, 23, 42, 0.06);
    border-color: #0ea5a433 !important;
  }
  .install-btn:hover {
    background: #0ea5a4 !important;
    color: #ffffff !important;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const styles: Record<string, CSSProperties> = {
  root: {
    background: "#f4f7fb",
    minHeight: "100vh",
    fontFamily: "'IBM Plex Mono', monospace",
    color: "#0f172a",
    padding: "0 0 60px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 40px 20px",
    borderBottom: "1px solid #d6deea",
  },
  headerLeft: {
    display: "flex",
    alignItems: "baseline",
    gap: "20px",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "600",
    letterSpacing: "-0.02em",
  },
  logoM: {
    color: "#0ea5a4",
    fontFamily: "'Syne', sans-serif",
    fontWeight: "800",
    fontSize: "20px",
  },
  logoDot: {
    color: "#8aa0b6",
    margin: "0 2px",
  },
  logoRegistry: {
    color: "#334155",
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeight: "400",
    fontSize: "14px",
  },
  headerTag: {
    fontSize: "11px",
    color: "#64748b",
    letterSpacing: "0.04em",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  statPill: {
    fontSize: "11px",
    color: "#0f766e",
    background: "#ccfbf1",
    border: "1px solid #99f6e4",
    padding: "4px 10px",
    borderRadius: "2px",
  },
  publishBtn: {
    fontSize: "11px",
    color: "#0f172a",
    background: "transparent",
    border: "1px solid #cbd5e1",
    padding: "6px 14px",
    borderRadius: "2px",
    cursor: "pointer",
    fontFamily: "'IBM Plex Mono', monospace",
    letterSpacing: "0.02em",
  },
  terminalBar: {
    background: "#ffffff",
    borderBottom: "1px solid #d6deea",
    padding: "10px 40px",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  termPrompt: {
    color: "#64748b",
  },
  termCmd: {
    color: "#475569",
  },
  termCursor: {
    color: "#0f766e",
  },
  termBlink: {
    color: "#0f766e",
    animation: "blink 1.1s step-start infinite",
  },
  controls: {
    padding: "24px 40px 0",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#ffffff",
    border: "1px solid #d6deea",
    borderRadius: "3px",
    padding: "0 16px",
    maxWidth: "480px",
  },
  searchIcon: {
    color: "#94a3b8",
    fontSize: "16px",
  },
  searchInput: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#0f172a",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "13px",
    padding: "10px 0",
    width: "100%",
  },
  tags: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  tagBtn: {
    background: "transparent",
    border: "1px solid #d6deea",
    color: "#64748b",
    padding: "4px 12px",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "11px",
    fontFamily: "'IBM Plex Mono', monospace",
    letterSpacing: "0.04em",
    transition: "all 0.12s",
  },
  tagBtnActive: {
    border: "1px solid #5eead4",
    color: "#0f766e",
    background: "#ccfbf1",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "16px",
    padding: "24px 40px",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #d6deea",
    borderRadius: "4px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    cursor: "default",
  },
  cardTop: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  cardMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  badge: {
    fontSize: "9px",
    fontWeight: "600",
    border: "1px solid",
    padding: "2px 6px",
    borderRadius: "2px",
    letterSpacing: "0.08em",
  },
  verified: {
    fontSize: "10px",
    color: "#64748b",
  },
  cardName: {
    fontSize: "14px",
    fontWeight: "500",
  },
  publisher: {
    color: "#64748b",
  },
  policyName: {
    color: "#0f172a",
  },
  desc: {
    fontSize: "12px",
    color: "#475569",
    lineHeight: "1.6",
  },
  cardTags: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
  tagChip: {
    fontSize: "10px",
    color: "#0f766e",
    background: "#f0fdfa",
    border: "1px solid #ccfbf1",
    padding: "2px 8px",
    borderRadius: "2px",
  },
  cardBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: "14px",
    borderTop: "1px solid #e2e8f0",
  },
  cardStats: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  stat: {
    fontSize: "11px",
    color: "#64748b",
  },
  statDivider: {
    color: "#cbd5e1",
    fontSize: "11px",
  },
  statVer: {
    fontSize: "10px",
    color: "#94a3b8",
  },
  installBtn: {
    background: "transparent",
    border: "1px solid #99f6e4",
    color: "#0f766e",
    padding: "5px 14px",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "11px",
    fontFamily: "'IBM Plex Mono', monospace",
    letterSpacing: "0.04em",
    transition: "all 0.15s",
  },
  installBtnDone: {
    color: "#94a3b8",
    borderColor: "#d6deea",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    fontSize: "11px",
    color: "#64748b",
    padding: "40px",
    borderTop: "1px solid #d6deea",
  },
  footerDot: {
    color: "#cbd5e1",
  },
};
