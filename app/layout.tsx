import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import GlobalUiReset from "@/components/GlobalUiReset";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const siteUrl = "https://megent.dev";
const siteName = "Megent";
const defaultTitle = "Megent | Runtime policy for AI agent tools";
const defaultDescription =
  "Set tool permissions for AI agents and evaluate guarded Python functions against policy before they run.";

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
        "url": `${siteUrl}/Group.ico`,
      },
      "description": defaultDescription,
      "sameAs": ["https://github.com/megents/megent"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": siteName,
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
    "AI agent firewall",
    "runtime policy for AI agents",
    "Python agent security",
    "tool call policy",
    "AI agent tool permissions",
    "PII masking",
    "Megent",
  ],
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: defaultTitle,
    description: defaultDescription,
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
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
    apple: "/favicon.ico",
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
        <meta name="llms-policy" content="/llms.txt" />
        <link rel="alternate" type="text/plain" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">
        <GlobalUiReset />
        {/* <ThemeProvider
          attribute="class"
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
