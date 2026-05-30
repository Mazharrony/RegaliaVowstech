"use client";

import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { clients } from "@/content/company";

export function ClientsMarquee() {
  const t = useTranslations("home");
  const reduce = useReducedMotion();

  // Split clients into two rows for opposite directions
  const rowA = clients;
  const rowB = [...clients].reverse();

  const Row = ({
    items,
    direction = "left",
  }: {
    items: string[];
    direction?: "left" | "right";
  }) => (
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

  return (
    <section className="border-y hairline bg-[var(--color-bg-alt)] py-12 md:py-16">
      <div className="container-x mb-8 flex items-center justify-between gap-4">
        <p className="eyebrow">{t("clientsEyebrow")}</p>
        <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)] md:inline">
          Dubai · selected work
        </span>
      </div>
      <div className="flex flex-col gap-6 md:gap-8">
        <Row items={rowA} direction="left" />
        <Row items={rowB} direction="right" />
      </div>
    </section>
  );
}
