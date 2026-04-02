import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to Megent to access secure AI operations and governance controls.",
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "Megent Login",
    description: "Secure sign-in for Megent AI operations and governance.",
    url: "https://megent.dev/login",
    siteName: "Megent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Megent Login",
    description: "Secure sign-in for Megent AI operations and governance.",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
