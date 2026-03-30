const LINKS = {
  Product: [
    { label: "Documentation", href: "https://docs.megent.dev" },
    { label: "GitHub", href: "https://github.com/getmegent" },
    { label: "How it works", href: "#how" },
    { label: "Features", href: "#features" },
    { label: "Changelog", href: "https://megent.dev/changelog" },
  ],
  Community: [
    { label: "GitHub Discussions", href: "https://github.com/getmegent/megent/discussions" },
    { label: "Twitter / X", href: "https://twitter.com/magentlabs" },
    { label: "Report a bug", href: "https://github.com/getmegent/megent/issues" },
    { label: "Contributing", href: "https://github.com/getmegent/megent/blob/main/CONTRIBUTING.md" },
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
    <footer className="bg-[var(--bg1)] border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">
          <div>
            <a href="" className="flex items-center gap-2.5 mb-4" aria-label="Megent home">
              {/* <span className="relative flex h-2.5 w-2.5"> */}
                {/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-40" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--indigo)]" /> */}
              {/* </span> */}
              <img src="ll.png" alt="Megent" className="p-4 scale-115 h-15" />
              <span className="font-bold text-[17px] tracking-[-0.4px] text-[var(--text)]">megent</span>
            </a>
            <p className="font-mono text-[12px] text-[var(--text3)] leading-[1.8] max-w-[240px]">
              Policy language and runtime security for AI agents. .
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://github.com/getmegent"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] text-[var(--text2)] border border-[var(--border)] rounded-md hover:border-[var(--border2)] hover:text-[var(--text)] transition-all"
              >
                <GithubIcon />
                GitHub
              </a>
              <a
                href="https://twitter.com/magentlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] text-[var(--text2)] border border-[var(--border)] rounded-md hover:border-[var(--border2)] hover:text-[var(--text)] transition-all"
              >
                <TwitterIcon />
                Twitter
              </a>
            </div>
          </div>

          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-mono text-[11px] uppercase tracking-widest text-[var(--text3)] mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-[var(--text2)] hover:text-[var(--text)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
          <p className="font-mono text-[11px] text-[var(--text3)]">© 2025 Megent. MIT licensed. Built</p>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] border border-[var(--border)] bg-white rounded px-2.5 py-1 text-[var(--text3)]">MIT</span>
            <span className="font-mono text-[10px] border border-[var(--border)] bg-white rounded px-2.5 py-1 text-[var(--text3)]">Python 3.9+</span>
            <span className="font-mono text-[10px] border border-[var(--border)] bg-white rounded px-2.5 py-1 text-[var(--text3)]">0 telemetry</span>
          </div>
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
