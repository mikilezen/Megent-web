import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f3f0ee] px-6 py-12 text-[#141413]">
      <div className="mx-auto max-w-2xl">
        <Link className="text-sm text-[#69635e] hover:text-[#cf4500]" href="/">
          ← Back to Megent
        </Link>
        <section className="mt-20 rounded-[32px] bg-[#fcfbfa] p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#69635e]">Contact</p>
          <h1 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">Talk through your integration.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#45413e]">
            Megent is an open-source Python runtime. If you have a question about the project or want to discuss a tool integration, contact the maintainers.
          </p>
          <a
            className="mt-8 inline-flex min-h-12 items-center rounded-[20px] bg-[#141413] px-6 text-sm font-semibold text-[#f3f0ee]"
            href="mailto:hello@megent.dev?subject=Megent%20integration%20question"
          >
            Email the maintainers
          </a>
        </section>
      </div>
    </main>
  );
}
