import SectionTag from "./section-tag";

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-20 sm:pt-28">
      <div className="fade-up mx-auto max-w-4xl text-center" style={{ animationDelay: "90ms" }}>
        <SectionTag label="Your CISO say" />
        <h1 className="mt-2 text-balance text-5xl font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
          Your CISO says yes finally.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-white/55 sm:text-lg">
          Megent is the control center for every AI agent your company runs. One line of code. Zero compromises.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#tasks"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Start for free
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10"
          >
            View on Github
          </a>
        </div>
      </div>

      <div className="fade-up relative mt-20 p-9" style={{ animationDelay: "180ms" }}>
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-[2rem] border border-white/10 bg-black/30 p-6 text-white/70 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/50">
            <span className="size-2 rounded-full bg-emerald-400" />
            Live control surface preview
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {["Intake", "Routing", "Govern"].map((label) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  {label === "Intake" && "Blend CRM, product, and ticket signals into one brief."}
                  {label === "Routing" && "Show the handoffs between people, agents, and systems."}
                  {label === "Govern" && "Highlight approvals and sensitive actions before they ship."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
