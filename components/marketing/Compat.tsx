const badgeIcon = (text: string, bg = "#e5e7eb", fg = "#111827") =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${bg}"/><text x="50%" y="55%" font-family="Inter, Arial, sans-serif" font-size="24" text-anchor="middle" fill="${fg}" dominant-baseline="middle">${text}</text></svg>`
  )}`;

const FRAMEWORKS = [
  ["OpenAI Agents SDK", "/images (3).png"],
  ["Google ADK", "image-1774682381860.png"],
  ["Anthropic Claude", "https://img.icons8.com/?size=100&id=kDfpmWz6OSCQ&format=png&color=000000"],
  ["Langchain", "/images (2).png"],
  ["AutoGen", "/images (2).jfif"],
  ["LlamaIndex", "/images (3).jfif"],
  ["Mistral", badgeIcon("M")],
  ["LlamaIndex", badgeIcon("LI")],
  ["CrewAI", "/crew-ai.6eff1255.png"],
  ["Vercel AI SDK", "https://cdn.simpleicons.org/vercel/000000"],
];

export default function Compat() {
  const doubled = [...FRAMEWORKS, ...FRAMEWORKS];
  return (
    <section className="justify-between flex flex-wrap border-y border-[var(--border)] bg-[var(--bg1)] py-5 overflow-hidden">
        <span className="pl-1 shrink-0 font-mono text-[11px] text-[var(--text3)] uppercase tracking-[0.14em] whitespace-nowrap">
          Works with
        </span>
      <div className="max-w-7xl mx-auto flex items-center gap-4 px-5 sm:px-8">
        <div
          className="overflow-hidden relative flex-1"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex gap-2 whitespace-nowrap marquee">
            {doubled.map((entry, i) => {
              const isTuple = Array.isArray(entry);
              const label = isTuple ? entry[0] : entry;
              const icon = isTuple ? entry[1] : null;

              return (
                <span
                  key={`${label}-${i}`}
                  className="inline-flex items-center gap-2 px-4 py-1.5 font-mono text-[12px] text-[var(--text2)] border border-[var(--border)] rounded-full bg-white hover:border-[var(--border2)] hover:text-[var(--text)] transition-colors cursor-default"
                >
                  {icon ? (
                    <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full bg-[var(--bg2)]">
                      <img src={icon} alt={label} className="h-full w-full object-contain spin-slow" />
                    </span>
                  ) : null}
                  <span>{label}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
