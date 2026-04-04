import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { FAQS } from "@/data/faq";

const siteUrl = "https://megent.dev";
const siteName = "Megent";
const defaultTitle = "Megent | A runtime policy";
const defaultDescription = "Operations, routing, and governance for AI agents in production.";
const ogImage = "/freepik__adjust__68767.png";

// --- JSON-LD Structured Data ---

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/openclaw.png`,
  },
  description: defaultDescription,
  email: "hello@megent.dev",
  sameAs: ["https://twitter.com/megentdev"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: defaultDescription,
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteName,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Python 3.9+",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description: defaultDescription,
  url: siteUrl,
  author: {
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
  },
};

const faqSchema = {
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

// --- Metadata ---

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
    "AI runtime policy",
    "AI tool call interception",
    "LLM agent control",
    "AI compliance",
    "AI observability",
    "agent monitoring",
    "PII masking AI",
    "LangChain guardrails",
    "CrewAI security",
    "OpenAI Agents SDK",
    "AI policy engine",
    "AI audit log",
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
    site: "@megentdev",
  },
  appleWebApp: {
    title: siteName,
    capable: true,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
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
    apple: "/icon-224x224.png",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
