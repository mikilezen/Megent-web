type VideoShowcaseProps = {
  videoId: string;
  title: string;
  description: string;
};

export default function VideoShowcase({ videoId, title, description }: VideoShowcaseProps) {
  return (
    <section className="mt-24 sm:mt-28">
      <div className="relative grid gap-10 rounded-[2.5rem] bg-gradient-to-br from-[#f0e2ff]/95 via-[#c7f2e3]/95 to-[#f5c3d3]/95 p-8 shadow-[0_25px_80px_rgba(47,23,79,0.15)] backdrop-blur lg:grid-cols-2 lg:items-center">
        <div className="pointer-events-none absolute -left-10 top-6 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(124,91,255,0.2),rgba(255,255,255,0))] blur-2xl" aria-hidden />
        <div className="pointer-events-none absolute -right-10 bottom-6 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(106,215,176,0.2),rgba(255,255,255,0))] blur-2xl" aria-hidden />
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#d8c7ff] bg-[#f7f1ff] px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[#2a1536]">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            In 2 minutes
          </p>
          <h2 className="text-balance text-3xl font-semibold leading-tight text-[#1f1042] sm:text-4xl">
            {title}
          </h2>
          <p className="text-base leading-7 text-[#3a2a55]">{description}</p>
          <div className="flex flex-wrap gap-3">
            {["Agent routing", "Guardrails", "Live oversight"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#d8c7ff] bg-[#f7f1ff] px-3 py-1 text-sm text-[#2a1536] shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-[0_18px_60px_rgba(0,0,0,0.2)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_60%_80%,rgba(16,185,129,0.16),transparent_55%)]" aria-hidden />
          <div className="relative w-full pt-[56.25%]">
            <iframe
              title={title}
              src={`https://www.youtube.com/embed/${videoId}?rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}