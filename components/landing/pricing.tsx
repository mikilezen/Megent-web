import { ChartNoAxesCombined } from "lucide-react";

import { pricingPlans } from "@/lib/content/site";

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto mt-24 max-w-6xl px-4 text-center sm:px-0 sm:mt-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.32em] text-white/50">Pricing</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
          Choose the control you need
        </h2>
        <p className="mt-4 text-base leading-7 text-white/60">
          Each plan includes observability, routing, and safety layers. Upgrade when you need more
          governance and scale.
        </p>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <article
            key={plan.name}
            className={[
              "rounded-[1.9rem] border p-7 text-left",
              plan.featured
                ? "border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] shadow-[0_20px_70px_rgba(255,255,255,0.06)]"
                : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]",
            ].join(" ")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold text-white">{plan.name}</p>
                <p className="mt-2 text-sm text-white/55">{plan.subtitle}</p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/8 p-2">
                <ChartNoAxesCombined className="size-4 text-white/80" />
              </div>
            </div>

            <div className="mt-8 flex items-end gap-2">
              <span className="text-5xl font-semibold tracking-[-0.05em] text-white">{plan.price}</span>
              <span className="pb-2 text-sm text-white/45">{plan.period}</span>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm font-medium text-white/70">Includes</p>
              <div className="mt-4 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-white/65">
                    <span className="size-1.5 rounded-full bg-white/55" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className={[
                "mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition",
                plan.featured
                  ? "bg-white text-black hover:bg-white/90"
                  : "border border-white/10 bg-white/5 text-white hover:bg-white/10",
              ].join(" ")}
            >
              Get started
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
