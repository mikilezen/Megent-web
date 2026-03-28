type SectionTagProps = {
  label: string;
};

export default function SectionTag({ label }: SectionTagProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white/65 backdrop-blur-md">
      <span className="size-1.5 rounded-full bg-white/60" />
      {label}
    </div>
  );
}
