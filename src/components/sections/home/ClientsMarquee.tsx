"use client";

import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { clients } from "@/content/company";

type RowProps = {
  items: string[];
  direction?: "left" | "right";
  reduce: boolean;
};

function Row({ items, direction = "left", reduce }: RowProps) {
  return (
    <div className="group overflow-hidden">
      <div
        className="flex w-max gap-12 md:gap-16"
        style={
          reduce
            ? undefined
            : {
                animation: `${
                  direction === "left" ? "marquee-x" : "marquee-x-reverse"
                } 55s linear infinite`,
              }
        }
      >
        {[...items, ...items].map((c, i) => (
          <span
            key={`${c}-${i}`}
            className="inline-flex items-center gap-8 whitespace-nowrap font-serif text-[clamp(1.5rem,5vw,3.5rem)] leading-none tracking-tight text-[var(--color-ink-soft)] md:gap-16"
          >
            {c}
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}

export function ClientsMarquee() {
  const t = useTranslations("home");
  const reduce = useReducedMotion() ?? false;

  // Split clients into two rows for opposite directions
  const rowA = clients;
  const rowB = [...clients].reverse();

  return (
    <section className="border-y hairline bg-[var(--color-bg-alt)] py-12 md:py-16">
      <div className="container-x mb-8 flex items-center justify-between gap-4">
        <p className="eyebrow">{t("clientsEyebrow")}</p>
        <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)] md:inline">
          {t("clientsSubtitle")}
        </span>
      </div>
      <div className="flex flex-col gap-6 md:gap-8">
        <Row items={rowA} direction="left" reduce={reduce} />
        <Row items={rowB} direction="right" reduce={reduce} />
      </div>
    </section>
  );
}
