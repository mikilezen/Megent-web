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
import { FAQS } from "@/data/faq";

const siteUrl = "https://megent.dev";
const ogImage = "/freepik__adjust__68767.png";
const pageTitle = "Firewall for AI agents.";
const pageDescription =
  "Control every agent tool call from one policy layer.";
const pageUrl = `${siteUrl}/`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI agent governance",
    "agent policy engine",
    "tool call interception",
    "PII masking for AI",
    "AI runtime security",
    "LLM guardrails",
    "Megent",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: "Megent",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Megent platform preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [ogImage],
    creator: "@megents",
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function Page() {
  return (
    <main className="text-[var(--text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <Nav />
      <div className="pt-1">
        <Hero />
        {/* <AgentPlayground /> */}
        <PythonPreview />
        <Compat />

        <Problem />
        <Features />
        <HowItWorks />
        <Policy />
        <UseCases />
        {/* <OpenSource /> */}
        <FAQ />
        <Waitlist />
        <Footer />
      </div>
    </main>
  );
}
