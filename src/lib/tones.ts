import type { ServiceSlug } from "@/content/services";

type ToneKind = "jewel" | "pastel";
type Swatch = { kind: ToneKind; bloom: string; base: string; deep: string };

/**
 * Canonical card tones. globals.css `.tone-*` mirrors these hexes — edit both.
 * Jewels carry white text (≥ 5.95:1 on base). Sunset — the brand orange at full
 * brightness — and the pastels carry ink (≥ 5.46:1), so they share the "pastel" kind.
 */
export const TONES = {
  sunset: { kind: "pastel", bloom: "#ffd27a", base: "#ff8a2a", deep: "#f5540c" },
  magenta: { kind: "jewel", bloom: "#ff7ab8", base: "#b81a60", deep: "#5e0a33" },
  violet: { kind: "jewel", bloom: "#b69cff", base: "#6d34e0", deep: "#2e1065" },
  cobalt: { kind: "jewel", bloom: "#7cc0ff", base: "#1c56cc", deep: "#0f1f5c" },
  teal: { kind: "jewel", bloom: "#5ee6c8", base: "#0a6e62", deep: "#06332e" },
  ruby: { kind: "jewel", bloom: "#ff8f8f", base: "#c21d3a", deep: "#4c0519" },
  citrus: { kind: "pastel", bloom: "#fff3b0", base: "#ffd83d", deep: "#f5b700" },
  lime: { kind: "pastel", bloom: "#efffc2", base: "#c8f25a", deep: "#9fd62a" },
  sky: { kind: "pastel", bloom: "#e3f4ff", base: "#9ad8ff", deep: "#5cb8f5" },
  blush: { kind: "pastel", bloom: "#ffe6f1", base: "#ffc2dc", deep: "#ff94c2" },
  lilac: { kind: "pastel", bloom: "#f0e9ff", base: "#d9c8ff", deep: "#b79cff" },
  mint: { kind: "pastel", bloom: "#e3fff4", base: "#a8f0d4", deep: "#6fdcb4" },
} as const satisfies Record<string, Swatch>;

export type Tone = keyof typeof TONES;

/** Jewel/light interleave: no neighbour shares a kind or hue family, and it wraps cleanly. */
const MIXED: readonly Tone[] = [
  "violet", "sunset", "cobalt", "lime", "magenta",
  "mint", "ruby", "sky", "teal", "citrus",
];
const JEWEL_SEQ: readonly Tone[] = ["violet", "teal", "magenta", "cobalt", "ruby"];
const PASTEL_SEQ: readonly Tone[] = ["citrus", "sky", "blush", "mint", "lilac", "lime"];

/** Each capability keeps one hue everywhere it appears: menu, home deck, index, detail page. */
export const SERVICE_TONES = {
  branding: "violet",
  marketing: "cobalt",
  "events-expo": "sunset",
  "corporate-events": "teal",
  "content-ads": "ruby",
  models: "magenta",
} as const satisfies Record<ServiceSlug | "models", Tone>;

/** Literal class strings so they stay grep-able and scanner-safe. */
const TONE_CLASS = {
  sunset: "tone-sunset",
  magenta: "tone-magenta",
  violet: "tone-violet",
  cobalt: "tone-cobalt",
  teal: "tone-teal",
  ruby: "tone-ruby",
  citrus: "tone-citrus",
  lime: "tone-lime",
  sky: "tone-sky",
  blush: "tone-blush",
  lilac: "tone-lilac",
  mint: "tone-mint",
} as const satisfies Record<Tone, `tone-${Tone}`>;

export const toneClass = (t: Tone) => TONE_CLASS[t];

export function serviceTone(slug: string): Tone {
  return (SERVICE_TONES as Record<string, Tone>)[slug] ?? "sunset";
}

type CycleOpts = {
  set?: "mixed" | "jewel" | "pastel";
  /** Start the sequence at this tone (e.g. the page's service tone). */
  anchor?: Tone;
  /** Grid column count; even counts swap pairs on odd rows so columns never repeat a kind. */
  cols?: number;
  exclude?: readonly Tone[];
};

/** Deterministic (SSR-safe) tone for the i-th item of a list. */
export function toneCycle(i: number, { set = "mixed", anchor, cols = 1, exclude = [] }: CycleOpts = {}): Tone {
  const seq = (set === "jewel" ? JEWEL_SEQ : set === "pastel" ? PASTEL_SEQ : MIXED).filter(
    (t) => !exclude.includes(t),
  );
  const start = anchor ? Math.max(0, seq.indexOf(anchor)) : 0;
  const k = set === "mixed" && cols % 2 === 0 && Math.floor(i / cols) % 2 === 1 ? i ^ 1 : i;
  return seq[(start + k) % seq.length];
}
