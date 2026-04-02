"use client";

// import AgentPlayground from "@/components/marketing/AgentPlayground";
import Compat from "@/components/marketing/Compat";
import FAQ from "@/components/marketing/FAQ";
import Features from "@/components/marketing/Features";
import Footer from "@/components/marketing/Footer";
import Hero from "@/components/marketing/Hero";
import HowItWorks from "@/components/marketing/HowItWorks";
import Nav from "@/components/marketing/Nav";
import Problem from "@/components/marketing/Problem";
import PythonPreview from "@/components/marketing/PythonPreview";
import UseCases from "@/components/marketing/UseCases";
import Waitlist from "@/components/marketing/Waitlist";

export default function Page() {
  return (
    <main className="text-[var(--text)]">
      <Nav />
      <div className="pt-1">
        <Hero />
        {/* <AgentPlayground /> */}
        <Compat />
        
        <Problem />
        <Features />
        <HowItWorks />
        <PythonPreview />
        <UseCases />
        {/* <OpenSource /> */}
        <FAQ />
        <Waitlist />
        <Footer />
      </div>
    </main>
  );
}
