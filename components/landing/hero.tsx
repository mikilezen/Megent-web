import Link from "next/link";

import { heroContent } from "@/lib/content/site";

export default function Hero() {
  return (
    <section id="home" className="relative mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-0 sm:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-slate-600">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          {heroContent.badge}
        </div>
        <p className="mt-4 text-sm uppercase tracking-[0.32em] text-slate-500">
          {heroContent.eyebrow}
        </p>
        <h1 className="mt-3 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-slate-900 sm:text-6xl lg:text-7xl">
          {heroContent.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
          {heroContent.description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={heroContent.primaryCta.href}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            {heroContent.primaryCta.label}
          </Link>
          <Link
            href={heroContent.secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
          >
            {heroContent.secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
        <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.08),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.08),transparent_38%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)]" />
        <div className="relative grid gap-4 sm:grid-cols-3">
          {["Intake", "Routing", "Risk"].map((title, idx) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{title}</p>
              <p className="mt-3 text-base font-semibold text-slate-900">
                {idx === 0 && "Capture context from every channel"}
                {idx === 1 && "Route work to owners with clarity"}
                {idx === 2 && "Approve high-risk actions before they ship"}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {idx === 0 && "Blend CRM, product, and tickets into one brief."}
                {idx === 1 && "See handoffs across people, agents, and systems."}
                {idx === 2 && "Log, audit, and sign off on sensitive changes."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
