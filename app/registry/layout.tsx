import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Megent",
  robots: { index: false, follow: false },
};

export default function RegistryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
