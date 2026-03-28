"use client";

import Compat from "@/components/marketing/Compat";
import FAQ from "@/components/marketing/FAQ";
import Features from "@/components/marketing/Features";
import Footer from "@/components/marketing/Footer";
import Hero from "@/components/marketing/Hero";
import HowItWorks from "@/components/marketing/HowItWorks";
import Nav from "@/components/marketing/Nav";
import OpenSource from "@/components/marketing/OpenSource";
import Problem from "@/components/marketing/Problem";
import UseCases from "@/components/marketing/UseCases";
import Waitlist from "@/components/marketing/Waitlist";

export default function Page() {
  return (
    <main className="bg-white text-[var(--text)]">
      <Nav />
      <div className="pt-1">
        <Hero />
        <Compat />
        <Problem />
        <Features />
        <HowItWorks />
        <UseCases />
        <OpenSource />
        <FAQ />
        <Waitlist />
        <Footer />
      </div>
    </main>
  );
}