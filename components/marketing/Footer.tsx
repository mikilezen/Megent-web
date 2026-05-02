"use client";

import Image from "next/image";
import Link from "next/link";

const LINKS = {
  Product: [
    { label: "Documentation", href: "https://megent.dev/doc" },
    { label: "GitHub", href: "https://github.com/megents" },
    { label: "How it works", href: "#how" },
    { label: "Features", href: "#features" },
    { label: "Changelog", href: "https://megent.dev/changelog" },
  ],
  Community: [
    { label: "GitHub Discussions", href: "https://github.com/megents/megent/discussions" },
    { label: "Twitter / X", href: "https://twitter.com/magents_" },
    { label: "Report a bug", href: "https://github.com/megents/megent/issues" },
    { label: "Contributing", href: "https://github.com/megents/megent/blob/main/CONTRIBUTING.md" },
  ],
  Company: [
    { label: "Contact us", href: "mailto:hello@megent.dev" },
    { label: "Early access", href: "#waitlist" },
    { label: "Blog", href: "https://megent.dev/blog" },
    { label: "Privacy", href: "https://megent.dev/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-14 sm:px-8">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="mb-4 flex items-center gap-2.5"
              aria-label="Megent home"
            >
              <Image src="/logo.jpg" alt="Megent" width={40} height={40} className="rounded-[12px]" />
              <span className="text-[30px] font-medium leading-none tracking-[-0.02em] text-[var(--text)] [font-family:var(--font-serif)]">Megent</span>
            </Link>
            <p className="max-w-[280px] text-[15px] leading-[1.7] text-[var(--text2)]">
              Policy language and runtime security for AI agents, designed with calm controls and deterministic enforcement.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/megents"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[12px] font-medium text-[var(--text2)] transition-all hover:border-[var(--border2)] hover:text-[var(--text)]"
              >
                <GithubIcon />
                GitHub
              </a>
              <a
                href="https://twitter.com/magents_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[12px] font-medium text-[var(--text2)] transition-all hover:border-[var(--border2)] hover:text-[var(--text)]"
              >
                <TwitterIcon />
                X
              </a>
            </div>
          </div>

          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-[11px] uppercase tracking-[0.14em] text-[var(--text3)]">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[15px] text-[var(--text2)] transition-colors hover:text-[var(--text)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center">
            <p className="text-[12px] text-[var(--text3)]">© 2026 Megent. Apache 2.0 licensed.</p>
            <p className="text-[12px] text-[var(--text3)]">Built for policy-first AI operations.</p>
        </div>
      </div>
    </footer>
  );
}

function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0112 5.8c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.162 5.656c-.793.351-1.644.589-2.538.695a4.426 4.426 0 001.942-2.444 8.84 8.84 0 01-2.805 1.072 4.404 4.404 0 00-7.498 4.01 12.487 12.487 0 01-9.065-4.594 4.405 4.405 0 001.361 5.872 4.378 4.378 0 01-1.995-.551v.056a4.404 4.404 0 003.531 4.318 4.41 4.41 0 01-1.99.076 4.409 4.409 0 004.113 3.057A8.837 8.837 0 012 19.54a12.46 12.46 0 006.746 1.978c8.095 0 12.525-6.705 12.525-12.525 0-.19-.004-.379-.012-.567a8.94 8.94 0 002.203-2.27z" />
    </svg>
  );
}
