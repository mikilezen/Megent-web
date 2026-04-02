import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Explore Megent documentation for AI operations, routing, guardrails, and governance.",
  alternates: {
    canonical: "/doc",
  },
  openGraph: {
    title: "Megent Documentation",
    description: "Guides and docs for operating and governing AI agents with Megent.",
    url: "https://megent.dev/doc",
    siteName: "Megent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Megent Documentation",
    description: "Guides and docs for operating and governing AI agents with Megent.",
  },
};

export default function DocLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
