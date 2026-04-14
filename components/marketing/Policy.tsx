import React from "react";

export default function Policy() {
  return (
    <section id="policy" className="py-24 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-10">
          <span className="inline-block text-[11px] uppercase tracking-[0.12em] text-[var(--text3)] mb-4">
            Policy Marketplace
          </span>
          <h2 className="text-[clamp(30px,4vw,46px)] font-medium tracking-[-0.02em] leading-[1.08] text-[var(--text)] mb-4 max-w-3xl [font-family:var(--font-serif)]">
            Policy Marketplace
          </h2>
          <p className="text-[15px] text-[var(--text2)] leading-[1.8] max-w-2xl">
            Discover predefined and community-authored policy packs, all versioned and ready for production workflows.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] min-h-[310px] p-6 sm:p-7 flex flex-col justify-end">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(24,18,13,0.72), rgba(24,18,13,0.36)), url('/images%20(4).jfif')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.16),transparent_45%)]" />

            <div className="relative z-10 max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/80 mb-2">Featured Bundle</p>
              <h3 className="text-[clamp(24px,3vw,34px)] leading-[1.08] [font-family:var(--font-serif)] text-white mb-3">
                E-commerce Store Shield
              </h3>
              <p className="text-sm leading-7 text-white/85 max-w-lg">
                Checkout fraud rules, customer PII masking, and outbound notification controls packaged into one production-ready policy set.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-7">
            <h3 className="text-xl [font-family:var(--font-serif)] text-[var(--text)] mb-4">Top policy packs</h3>
            <div className="space-y-3">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
                <p className="text-sm font-medium text-[var(--text)]">Storefront Privacy</p>
                <p className="mt-1 text-[13px] text-[var(--text2)]">Mask email, phone, and order metadata in support tooling.</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
                <p className="text-sm font-medium text-[var(--text)]">Checkout Guardrails</p>
                <p className="mt-1 text-[13px] text-[var(--text2)]">Rate limits and policy checks for payment and shipping workflows.</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
                <p className="text-sm font-medium text-[var(--text)]">Comms Compliance</p>
                <p className="mt-1 text-[13px] text-[var(--text2)]">Automated masking for outbound email, SMS, and agent notifications.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
