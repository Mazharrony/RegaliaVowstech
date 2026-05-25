export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  author: string;
  body: string[];
};

export const insights: Insight[] = [
  {
    slug: "ai-that-earns-its-keep",
    title: "AI that earns its keep: a checklist for the GCC boardroom.",
    excerpt:
      "Ten questions every executive should ask before greenlighting an AI initiative — and what good answers sound like.",
    category: "AI & Automation",
    date: "2026-03-04",
    readMinutes: 6,
    author: "Studio",
    body: [
      "Every brand in the region has an AI line item this year. Most will quietly disappear next year. The difference between AI that earns its keep and AI that becomes a sunk cost is usually decided before a single line of code is written.",
      "Start with the smallest possible problem with the largest measurable outcome. If you cannot describe — in one sentence — the hour saved, the error avoided, or the revenue unlocked, you do not have a use case. You have a hope.",
      "Pair that outcome with an evaluation plan you would defend to a CFO. AI features without measurement are theatre.",
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
    author: "Studio",
    body: [
      "Strip a brand to its skeleton and you find type, rhythm and one or two colours doing the heavy lifting. The editorial mode endures because it scales: from a 32-page report to a Reels grid to an expo wall, the system does not blink.",
      "Where it breaks is in the hands of teams who confuse minimalism with absence. The best editorial brands are not empty — they are decided.",
    ],
  },
  {
    slug: "designing-for-the-souq",
    title: "Designing software for the way the souq actually works.",
    excerpt:
      "Inventory systems fail when they ignore the choreography of the shop floor. A field guide from twelve retail builds.",
    category: "Product",
    date: "2026-01-18",
    readMinutes: 7,
    author: "Studio",
    body: [
      "Visit any of the busy retail corridors across the GCC and you'll see software contorted to fit a workflow no engineer ever watched. The best inventory systems start with a notebook on the shop floor, not a database diagram.",
      "Capture the choreography first. Then model the data.",
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}
