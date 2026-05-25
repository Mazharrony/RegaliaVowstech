import type { ServiceSlug } from "./services";

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  year: number;
  services: ServiceSlug[];
  industry: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  cover: string;
  color: string;
};

export const work: CaseStudy[] = [
  {
    slug: "nawras-rebrand",
    client: "Nawras Holdings",
    title: "A legacy conglomerate, retooled for a new decade.",
    year: 2025,
    services: ["branding", "web-mobile"],
    industry: "Diversified holdings",
    summary: "Identity system, digital platform and group-wide rollout for a forty-year-old Emirati conglomerate.",
    challenge: "Twelve subsidiaries, three logos and zero consistent narrative across markets.",
    approach: "A monolithic brand architecture, modular identity system and a group-level digital platform built on Next.js.",
    outcome: "A unified group narrative, 38% lift in inbound leads and a system the in-house team can extend.",
    metrics: [
      { label: "Subsidiaries unified", value: "12" },
      { label: "Lift in inbound", value: "+38%" },
      { label: "Markets launched", value: "5" },
    ],
    cover: "#1a1a1a",
    color: "#b8893a",
  },
  {
    slug: "majlis-ai-concierge",
    client: "Majlis Hospitality",
    title: "An AI concierge for a luxury hospitality group.",
    year: 2025,
    services: ["ai-automation", "web-mobile"],
    industry: "Hospitality",
    summary: "A multilingual AI concierge handling 70% of guest requests across five properties.",
    challenge: "Slow guest response times and an overstretched front-desk team across five properties.",
    approach: "LLM-powered concierge with retrieval over property knowledge, integrated with PMS and messaging channels.",
    outcome: "70% deflection on routine requests, 4.8/5 guest satisfaction on AI-handled chats.",
    metrics: [
      { label: "Requests deflected", value: "70%" },
      { label: "Languages", value: "6" },
      { label: "CSAT", value: "4.8/5" },
    ],
    cover: "#0c2a2a",
    color: "#d9b87a",
  },
  {
    slug: "souqloop-inventory",
    client: "SouqLoop",
    title: "Inventory that breathes with the souq.",
    year: 2024,
    services: ["custom-cms-inventory", "corporate-automation"],
    industry: "Retail",
    summary: "Bespoke inventory and POS platform connecting 38 stores and three warehouses.",
    challenge: "Stockouts in popular branches, dead stock in others, no real-time visibility.",
    approach: "Custom inventory platform with predictive replenishment, integrated POS and warehouse mobile app.",
    outcome: "27% reduction in stockouts and a six-figure reduction in dead stock within two quarters.",
    metrics: [
      { label: "Stores connected", value: "38" },
      { label: "Stockouts down", value: "-27%" },
      { label: "Time to count", value: "-62%" },
    ],
    cover: "#241a14",
    color: "#e9c98e",
  },
  {
    slug: "gitex-pavilion",
    client: "Federal Authority",
    title: "A GITEX pavilion that drew 22,000 visitors.",
    year: 2024,
    services: ["events-expo", "branding"],
    industry: "Public sector",
    summary: "Concept, design and production of a 480 m² pavilion at GITEX Global.",
    challenge: "Communicate a complex national programme to a busy expo audience in seconds.",
    approach: "An editorial pavilion with interactive installations, live demos and a clear three-act journey.",
    outcome: "22,000 visitors, 1,400 qualified leads, regional press coverage.",
    metrics: [
      { label: "Visitors", value: "22k" },
      { label: "Qualified leads", value: "1.4k" },
      { label: "Stand size", value: "480 m²" },
    ],
    cover: "#1f1812",
    color: "#c9a24b",
  },
  {
    slug: "khaleej-bank-automation",
    client: "Khaleej Bank",
    title: "Automating onboarding for a regional bank.",
    year: 2024,
    services: ["corporate-automation", "ai-automation"],
    industry: "Banking",
    summary: "Document understanding and approval automation cutting SME onboarding from days to hours.",
    challenge: "Manual KYC and onboarding taking up to seven business days per SME client.",
    approach: "AI document extraction, rules engine and approval workflow integrated with core banking.",
    outcome: "Onboarding down to four hours median, with full audit trails.",
    metrics: [
      { label: "Onboarding time", value: "-92%" },
      { label: "Documents/day", value: "3.4k" },
      { label: "FTE reallocated", value: "11" },
    ],
    cover: "#0f1a26",
    color: "#7fa9d6",
  },
  {
    slug: "atlas-launch",
    client: "Atlas Mobility",
    title: "Launching an EV charging network across the GCC.",
    year: 2025,
    services: ["marketing", "branding", "web-mobile"],
    industry: "Mobility",
    summary: "Brand, marketing site, mobile app and launch campaign for a new EV charging network.",
    challenge: "Build awareness and a usable product for a category most drivers had never tried.",
    approach: "Plain-spoken brand, Next.js marketing site, React Native app and an integrated launch campaign.",
    outcome: "18,000 app installs and 4,200 active users in the first sixty days.",
    metrics: [
      { label: "Installs (60d)", value: "18k" },
      { label: "Active users", value: "4.2k" },
      { label: "Cities live", value: "3" },
    ],
    cover: "#10221a",
    color: "#9bd6a3",
  },
];

export function getCase(slug: string) {
  return work.find((w) => w.slug === slug);
}
