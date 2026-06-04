"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Github,
  Sparkles,
  BookOpen,
  Users,
  Mail,
} from "lucide-react";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Policies", href: "/registry" },
  { label: "Pricing", href: "/price" },
];

const DROPDOWN_ITEMS = [
  {
    label: "Docs",
    href: "https://docs.megent.dev",
    external: true,
    icon: BookOpen,
  },
  {
    label: "GitHub",
    href: "https://github.com/megents",
    external: true,
    icon: Github,
  },
  { label: "Join waitlist", href: "#waitlist", icon: Users },
  {
    label: "Contact",
    href: "mailto:hello@megent.dev",
    external: true,
    icon: Mail,
  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToHash = (hash: string) => {
    if (typeof window === "undefined" || !hash.startsWith("#")) return;
    const target = document.querySelector(hash) as HTMLElement | null;
    if (!target) return;
    const headerOffset = 72;
    const y =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  const handleAnchorNav =
    (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith("#")) {
        event.preventDefault();
        scrollToHash(href);
      }
      setMenuOpen(false);
      setResourcesOpen(false);
    };

  // Handle dropdown with delay for better UX
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setResourcesOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setResourcesOpen(false);
    }, 200);
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-primary/20 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group relative"
              aria-label="Megent home"
            >
              <div className="relative">
                <Image
                  src="/logo.jpg"
                  alt="Megent logo"
                  width={35}
                  height={35}
                  className="rounded-lg"
                />
                <div className="absolute inset-0 rounded-lg bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Megent
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {LINKS.map((link) =>
                link.href.startsWith("#") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleAnchorNav(link.href)}
                    className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group"
                  >
                    {link.label}
                    <span className="absolute inset-x-4 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group"
                  >
                    {link.label}
                    <span className="absolute inset-x-4 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Link>
                )
              )}

              {/* Resources Dropdown - Fixed hover issue */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group flex items-center gap-1"
                  aria-expanded={resourcesOpen}
                >
                  Resources
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      resourcesOpen ? "rotate-180" : ""
                    }`}
                  />
                  <span className="absolute inset-x-4 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </button>

                {/* Dropdown Menu - Fixed positioning and visibility */}
                <div
                  className={`absolute top-full left-0 mt-2 w-56 rounded-xl overflow-hidden transition-all duration-300 ${
                    resourcesOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                  style={{ zIndex: 100 }}
                >
                  <div className="bg-[#111115]/95 backdrop-blur-xl border border-primary/20 rounded-xl shadow-2xl">
                    <div className="py-2">
                      {DROPDOWN_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.href}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={
                              item.external ? "noopener noreferrer" : undefined
                            }
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 group"
                            onClick={(event) => {
                              if (!item.external && item.href.startsWith("#")) {
                                event.preventDefault();
                                scrollToHash(item.href);
                                setResourcesOpen(false);
                              }
                            }}
                          >
                            <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="flex-1">{item.label}</span>
                            {item.external && (
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-muted-foreground group-hover:text-primary transition-colors"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://github.com/megents/megent"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </a>
              <Link
                href="/price"
                className="btn-primary px-5 py-2 text-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-xl pt-20 flex flex-col lg:hidden animate-slideRight">
          <nav className="flex flex-col p-6 gap-2">
            {LINKS.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleAnchorNav(link.href)}
                  className="px-4 py-3 rounded-lg text-lg font-medium text-foreground hover:bg-primary/10 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-lg font-medium text-foreground hover:bg-primary/10 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Mobile Resources Section */}
            <div className="mt-4">
              <p className="px-4 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Resources
              </p>
              {DROPDOWN_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-primary/10 transition-colors"
                    onClick={(event) => {
                      if (!item.external && item.href.startsWith("#")) {
                        event.preventDefault();
                        scrollToHash(item.href);
                        setMenuOpen(false);
                      }
                    }}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-6 mt-4 border-t border-border">
              <Link
                href="/price"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full text-center"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
