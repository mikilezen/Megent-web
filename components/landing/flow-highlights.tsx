const items = [
  {
    title: "Human-in-the-loop moments",
    body: "Add approvals and escalations without breaking your agent flow; ops can step in with full context.",
    tags: ["Approvals", "Escalate", "Context stream"],
    gradient: "from-[#7c5bff]/85 via-[#ff8ba7]/80 to-[#c7f2e3]/90",
  },
  {
    title: "Runbook-aware routing",
    body: "Blend telemetry, CRM, and product signals to choose the right agent—or a human—every time.",
    tags: ["Signals", "Routing", "Guardrails"],
    gradient: "from-[#c7f2e3]/90 via-[#7c5bff]/80 to-[#ff6f61]/85",
  },
  {
    title: "Observability without noise",
    body: "See conversations, actions, and risk flags in one pane of glass; ship faster with fewer surprises.",
    tags: ["Live feed", "Risk", "Dashboards"],
    gradient: "from-[#ff8ba7]/85 via-[#c7f2e3]/80 to-[#7c5bff]/85",
  },
];

export default function FlowHighlights() {
  return (
    <section className="mt-24 sm:mt-28">
      <div className="flex flex-col gap-4 text-center">
        <p className="inline-flex items-center gap-2 self-center rounded-full border border-[#d8c7ff] bg-[#f0e2ff]/80 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[#2a1536] shadow-[0_6px_18px_rgba(47,23,79,0.12)]">
          <span className="size-1.5 rounded-full bg-[#ff6f61]" />
          Built for humans + agents
        </p>
        <h2 className="text-balance text-3xl font-semibold leading-tight text-[#1f1042] sm:text-4xl">
          The calm layer between people and AI
        </h2>
        <p className="mx-auto max-w-3xl text-base leading-7 text-[#3a2a55]">
          Pair every agent decision with visibility, recovery paths, and moments for humans to contribute—not just approve.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className={`group relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br ${item.gradient} p-6 text-[#1f1042] shadow-[0_16px_50px_rgba(47,23,79,0.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(47,23,79,0.2)]`}
          >
            <div className="pointer-events-none absolute -left-16 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.22),rgba(255,255,255,0))] blur-2xl opacity-60" />
            <div className="pointer-events-none absolute right-[-18%] bottom-[-18%] h-52 w-52 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18),rgba(255,255,255,0))] blur-3xl opacity-70" />
            <div className="relative space-y-3">
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="text-sm leading-6 text-[#2a1536]">{item.body}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#f7f1ff]/80 px-3 py-1 text-xs font-medium text-[#2a1536] shadow-[0_6px_18px_rgba(47,23,79,0.12)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}