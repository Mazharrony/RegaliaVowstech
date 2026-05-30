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
    slug: "regalia-vows",
    client: "Regalia Vows",
    title: "An editorial site for a Dubai luxury wedding studio.",
    year: 2026,
    services: ["branding", "web-mobile", "content-ads"],
    industry: "Luxury weddings",
    summary:
      "Brand-led, bilingual editorial site for a Dubai-based luxury wedding and private-events studio.",
    challenge:
      "A discerning, referral-led brand needed a site that read like a publication — restrained, cinematic and credible to couples planning seven-figure celebrations.",
    approach:
      "An editorial system built around long-form case studies, a private enquiry funnel and a bilingual EN/RU content model. Type-driven layouts, slow reveals and a press-quality image pipeline.",
    outcome:
      "An editorial brand experience the studio can extend chapter by chapter — case studies, the journal, sectors and venues — without losing the tone.",
    metrics: [
      { label: "Languages", value: "EN · RU" },
      { label: "Content model", value: "Editorial" },
      { label: "Funnel", value: "Private enquiry" },
    ],
    cover: "#0e0e0d",
    color: "#b8893a",
    duration: "Live, ongoing",
    location: "Dubai, UAE",
    stack: ["Next.js", "TypeScript", "Tailwind", "Sanity"],
    testimonial: {
      quote:
        "They built the editorial site we'd been describing for two years in our heads. Every section reads like a chapter — and the bilingual model finally feels right.",
      author: "Studio founder",
      role: "Luxury weddings · Dubai",
    },
  },
  {
    slug: "core-champs",
    client: "Core Champs",
    title: "Brand site and product authentication for a premium nutrition label.",
    year: 2025,
    services: ["branding", "web-mobile", "ai-automation"],
    industry: "Premium nutrition",
    summary:
      "Marketing site plus a per-unit QR product authentication system for a US-facing premium supplement brand.",
    challenge:
      "Counterfeit supplements were eroding trust in the category. The brand needed a site that explained the product and a way for any customer to instantly verify a bottle was real.",
    approach:
      "A brand-led marketing site paired with a unique-code authentication system — one-time-use QR codes issued per unit, a browser-first verification flow with no app required, and suspicious-scan flagging on the backend.",
    outcome:
      "Customers can verify a bottle in under a second from the camera, and the brand has a defensible anti-counterfeit story it can put on every label.",
    metrics: [
      { label: "Verification", value: "Instant" },
      { label: "Per-unit QR", value: "Unique" },
      { label: "Client install", value: "Browser-only" },
    ],
    cover: "#0c1216",
    color: "#7fa9d6",
    duration: "Multi-phase",
    location: "International · US-facing",
    stack: ["Next.js", "TypeScript", "Tailwind", "Postgres", "QR pipeline"],
    testimonial: {
      quote:
        "The verification system is doing the quiet heavy lifting. Customers scan, get an instant answer, and our anti-counterfeit story actually has receipts now.",
      author: "Operations lead",
      role: "Premium nutrition · International",
    },
  },
  {
    slug: "avion-realty",
    client: "Avion Realty",
    title: "A brand site and lead funnel for a Dubai real estate firm.",
    year: 2025,
    services: ["branding", "web-mobile", "marketing"],
    industry: "Real estate",
    summary:
      "Brand-led site, listings presentation and enquiry funnel for a Dubai real estate firm.",
    challenge:
      "A Dubai brokerage needed a site that read with the confidence of an established house and turned interest into qualified enquiries — without leaning on the same template every competitor was running.",
    approach:
      "A restrained brand system, performance-tuned pages, a clean listings information architecture and a single, well-instrumented lead capture flow tied to the team's working hours.",
    outcome:
      "A site the brokerage uses as its primary credibility surface, with an enquiry funnel the team actually answers within the same day.",
    metrics: [
      { label: "Focus", value: "Dubai market" },
      { label: "Funnel", value: "Lead capture" },
      { label: "Performance", value: "Tuned" },
    ],
    cover: "#11151b",
    color: "#c9a24b",
    duration: "Project + iterate",
    location: "Dubai, UAE",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    testimonial: {
      quote:
        "Brand, site and lead funnel handled in one room. We stopped chasing three vendors and our enquiries went up the same quarter.",
      author: "Marketing director",
      role: "Real estate · Dubai",
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
