import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Megent Registry | AI Agent Policy Marketplace",
  description:
    "Browse and install verified policies for AI agent governance, compliance, monitoring, and runtime protection.",
  alternates: {
    canonical: "/registry",
  },
  openGraph: {
    title: "Megent Registry | AI Agent Policy Marketplace",
    description:
      "Browse and install verified policies for AI agent governance, compliance, monitoring, and runtime protection.",
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
  keywords: [
    "AI policy marketplace",
    "agent guardrail policies",
    "Megent registry",
    "AI compliance policies",
    "AI runtime protection",
  ],
};

export default function RegistryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
