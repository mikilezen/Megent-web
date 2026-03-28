import Link from "next/link";

export default function Cta() {
  return (
    <section
      id="about"
      className="mx-auto mt-24 max-w-6xl rounded-[2rem] border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:px-10"
    >
      <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Enterprise grade</p>
      <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-5xl">
        Launch AI safely, keep humans in the loop
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
        Approvals, audit trails, and observability are built in. You get the speed of agents with the
        controls your leadership expects.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Talk to us
        </Link>
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
        >
          View docs
        </Link>
      </div>
    </section>
  );
}
