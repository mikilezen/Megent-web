import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Policy Registry for Agent Guardrails | Megent",
  description:
    "Browse and install production-ready AI agent guardrail policies for PII masking, exfiltration defense, rate limiting, and compliance workflows.",
  alternates: {
    canonical: "/registry",
  },
  keywords: [
    "AI policy registry",
    "agent guardrails",
    "PII masking policies",
    "LLM security policies",
    "AI compliance controls",
    "Megent registry",
    "AI policy marketplace",
    "agent guardrail policies",
    "AI compliance policies",
    "AI runtime protection",
  ],
  openGraph: {
    title: "AI Policy Registry for Agent Guardrails | Megent",
    description:
      "Discover verified policies for AI agent governance, data protection, and runtime controls.",
    url: "https://megent.dev/registry",
    type: "website",
    images: [
      {
        url: "/freepik__adjust__68767.png",
        width: 1200,
        height: 630,
        alt: "Megent policy registry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Megent Registry | AI Agent Policy Marketplace",
    description:
      "Browse and install verified policies for AI agent governance, compliance, monitoring, and runtime protection.",
    images: ["/freepik__adjust__68767.png"],
  },
};

export default function RegistryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
