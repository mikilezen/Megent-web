import type { Metadata } from "next";
import Homepage from "@/components/marketing/Homepage";
import { FAQS } from "@/data/faq";

const siteUrl = "https://megent.dev";
const pageTitle = "Runtime policy for AI agent tools";
const pageDescription =
  "Set tool permissions for AI agents and evaluate guarded Python functions against policy before they run.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/" },
  keywords: [
    "AI agent firewall",
    "runtime policy for AI agents",
    "Python agent security",
    "tool call policy",
    "AI agent tool permissions",
    "Megent",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: siteUrl,
    siteName: "Megent",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <Homepage />
    </>
  );
}
