"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Use cases", href: "#usecases" },
  { label: "Open source", href: "#oss" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-[var(--border)] shadow-sm"
            : "bg-white/80 backdrop-blur-md border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5 group" aria-label="Megent home">
            {/* <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--indigo)]" />
            </span> */}
            <img src="/ll.png" alt="" className='w-4'/>
            <span className="font-bold text-[17px] tracking-[-0.4px] text-[var(--text)] group-hover:text-[var(--indigo)] transition-colors">
              megent
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-[13px] font-medium text-[var(--text2)] rounded-md hover:text-[var(--text)] hover:bg-[var(--bg1)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://docs.megent.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-[13px] font-semibold text-[var(--text2)] rounded-md border border-[var(--border)] hover:border-[var(--border2)] hover:text-[var(--text)] transition-colors"
            >
              Docs
            </a>
            <a
              href="#waitlist"
              className="px-3.5 py-2 text-[13px] font-semibold text-white bg-[var(--indigo)] rounded-md hover:bg-indigo-600 transition-colors flex items-center gap-1.5"
            >
              Join waitlist
              <ArrowRight />
            </a>
            <a
              href="https://github.com/getmegent"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-[13px] font-semibold text-[var(--text2)] rounded-md border border-[var(--border)] hover:border-[var(--border2)] hover:text-[var(--text)] transition-colors flex items-center gap-1.5"
            >
              <GithubIcon />
              GitHub
            </a>
          </div>

          <button
            className="lg:hidden p-2 rounded-md text-[var(--text2)] hover:bg-[var(--bg1)] transition-colors"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 flex flex-col overflow-y-auto">
          <nav className="flex flex-col p-5 gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="px-3 py-3 rounded-lg text-[15px] font-semibold text-[var(--text)] hover:bg-[var(--bg1)]"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-6">
              <a
                href="https://docs.megent.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-3 rounded-lg text-[14px] font-semibold text-[var(--text2)] border border-[var(--border)] hover:border-[var(--border2)]"
              >
                Docs
              </a>
              <a
                href="#waitlist"
                onClick={close}
                className="px-3 py-3 rounded-lg text-[14px] font-semibold text-white bg-[var(--indigo)] text-center"
              >
                Join waitlist
              </a>
              <a
                href="https://github.com/getmegent"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-3 rounded-lg text-[14px] font-semibold text-[var(--text2)] border border-[var(--border)] hover:border-[var(--border2)] flex items-center gap-2"
              >
                <GithubIcon />
                GitHub
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0112 5.8c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2.5 6.5h8M8 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
