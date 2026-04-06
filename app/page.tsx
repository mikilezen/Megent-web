import type { Metadata } from "next";

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
import Policy from "@/components/marketing/Policy";

export const metadata: Metadata = {
  title: "Megent | AI Agent Governance Platform",
  description:
    "Operations, routing, and governance for AI agents in production. Enforce policies, monitor tool calls, and protect sensitive data.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Megent | AI Agent Governance Platform",
    description:
      "Operations, routing, and governance for AI agents in production. Enforce policies, monitor tool calls, and protect sensitive data.",
    url: "https://megent.dev",
    type: "website",
    images: [
      {
        url: "/freepik__adjust__68767.png",
        width: 1200,
        height: 630,
        alt: "Megent platform preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Megent | AI Agent Governance Platform",
    description:
      "Operations, routing, and governance for AI agents in production. Enforce policies, monitor tool calls, and protect sensitive data.",
    images: ["/freepik__adjust__68767.png"],
  },
};

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
        <Policy/>
        <UseCases />
        {/* <OpenSource /> */}
        <FAQ />
        <Waitlist />
        <Footer />
      </div>
    </main>
  );
}
