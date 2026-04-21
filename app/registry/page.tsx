"use client";

import Nav from "@/components/marketing/Nav";
import { useState, type CSSProperties } from "react";

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
  badgeColor: string;
};

const policies: Policy[] = [
  {
    id: "pii-mask-strict",
    name: "pii-mask-strict",
    publisher: "megent",
    verified: true,
    desc: "Redacts SSN, email, phone, and credit card patterns before any tool call leaves your agent.",
    tags: ["pii", "compliance", "hipaa"],
    installs: "18.4k",
    version: "0.1",
    badge: "MEGENT",
    badgeColor: "#00ffa3",
  },
  {
    id: "fin-exfil-guard",
    name: "fin-exfil-guard",
    publisher: "megent",
    verified: true,
    desc: "Detects multi-step data exfiltration chains in financial agent sessions. Built for PCI DSS.",
    tags: ["fintech", "exfiltration", "pci-dss"],
    installs: "9.2k",
    version: "0.1",
    badge: "PARTNER",
    badgeColor: "#635bff",
  },
  {
    id: "rate-limit-adaptive",
    name: "rate-limit-adaptive",
    publisher: "megent",
    verified: true,
    desc: "Token-bucket rate limiting per agent session. Adaptive backoff on anomaly detection.",
    tags: ["rate-limit", "ddos", "tokens"],
    installs: "14.1k",
    version: "0.1",
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
    version: "0.1",
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
    version: "0.1",
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
    version: "0.1",
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

  const handleInstall = async (id: string) => {
    setInstalled((prev) => ({ ...prev, [id]: true }));
    try {
      await navigator.clipboard.writeText(`megent policy install ${id}`);
      setCopiedId(id);
    } catch {
      setCopiedId(id);
    }
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={styles.root} className="registry-root">
      <Nav/>
      {/* <style>{css}</style> */}
      {/* <div aria-hidden style={styles.backdropOrbA} />
      <div aria-hidden style={styles.backdropOrbB} />
      <div aria-hidden style={styles.noiseLayer} />

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
          {/* <span style={styles.statPill}>↓ 52.8k installs/mo</span>
          <button style={styles.publishBtn}>Publish Policy ↗</button>
        </div>
      </header> */}
<br />
<br />
<br />
<br />
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

        <div style={styles.resultsBar}>
          <span>{filtered.length.toLocaleString()} result{filtered.length === 1 ? "" : "s"}</span>
          <span style={styles.resultsDivider}>·</span>
          <span>{activeTag === "All" ? "all categories" : activeTag}</span>
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
        {filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <h2 style={styles.emptyTitle}>No policies matched your search</h2>
            <p style={styles.emptyText}>Try another keyword or switch back to all categories.</p>
            <button
              style={styles.resetBtn}
              onClick={() => {
                setSearch("");
                setActiveTag("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
        filtered.map((p) => (
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
                {/* <span style={styles.stat}>↓ {p.installs}</span> */}
                <span style={styles.statDivider}>·</span>
                <span style={styles.statVer}>v{p.version}</span>
              </div>

              <button
                className="install-btn"
                onClick={() => handleInstall(p.id)}
                aria-label={`Install ${p.id}`}
                style={{
                  ...styles.installBtn,
                  ...(installed[p.id] ? styles.installBtnDone : {}),
                }}
              >
                {copiedId === p.id ? "✓ added" : installed[p.id] ? "installed" : "install"}
              </button>
            </div>
          </div>
        ))
        )}
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
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=IBM+Plex+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f5f4ed; }

  .registry-root {
    position: relative;
    overflow: hidden;
  }

  .registry-root::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: radial-gradient(rgba(20, 20, 19, 0.03) 0.6px, transparent 0.6px);
    background-size: 7px 7px;
    opacity: 0.24;
    z-index: 0;
  }

  .registry-root > * {
    position: relative;
    z-index: 1;
  }

  .policy-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }
  .policy-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 0 1px #d6d3c8, 0 18px 40px rgba(40, 38, 33, 0.12);
    border-color: #d2cec1 !important;
  }

  .tag-btn:hover {
    border-color: #d8d1c2 !important;
    background: #f6f2e8 !important;
    color: #3d3d3a !important;
  }

  .install-btn:hover {
    background: #141413 !important;
    color: #f5f4ed !important;
    border-color: #141413 !important;
  }

  .publish-btn:hover {
    background: #c96442 !important;
    border-color: #c96442 !important;
    color: #faf9f5 !important;
  }

  .search-input::placeholder {
    color: #87867f;
  }

  @media (max-width: 820px) {
    .registry-root {
      padding-bottom: 36px;
    }

    .policy-card {
      min-width: 0;
    }

    .install-btn {
      width: 100%;
      margin-top: 8px;
    }
  }

  @media (max-width: 640px) {
    .header-block {
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }

    .header-right {
      width: 100%;
      justify-content: space-between;
    }

    .controls-wrap,
    .registry-grid,
    .terminal-wrap,
    .footer-wrap {
      padding-left: 18px !important;
      padding-right: 18px !important;
    }

    .terminal-wrap {
      overflow-x: auto;
      white-space: nowrap;
    }

    .results-row {
      flex-wrap: wrap;
      row-gap: 6px;
    }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const styles: Record<string, CSSProperties> = {
  root: {
    background: "#f5f4ed",
    minHeight: "100vh",
    fontFamily: "'Manrope', sans-serif",
    color: "#141413",
    padding: "0 0 72px",
  },
  backdropOrbA: {
    position: "absolute",
    top: "-160px",
    right: "-120px",
    width: "440px",
    height: "440px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(201, 100, 66, 0.2) 0%, rgba(201, 100, 66, 0) 68%)",
    pointerEvents: "none",
  },
  backdropOrbB: {
    position: "absolute",
    bottom: "-220px",
    left: "-140px",
    width: "520px",
    height: "520px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(96, 88, 70, 0.14) 0%, rgba(96, 88, 70, 0) 70%)",
    pointerEvents: "none",
  },
  noiseLayer: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.26), rgba(255, 255, 255, 0))",
    pointerEvents: "none",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "26px 40px 22px",
    borderBottom: "1px solid #e8e6dc",
    background: "rgba(250, 249, 245, 0.86)",
    backdropFilter: "blur(6px)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "baseline",
    gap: "20px",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "500",
    letterSpacing: "-0.01em",
  },
  logoM: {
    color: "#141413",
    fontFamily: "'Newsreader', Georgia, serif",
    fontWeight: "600",
    fontSize: "26px",
  },
  logoDot: {
    color: "#87867f",
    margin: "0 4px",
  },
  logoRegistry: {
    color: "#5e5d59",
    fontFamily: "'Manrope', sans-serif",
    fontWeight: "500",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  headerTag: {
    fontSize: "12px",
    color: "#87867f",
    letterSpacing: "0.03em",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  statPill: {
    fontSize: "12px",
    color: "#4d4c48",
    background: "#eee8da",
    border: "1px solid #e0d8c8",
    padding: "6px 11px",
    borderRadius: "999px",
  },
  publishBtn: {
    fontSize: "12px",
    color: "#4d4c48",
    background: "#faf9f5",
    border: "1px solid #d8d1c2",
    padding: "9px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    fontFamily: "'Manrope', sans-serif",
    letterSpacing: "0.02em",
    transition: "all 0.2s ease",
  },
  terminalBar: {
    background: "#faf9f5",
    borderBottom: "1px solid #e8e6dc",
    padding: "12px 40px",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "'IBM Plex Mono', monospace",
  },
  termPrompt: {
    color: "#87867f",
  },
  termCmd: {
    color: "#5e5d59",
  },
  termCursor: {
    color: "#c96442",
  },
  termBlink: {
    color: "#c96442",
    animation: "blink 1.1s step-start infinite",
  },
  controls: {
    padding: "30px 40px 0",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#faf9f5",
    border: "1px solid #e0dbce",
    borderRadius: "14px",
    padding: "0 16px",
    maxWidth: "560px",
    boxShadow: "0 0 0 1px rgba(232, 230, 220, 0.65)",
  },
  searchIcon: {
    color: "#87867f",
    fontSize: "16px",
  },
  searchInput: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#141413",
    fontFamily: "'Manrope', sans-serif",
    fontSize: "14px",
    padding: "12px 0",
    width: "100%",
  },
  tags: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  resultsBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#87867f",
    fontSize: "12px",
    letterSpacing: "0.03em",
  },
  resultsDivider: {
    color: "#c6c0b2",
  },
  tagBtn: {
    background: "#faf9f5",
    border: "1px solid #e0dbce",
    color: "#5e5d59",
    padding: "6px 13px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "'Manrope', sans-serif",
    letterSpacing: "0.03em",
    transition: "all 0.2s",
  },
  tagBtnActive: {
    border: "1px solid #c96442",
    color: "#faf9f5",
    background: "#c96442",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "18px",
    padding: "26px 40px",
  },
  emptyState: {
    gridColumn: "1 / -1",
    background: "#faf9f5",
    border: "1px solid #e8e6dc",
    borderRadius: "16px",
    boxShadow: "0 0 0 1px rgba(232, 230, 220, 0.9)",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "flex-start",
  },
  emptyTitle: {
    fontSize: "30px",
    color: "#141413",
    fontFamily: "'Newsreader', Georgia, serif",
    lineHeight: "1.1",
  },
  emptyText: {
    fontSize: "14px",
    color: "#5e5d59",
    lineHeight: "1.6",
  },
  resetBtn: {
    marginTop: "6px",
    background: "#141413",
    border: "1px solid #141413",
    color: "#faf9f5",
    padding: "9px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "'Manrope', sans-serif",
    letterSpacing: "0.02em",
  },
  card: {
    background: "#faf9f5",
    border: "1px solid #e8e6dc",
    borderRadius: "18px",
    boxShadow: "0 0 0 1px rgba(232, 230, 220, 0.9)",
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    cursor: "default",
  },
  cardTop: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cardMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  badge: {
    fontSize: "10px",
    fontWeight: "600",
    border: "1px solid",
    padding: "3px 8px",
    borderRadius: "999px",
    letterSpacing: "0.08em",
    background: "rgba(255, 255, 255, 0.45)",
  },
  verified: {
    fontSize: "11px",
    color: "#87867f",
  },
  cardName: {
    fontSize: "20px",
    fontWeight: "500",
    lineHeight: "1.2",
  },
  publisher: {
    color: "#87867f",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "13px",
  },
  policyName: {
    color: "#141413",
    fontFamily: "'Newsreader', Georgia, serif",
    fontSize: "30px",
    letterSpacing: "-0.02em",
  },
  desc: {
    fontSize: "14px",
    color: "#5e5d59",
    lineHeight: "1.6",
  },
  cardTags: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  tagChip: {
    fontSize: "11px",
    color: "#5e5d59",
    background: "#f1eee5",
    border: "1px solid #e0dbce",
    padding: "4px 9px",
    borderRadius: "999px",
  },
  cardBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    gap: "8px",
    flexWrap: "wrap",
    paddingTop: "14px",
    borderTop: "1px solid #ece8de",
  },
  cardStats: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "'IBM Plex Mono', monospace",
  },
  stat: {
    fontSize: "12px",
    color: "#5e5d59",
  },
  statDivider: {
    color: "#c6c0b2",
    fontSize: "12px",
  },
  statVer: {
    fontSize: "11px",
    color: "#87867f",
  },
  installBtn: {
    background: "#faf9f5",
    border: "1px solid #d8d1c2",
    color: "#3d3d3a",
    padding: "8px 15px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "'Manrope', sans-serif",
    letterSpacing: "0.02em",
    transition: "all 0.2s",
  },
  installBtnDone: {
    color: "#87867f",
    borderColor: "#ded8ca",
    background: "#f3f0e8",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    gap: "13px",
    fontSize: "12px",
    color: "#87867f",
    padding: "40px",
    borderTop: "1px solid #e8e6dc",
    marginTop: "14px",
  },
  footerDot: {
    color: "#c6c0b2",
  },
};
