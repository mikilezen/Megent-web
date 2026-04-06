import React from "react";

export default function Policy() {
  return (
    <section id="policy" className="py-24 bg-white border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-14">
          <span className="inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--indigo)] mb-4">
            Policy Marketplace
          </span>
          <h2 className="text-[clamp(28px,4vw,46px)] font-extrabold tracking-[-1.3px] leading-[1.08] text-[var(--text)] mb-4 max-w-3xl">
            Policy Marketplace
          </h2>
          <p className="text-[15px] text-[var(--text2)] leading-[1.8] max-w-2xl">
            This landing page does not hardcode policy templates. All predefined and community policies are
            published in <span className="font-semibold text-[var(--text)]">megent.policy</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
