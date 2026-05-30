export type InsightSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  author: string;
  authorRole?: string;
  authorBio?: string;
  coverColor?: string;
  accentColor?: string;
  tags?: string[];
  sections?: InsightSection[];
  /** Legacy body paragraphs (used when sections is not provided). */
  body: string[];
};

export const insights: Insight[] = [
  {
    slug: "ai-that-earns-its-keep",
    title: "AI that earns its keep: a checklist for the UAE founder.",
    excerpt:
      "Ten questions every UAE founder should ask before greenlighting an AI initiative — and what good answers sound like.",
    category: "AI & Automation",
    date: "2026-03-04",
    readMinutes: 6,
    author: "Lukas Meier",
    authorRole: "Founder & Studio Lead",
    authorBio:
      "Lukas leads the studio's applied-AI work — most recently a per-unit product authentication system for a premium nutrition brand.",
    coverColor: "#0c2a2a",
    accentColor: "#d9b87a",
    tags: ["AI", "Strategy", "Boardroom", "Measurement"],
    body: [],
    sections: [
      {
        id: "start-with-the-line-item",
        heading: "Start with the line item.",
        paragraphs: [
          "Every brand has an AI line item this year. Most will quietly disappear next year. The difference between AI that earns its keep and AI that becomes a sunk cost is usually decided before a single line of code is written.",
          "Start with the smallest possible problem with the largest measurable outcome. If you cannot describe — in one sentence — the hour saved, the error avoided or the revenue unlocked, you do not have a use case. You have a hope.",
        ],
      },
      {
        id: "pair-outcome-with-evaluation",
        heading: "Pair outcome with evaluation.",
        paragraphs: [
          "Every AI feature needs a number it owns. Pick two: one operational, one experiential. The operational number is the dial you would defend to a CFO; the experiential number is the one your customer would notice if it slipped.",
          "Write the evaluation plan before you build. Decide what 'better than today' looks like, who owns the dashboard and how often you'll review it. AI features without measurement are theatre.",
        ],
      },
      {
        id: "ten-questions",
        heading: "Ten questions to ask before you greenlight.",
        paragraphs: [
          "What is the single sentence outcome? Who owns it? What data does the model see, and where does that data live today? What is the worst answer the model could give, and what stops it leaving the building? Who reviews edge cases in the first 90 days? How will we measure it? Where does it integrate? What is the rollback plan? What does a five-year operating cost look like? And — honestly — would we still build this if it were a person doing the job?",
          "The answers tell you more than any vendor demo. The shape of the answers tells you whether the team is ready.",
        ],
      },
      {
        id: "ship-the-smallest-version",
        heading: "Ship the smallest version that proves the case.",
        paragraphs: [
          "Most failed AI initiatives failed on ambition, not technology. Start with the smallest production-grade slice and let it run live for a quarter. Instrument it. Compare it to the human baseline. Then, and only then, scale.",
        ],
      },
    ],
  },
  {
    slug: "the-editorial-brand",
    title: "The editorial brand: why minimalism still wins in 2026.",
    excerpt:
      "Type-driven, restrained, confident — the editorial mode keeps winning. Here's why, and where it breaks.",
    category: "Branding",
    date: "2026-02-12",
    readMinutes: 5,
    author: "Lukas Meier",
    authorRole: "Founder & Studio Lead",
    authorBio:
      "Lukas leads brand-led web work for UAE founders — most recently a bilingual editorial site for a Dubai luxury wedding studio.",
    coverColor: "#1a1a1a",
    accentColor: "#b8893a",
    tags: ["Branding", "Editorial", "Type", "Systems"],
    body: [],
    sections: [
      {
        id: "why-editorial-endures",
        heading: "Why the editorial mode endures.",
        paragraphs: [
          "Strip a brand to its skeleton and you find type, rhythm and one or two colours doing the heavy lifting. The editorial mode endures because it scales: from a 32-page report to a Reels grid to an expo wall, the system does not blink.",
          "It also ages well. Brands that lean on novel illustration or fleeting visual language need a rebuild every three years. Brands that lean on disciplined type are still legible in a decade.",
        ],
      },
      {
        id: "where-it-breaks",
        heading: "Where it breaks.",
        paragraphs: [
          "Where it breaks is in the hands of teams who confuse minimalism with absence. The best editorial brands are not empty — they are decided. Every restraint is the residue of an opinion.",
          "If your team cannot articulate why each element is there, the system will drift the moment it leaves the studio. We've seen it happen often enough to stop being surprised.",
        ],
      },
      {
        id: "buying-it-internally",
        heading: "How to buy it internally.",
        paragraphs: [
          "The pitch is not 'less is more'. The pitch is 'easier to extend, faster to produce, cheaper over five years'. Editorial systems pay for themselves in the second campaign — and again in the fifth.",
        ],
      },
    ],
  },
  {
    slug: "designing-for-the-souq",
    title: "Designing software for the way the souq actually works.",
    excerpt:
      "Retail and listings tools fail when they ignore the choreography of the floor. A short field guide from UAE work.",
    category: "Product",
    date: "2026-01-18",
    readMinutes: 7,
    author: "Lukas Meier",
    authorRole: "Founder & Studio Lead",
    authorBio:
      "Lukas designs and builds web platforms for Dubai operators — real estate, retail and lifestyle brands that need software shaped to how they actually work.",
    coverColor: "#241a14",
    accentColor: "#e9c98e",
    tags: ["Product", "Retail", "Field research", "Inventory"],
    body: [],
    sections: [
      {
        id: "start-on-the-floor",
        heading: "Start on the floor, not in the diagram.",
        paragraphs: [
          "Walk any busy retail corridor in Dubai and you'll see software contorted to fit a workflow no engineer ever watched. The best operational tools start with a notebook on the floor, not a database diagram.",
          "Spend a few days behind the counter before you write a line of schema. Watch where the queue forms. Watch where staff write things on paper. Watch what the manager opens first in the morning.",
        ],
      },
      {
        id: "model-choreography-first",
        heading: "Model the choreography first.",
        paragraphs: [
          "Capture the choreography first. Then model the data. The good systems we've shipped treat the shop floor as a series of small, predictable rituals — open, restock, count, close — and model each ritual as a first-class object.",
          "When the rituals are first-class, the reports take care of themselves. When the database is first-class, the rituals collapse the moment you onboard a new staff member.",
        ],
      },
      {
        id: "the-mobile-app-is-the-product",
        heading: "The mobile app is the product.",
        paragraphs: [
          "Head-office dashboards get the showtime. The mobile app is what decides whether your system gets used. Optimise for one-handed operation, offline support and an interaction model your 22-year-old part-timer can pick up in twenty minutes.",
        ],
      },
      {
        id: "measure-the-right-things",
        heading: "Measure the right things.",
        paragraphs: [
          "Two metrics matter more than any others: time-to-count and stockout days. If both move in your favour after launch, the system will sell itself to the next branch. If they don't, you have weeks — not quarters — before the floor goes back to spreadsheets.",
        ],
      },
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}

export function getRelatedInsights(slug: string, limit = 3) {
  const current = getInsight(slug);
  if (!current) return [];
  const byCategory = insights.filter(
    (i) => i.slug !== slug && i.category === current.category,
  );
  const others = insights.filter(
    (i) => i.slug !== slug && i.category !== current.category,
  );
  return [...byCategory, ...others].slice(0, limit);
}
