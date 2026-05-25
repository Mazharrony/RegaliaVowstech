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
  duration?: string;
  teamSize?: string;
  location?: string;
  stack?: string[];
  testimonial?: { quote: string; author: string; role: string };
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
    duration: "9 months",
    teamSize: "14 specialists",
    location: "Dubai · Riyadh",
    stack: ["Next.js 16", "Sanity", "Figma", "Brand book v3"],
    testimonial: {
      quote:
        "They asked the questions the consultants had been billing us to avoid for two years. Six months later the whole group sounded like one company.",
      author: "Saif Al Nuaimi",
      role: "Group Brand Director, Nawras Holdings",
    },
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
    duration: "5 months",
    teamSize: "8 specialists",
    location: "Dubai · Abu Dhabi",
    stack: ["OpenAI", "LangChain", "Twilio", "Opera PMS", "WhatsApp Business"],
    testimonial: {
      quote:
        "Guests stopped noticing whether they were talking to a person or the assistant. That was always the bar — and they cleared it.",
      author: "Lina Habib",
      role: "VP Operations, Majlis Hospitality",
    },
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
    duration: "7 months",
    teamSize: "11 specialists",
    location: "Dubai · Sharjah",
    stack: ["Postgres", "Node.js", "React Native", "Zebra MC9300", "Power BI"],
    testimonial: {
      quote:
        "Stock counts that used to take a whole weekend are done in a coffee break. Our buyers finally trust the numbers.",
      author: "Omar Bin Khalifa",
      role: "Head of Retail Ops, SouqLoop",
    },
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
    duration: "16 weeks",
    teamSize: "22 specialists",
    location: "Dubai World Trade Centre",
    stack: ["Unreal Engine", "TouchDesigner", "Custom CMS", "RFID lead capture"],
    testimonial: {
      quote:
        "Three ministers came back twice. The team built something that performed for both the press shot and the policy conversation.",
      author: "Dr. Reem Al Hashimi",
      role: "Programme Lead, Federal Authority",
    },
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
    duration: "10 months",
    teamSize: "13 specialists",
    location: "Dubai · Riyadh",
    stack: ["Azure OpenAI", "Camunda", "Postgres", "Temenos", "Tableau"],
    testimonial: {
      quote:
        "Risk and compliance signed off on day one. That alone told us they had built it with the right room in mind.",
      author: "Aisha Al Mansoori",
      role: "Chief Operating Officer, Khaleej Bank",
    },
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
    duration: "6 months",
    teamSize: "12 specialists",
    location: "Dubai · Riyadh · Manama",
    stack: ["Next.js 16", "React Native", "Stripe", "Mapbox", "Mixpanel"],
    testimonial: {
      quote:
        "They built the brand and the product in the same room. You can tell — nothing falls between the seams.",
      author: "Hussein Bakr",
      role: "Co-founder, Atlas Mobility",
    },
  },
];

export function getCase(slug: string) {
  return work.find((w) => w.slug === slug);
}

export function getRelatedCases(slug: string, limit = 2) {
  const current = getCase(slug);
  if (!current) return [];
  const byIndustry = work.filter(
    (w) => w.slug !== slug && w.industry === current.industry,
  );
  const others = work.filter(
    (w) => w.slug !== slug && w.industry !== current.industry,
  );
  return [...byIndustry, ...others].slice(0, limit);
}
