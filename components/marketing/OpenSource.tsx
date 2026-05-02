"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const FILES = [
  { icon: "📁", name: "megent/", desc: "core runtime", bold: true },
  { icon: "🐍", name: "megent/guard.py", desc: "4.2 kb - interception engine" },
  { icon: "🐍", name: "megent/policy.py", desc: "3.8 kb - policy evaluation" },
  { icon: "🐍", name: "megent/pii.py", desc: "2.1 kb - PII masking" },
  { icon: "🐍", name: "megent/identity.py", desc: "1.9 kb - JWT agent passports" },
  { icon: "📁", name: "examples/", desc: "langchain, crewai, openai sdk" },
  { icon: "📄", name: "pyproject.toml", desc: "pip installable, MIT licensed" },
];

export default function OpenSource() {
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
    <section id="oss" className="py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          <div>
            <span className="reveal inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--indigo)] mb-4">
              Open source
            </span>
            <h2 className="reveal reveal-d1 text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-1.5px] leading-[1.08] text-[var(--text)] mb-5">
              Built in the open.
              <br />
              Free forever.
            </h2>
            <p className="reveal reveal-d2 text-[16px] text-[var(--text2)] leading-[1.75] mb-8">
              The core runtime - interception, policy evaluation, PII masking, audit logging - is MIT licensed and will stay that way.
              We're building trust with developers first. Enterprise features (SSO, centralized dashboards, managed rulesets) come later, optionally.
            </p>

            <div className="reveal reveal-d2 grid grid-cols-3 gap-4 mb-8">
              {[{ n: "MIT", l: "License" }, { n: "0", l: "Telemetry" }, { n: "∞", l: "Free tier" }].map((stat) => (
                <div key={stat.l} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg1)] text-center">
                  <div className="text-[18px] font-semibold text-[var(--text)]">{stat.n}</div>
                  <div className="text-[12px] font-mono text-[var(--text3)]">{stat.l}</div>
                </div>
              ))}
            </div>

            <div className="reveal reveal-d3 flex flex-wrap gap-3">
              <a
                href="https://github.com/getmegent"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-[var(--text)] border border-[var(--border)] rounded-lg hover:border-[var(--border2)] hover:bg-[var(--bg1)] transition-all"
              >
                <GithubIcon />
                View on GitHub
              </a>
              <a
                href="https://docs.megent.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-[var(--indigo)] border border-[var(--indigo-border)] rounded-lg hover:bg-[var(--indigo-light)] transition-all"
              >
                Read the docs →
              </a>
            </div>
          </div>

          <div className="reveal reveal-d2">
            <div className="bg-[var(--bg1)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-card-md">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-white">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-[var(--text)]">
                  <FolderIcon />
                  megent repository
                </div>
                <span className="text-[11px] font-mono text-[var(--text3)]">MIT</span>
              </div>
              <div className="p-3 flex flex-col gap-1 text-[14px] font-mono text-[var(--text2)]">
                {FILES.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[15px]">{file.icon}</span>
                      <span className={`font-semibold ${file.bold ? "text-[var(--text)]" : "text-[var(--text2)]"}`}>
                        {file.name}
                      </span>
                    </div>
                    <span className="text-[12px] text-[var(--text3)]">{file.desc}</span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-4 border-t border-[var(--border)] bg-white flex items-center justify-between text-[12px] text-[var(--text3)]">
                <span>pip install megent</span>
                <span>python 3.9+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0112 5.8c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h5l2 2h9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </svg>
  );
}
