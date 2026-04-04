import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const siteUrl = "https://megent.dev";
const siteName = "Megent";
const defaultTitle = "Megent | A runtime policy for AI agents";
const defaultDescription = "Operations, routing, and governance for AI agents in production. Intercept tool calls, enforce YAML rules, and mask PII across every major agentic framework.";
const ogImage = "/freepik__adjust__68767.png";

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": siteName,
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/favicon.ico`,
      },
      "description": defaultDescription,
      "sameAs": [
        "https://twitter.com/megentdev",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": defaultTitle,
      "description": defaultDescription,
      "publisher": {
        "@id": `${siteUrl}/#organization`,
      },
      "inLanguage": "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "name": siteName,
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any",
      "description": defaultDescription,
      "url": siteUrl,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  category: "technology",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  authors: [{ name: "Megent", url: siteUrl }],
  creator: "Megent",
  publisher: "Megent",
  keywords: [
    "AI agent governance",
    "AI operations",
    "agent security",
    "agent policy",
    "LLM guardrails",
    "Megent",
    "AI agent runtime",
    "policy enforcement",
    "PII masking",
    "AI agent control",
    "LLM security",
    "agent monitoring",
    "AI compliance",
    "agent framework",
    "AI governance platform",
  ],
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Megent AI control center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage],
    creator: "@megentdev",
  },
  appleWebApp: {
    title: siteName,
    capable: true,
    statusBarStyle: "default",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
          disableTransitionOnChange
        > */}
          {children}
        {/* </ThemeProvider> */}
        <Analytics />
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
}
