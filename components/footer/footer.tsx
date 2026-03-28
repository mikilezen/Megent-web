import Link from "next/link";
import { footerColumns } from "@/lib/content/site";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto mt-24 w-full max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:mt-32 sm:px-8"
    >
      <div className="grid gap-10 md:grid-cols-4">
        {footerColumns.map((column) => (
          <div key={column.title} className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
              {column.title}
            </p>
            <div className="space-y-2">
              {column.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-slate-600 transition hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="relative mt-12 overflow-hidden border-t border-slate-200 pt-8">
        <p className="select-none text-[clamp(4rem,16vw,12rem)] font-semibold leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_rgba(15,23,42,0.12)]">
          Megent
        </p>
      </div>
    </footer>
  );
}
