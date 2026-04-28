"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Policies", href: "/registry" },
  { label: "Pricing", href: "/price" },
];

const DROPDOWN_ITEMS = [
  { label: "Docs", href: "https://docs.megent.dev", external: true },
  { label: "GitHub", href: "https://github.com/megents", external: true },
  { label: "Join waitlist", href: "#waitlist" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const scrollToHash = (hash: string) => {
    if (typeof window === "undefined" || !hash.startsWith("#")) return;
    const target = document.querySelector(hash) as HTMLElement | null;
    if (!target) return;
    const headerOffset = 72; // account for fixed header height
    const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  const handleAnchorNav = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      event.preventDefault();
      scrollToHash(href);
    }
    setMenuOpen(false);
    setResourcesOpen(false);
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 88);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const resetNavigationUi = () => {
      setMenuOpen(false);
      setResourcesOpen(false);
      document.body.style.overflow = "";
    };

    window.addEventListener("popstate", resetNavigationUi);
    window.addEventListener("pageshow", resetNavigationUi);

    return () => {
      window.removeEventListener("popstate", resetNavigationUi);
      window.removeEventListener("pageshow", resetNavigationUi);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-[var(--background)] backdrop-blur-none border-[var(--border2)]"
            : "bg-transparent backdrop-blur-none border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Megent home"
          >
            <Image src="/logo.jpg" alt="Megent logo" width={35} height={35} priority className={`rounded-[9px] ${
          scrolled
            ? "shadow"
            : ""
        }`}/>
            <span className="text-[26px] leading-none font-medium tracking-[-0.02em] text-[var(--text)] group-hover:text-[var(--indigo)] transition-colors [font-family:var(--font-serif)]">
              Megent
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {LINKS.map((link) => (
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleAnchorNav(link.href)}
                  className="px-3 py-2 text-[15px] font-medium text-[var(--text2)] rounded-lg hover:text-[var(--text)] hover:bg-[var(--muted)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/40"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setMenuOpen(false);
                    setResourcesOpen(false);
                  }}
                  className="px-3 py-2 text-[15px] font-medium text-[var(--text2)] rounded-lg hover:text-[var(--text)] hover:bg-[var(--muted)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/40"
                >
                  {link.label}
                </Link>
              )
            ))}
            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
              onFocus={() => setResourcesOpen(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                  setResourcesOpen(false);
                }
              }}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-[var(--text2)] rounded-lg hover:text-[var(--text)] hover:bg-[var(--muted)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/40"
                aria-haspopup="true"
                aria-expanded={resourcesOpen}
                onClick={() => setResourcesOpen((open) => !open)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setResourcesOpen(false);
                  }
                }}
              >
                Resources
                <ChevronDownIcon />
              </button>
              <div
                className={`absolute left-0 top-full w-52 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[0_18px_34px_-26px_rgba(20,20,19,0.5)] transition-opacity duration-150 ${
                  resourcesOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="pt-2 pb-2">
                  {DROPDOWN_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-between px-4 py-2 text-[14px] font-medium text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--muted)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/30"
                      onClick={(event) => {
                        if (!item.external) {
                          handleAnchorNav(item.href)(event);
                        } else {
                          setResourcesOpen(false);
                        }
                      }}
                    >
                      {item.label}
                      {item.external ? <ExternalIcon /> : <ArrowRight />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://www.github.com/megents/megent"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 flex gap-2 items-center py-2.5 text-[14px] font-medium text-[var(--text2)] rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--border2)] hover:text-[var(--text)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/40"
            >
              <GithubIcon />
              GitHub
            </a>
            {/* <Link
              href="/login"
              className="px-4 py-2.5 text-[14px] font-medium text-[#faf9f5] bg-[var(--indigo)] rounded-xl hover:brightness-95 transition-all flex items-center gap-2 shadow-[0_0_0_1px_var(--indigo),0_18px_32px_-26px_rgba(20,20,19,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/50"
            >
              Login
            </Link> */}
          </div>

          <button
            className="lg:hidden p-2 rounded-lg text-[var(--text2)] hover:bg-[var(--muted)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/40"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--background)] pt-16 flex flex-col overflow-y-auto lg:hidden">
          <nav className="flex flex-col p-5 gap-1">
            {LINKS.map((link) => (
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleAnchorNav(link.href)}
                  className="px-3 py-3 rounded-lg text-[16px] font-medium text-[var(--text)] hover:bg-[var(--muted)]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setMenuOpen(false);
                    setResourcesOpen(false);
                  }}
                  className="px-3 py-3 rounded-lg text-[16px] font-medium text-[var(--text)] hover:bg-[var(--muted)]"
                >
                  {link.label}
                </Link>
              )
            ))}
            <div className="flex flex-col gap-3 pt-6">
              <a
                href="https://docs.megent.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-3 rounded-lg text-[14px] font-medium text-[var(--text2)] border border-[var(--border)] hover:border-[var(--border2)]"
              >
                Docs
              </a>
              <a
                href="#waitlist"
                onClick={handleAnchorNav("#waitlist")}
                className="px-3 py-3 rounded-lg text-[14px] font-medium text-[#faf9f5] bg-[var(--indigo)] text-center"
              >
                Join waitlist
              </a>
              <a
                href="https://github.com/getmegent"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-3 rounded-lg text-[14px] font-medium text-[var(--text2)] border border-[var(--border)] hover:border-[var(--border2)] flex items-center gap-2"
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

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M14 4h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14l10-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 14v4.5c0 1.93-1.57 3.5-3.5 3.5H6.5A3.5 3.5 0 013 18.5V7.5A3.5 3.5 0 016.5 4H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
