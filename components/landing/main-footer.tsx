type MainFooterProps = {
  footerColumns: Record<string, string[]>;
};

export default function MainFooter({ footerColumns }: MainFooterProps) {
  return (
    <footer
      id="contact"
      className="fade-up mx-auto mt-28 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-6 py-10 sm:mt-36 sm:px-8"
    >
      <div className="grid gap-10 md:grid-cols-5">
        {Object.entries(footerColumns).map(([title, links]) => (
          <div key={title}>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/55">{title}</p>
            <div className="mt-5 space-y-3">
              {links.map((link) => (
                <a key={link} href="#" className="block text-sm text-white/38 transition hover:text-white/70">
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="relative mt-14 overflow-hidden border-t border-white/8 pt-8">
        <p className="select-none text-[clamp(5rem,17vw,14rem)] font-medium leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.14)]">
          Megent
        </p>
      </div>
    </footer>
  );
}
