import { featureHighlights, productPoints } from "@/lib/content/site";

export default function FeatureGrid() {
  return (
    <section id="features" className="mx-auto mt-20 max-w-6xl px-4 sm:px-0">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Features</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-5xl">
            Governed AI operations
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Ship AI and automation that your security team will approve. Clear ownership, approvals,
            and observability are built in—not bolted on later.
          </p>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
          Built for AI teams in production
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {featureHighlights.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900">
              {feature.icon}
              <span className="text-sm font-medium">{feature.title}</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
          </article>
        ))}
      </div>

      <div
        id="product"
        className="mt-14 grid gap-4 rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_16px_60px_rgba(15,23,42,0.06)] sm:grid-cols-[1fr_1.05fr]"
      >
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">What it feels like</p>
          <h3 className="text-3xl font-semibold tracking-[-0.035em] text-slate-900">
            Intake, routing, and risk review in one view
          </h3>
          <p className="text-sm leading-7 text-slate-600">
            Keep operators, agents, and systems in lockstep. Every action is visible, attributed, and
            governed with approvals where needed.
          </p>
          <div className="space-y-3 text-sm text-slate-700">
            {productPoints.map((point) => (
              <div key={point.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="font-semibold text-slate-900">{point.label}</p>
                <p className="mt-1 text-slate-600">{point.copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[1.4rem] border border-slate-200 bg-slate-50 p-6">
          <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_40%),radial-gradient(circle_at_70%_30%,rgba(14,165,233,0.08),transparent_40%),linear-gradient(180deg,#f8fafc_0%,#eef2f6_100%)]" />
          <div className="relative grid gap-3 md:grid-cols-[0.95fr_1fr]">
            <div className="rounded-[1.2rem] border border-slate-200 bg-white p-4 text-sm text-slate-800">
              <p className="uppercase tracking-[0.2em] text-slate-500">Routing rail</p>
              <div className="mt-4 space-y-2 text-slate-800">
                {["Message received", "Intent scored", "Route to owner", "Approval gate"].map((step, idx) => (
                  <div
                    key={step}
                    className={[
                      "rounded-xl border px-3 py-2",
                      idx === 2 ? "border-slate-300 bg-slate-100 text-slate-900" : "border-slate-200 bg-white text-slate-700",
                    ].join(" ")}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.2rem] border border-slate-200 bg-white p-4 text-sm text-slate-800">
              <p className="uppercase tracking-[0.2em] text-slate-500">Risk watch</p>
              <div className="mt-4 space-y-3">
                {[
                  ["Refund over threshold", "Needs approval"],
                  ["Policy-sensitive wording", "Tone review"],
                  ["External promise made", "Audit logged"],
                ].map(([label, state]) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                    <p className="text-slate-900">{label}</p>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{state}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
