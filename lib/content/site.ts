// import { ReactNode } from "react";
// import {
//   ChartNoAxesCombined,
//   ShieldCheck,
//   Sparkles,
//   Wand2,
// } from "lucide-react";

// export type NavItem = { label: string; href: string };
// export type FeatureHighlight = {
//   title: string;
//   description: string;
//   icon: ReactNode;
// };
// export type PricingPlan = {
//   name: string;
//   subtitle: string;
//   price: string;
//   period: string;
//   features: string[];
//   featured?: boolean;
// };
// export type FooterColumn = { title: string; links: { label: string; href: string }[] };

// export const navItems: NavItem[] = [
//   { label: "Product", href: "#product" },
//   { label: "Features", href: "#features" },
//   { label: "About", href: "#about" },
//   { label: "Contact", href: "#contact" },
// ];

// export const heroContent = {
//   eyebrow: "Megent Operations",
//   title: "One control surface for every AI agent your company runs",
//   description:
//     "Ship AI workflows without losing oversight. Intake, routing, approvals, and observability in a single place your CISO can sign off.",
//   primaryCta: { label: "Talk to us", href: "#contact" },
//   secondaryCta: { label: "View product", href: "#product" },
//   badge: "Enterprise-grade ready",
// };

// export const featureHighlights: FeatureHighlight[] = [
//   {
//     title: "Orchestrated flows",
//     description: "Compose human + agent + system steps with guardrails and clear outcomes.",
//     icon: <Sparkles className="size-4" />,
//   },
//   {
//     title: "Governed actions",
//     description: "Approvals and audit trails before anything touches customers or money.",
//     icon: <ShieldCheck className="size-4" />,
//   },
//   {
//     title: "Shared context",
//     description: "Unify CRM, docs, logs, and tickets so agents respond with the full picture.",
//     icon: <Wand2 className="size-4" />,
//   },
//   {
//     title: "Performance loops",
//     description: "Quality review, routing insights, and benchmarks so the system improves daily.",
//     icon: <ChartNoAxesCombined className="size-4" />,
//   },
// ];

// export const productPoints = [
//   {
//     label: "Intake brief",
//     copy: "Blend signals from CRM, product usage, and ticket history to set intent and tone.",
//   },
//   {
//     label: "Routing rail",
//     copy: "See every handoff between agents, people, and policies with live status.",
//   },
//   {
//     label: "Risk watch",
//     copy: "Detect risky promises, over-refunds, or policy-sensitive replies before they ship.",
//   },
// ];

// export const pricingPlans: PricingPlan[] = [
//   {
//     name: "Starter",
//     subtitle: "For small teams proving workflow value",
//     price: "$0",
//     period: "/ month",
//     features: [
//       "1 workspace",
//       "Basic routing flows",
//       "Shared inbox context",
//       "Email support",
//     ],
//   },
//   {
//     name: "Growth",
//     subtitle: "For operations teams shipping AI into production",
//     price: "$120",
//     period: "/ month",
//     features: [
//       "Unlimited workspaces",
//       "Advanced routing logic",
//       "Approval checkpoints",
//       "Priority support",
//     ],
//     featured: true,
//   },
//   {
//     name: "Enterprise",
//     subtitle: "For regulated teams and complex environments",
//     price: "$250",
//     period: "/ month",
//     features: [
//       "SAML and permissions",
//       "Audit-ready logs",
//       "Custom policy controls",
//       "Dedicated onboarding",
//     ],
//   },
// ];

// export const footerColumns: FooterColumn[] = [
//   {
//     title: "Product",
//     links: [
//       { label: "Product", href: "#product" },
//       { label: "Features", href: "#features" },
//     ],
//   },
//   {
//     title: "Company",
//     links: [
//       { label: "About", href: "#about" },
//       { label: "Careers", href: "#contact" },
//       { label: "Press", href: "#contact" },
//     ],
//   },
//   {
//     title: "Resources",
//     links: [
//       { label: "Docs", href: "#product" },
//       { label: "Security", href: "#about" },
//       { label: "Status", href: "#contact" },
//     ],
//   },
//   {
//     title: "Support",
//     links: [
//       { label: "Help Center", href: "#contact" },
//       { label: "Contact", href: "#contact" },
//       { label: "FAQ", href: "#contact" },
//     ],
//   },
// ];
