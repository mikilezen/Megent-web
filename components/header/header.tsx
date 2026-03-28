"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { navItems } from "@/lib/content/site";

function NavLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-full px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center gap-4 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-lg shadow-slate-200/50">
        <Link href="#home" className="flex items-center gap-3">
          <Image src="/ll.png" alt="Megent Logo" width={32} height={32} className="rounded-full" />
          <span className="text-sm font-medium text-slate-900">Megent</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.label} {...item} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="#contact"
            className="hidden rounded-full px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 md:inline-flex"
          >
            Talk to us
          </Link>
          <Link
            href="#about"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Get started
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-3 max-w-6xl rounded-3xl border border-slate-200 bg-white p-4 shadow-xl md:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink key={item.label} {...item} onClick={() => setOpen(false)} />
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}