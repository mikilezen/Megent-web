import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Dashboard",
	robots: {
		index: false,
		follow: false,
		googleBot: {
			index: false,
			follow: false,
		},
	},
};

type DashboardLayoutProps = {
	children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return <>{children}</>;
}
