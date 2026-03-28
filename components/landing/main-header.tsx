"use client";

import Image from "next/image";
import { Menu, Moon, Sun, X } from "lucide-react";

type MainHeaderProps = {
  navItems: string[];
  isDark: boolean;
  onToggleTheme: () => void;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onCloseMobile: () => void;
};

export default function MainHeader({
  navItems,
  isDark,
  onToggleTheme,
  mobileOpen,
  onToggleMobile,
  onCloseMobile,
}: MainHeaderProps) {
  return (
    <>
      <header className="fade-up fixed left-1/2 top-4 z-40 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full bg- px-3 py-3 backdrop-blur-xl sm:px-5">
        <div className="flex items-center gap-3">
          <Image src="/ll.png" alt="Megent" width={28} height={28} className="rounded-full" />
          <span className="text-sm font-medium tracking-[0.18em] text-white/90">Magent</span>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-full px-4 py-2 text-sm text-white/60 transition hover:bg-white/8 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#tasks"
            className="hidden px-4 py-2 text-sm text-white/70 transition hover:text-white sm:inline-flex"
          >
            See Tasks
          </a>
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={onToggleTheme}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/90 transition hover:bg-white/10"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={onToggleMobile}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/90 transition hover:bg-white/10 md:hidden"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <>
          <button
            type="button"
            aria-label="Close mobile menu backdrop"
            onClick={onCloseMobile}
            className="fixed inset-0 z-20 bg-black/35 backdrop-blur-sm md:hidden"
          />
          <div className="fade-up relative z-30 mt-18 rounded-3xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={onCloseMobile}
                  className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/70 transition hover:bg-white/8 hover:text-white"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </>
      ) : null}
    </>
  );
}
