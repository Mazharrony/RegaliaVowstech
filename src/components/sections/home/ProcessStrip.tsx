import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { toneClass, toneCycle } from "@/lib/tones";
import { cn } from "@/lib/utils";

export function ProcessStrip() {
  const t = useTranslations("home");
  const tProcess = useTranslations("process");
  const steps = [1, 2, 3, 4] as const;

  // The page's one pinned section. No overflow clipping on this section: it
  // would break the sticky panel. Anchored on cobalt so the deck shares no
  // tone with the gallery above.
  return (
    <section className="section-pad">
      <div className="container-wide">
        <div className="mb-12 md:mb-10">
          <Reveal>
            <p className="eyebrow mb-5 inline-flex items-center gap-2">
              <span aria-hidden className="spectrum-rule" />
              {t("processEyebrow")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-1 max-w-3xl text-balance">{t("processTitle")}</h2>
          </Reveal>
        </div>
      </div>

      <HorizontalScroll label={t("processTitle")}>
        {steps.map((n, i) => (
          <article
            key={n}
            className={cn(
              "tone-card flex w-full flex-col justify-between gap-12 rounded-[var(--radius-xl)] p-7 sm:p-9 md:min-h-[min(62svh,520px)] md:w-[min(84vw,560px)] md:p-10",
              toneClass(toneCycle(i, { anchor: "cobalt" })),
            )}
          >
            {/* Counter sits beside the numeral, clear of the top-end bloom. */}
            <p className="flex items-baseline gap-3">
              <span className="font-serif" style={{ fontSize: "min(var(--step-7), 18svh)", lineHeight: 0.85 }}>
                0{n}
              </span>
              <span className="font-mono text-[0.78rem] uppercase tracking-[0.22em] text-tone-ink-soft">/ 04</span>
            </p>
            <div>
              <h3 className="display-3 mb-4 text-balance">{tProcess(`${n}Title`)}</h3>
              <p className="max-w-md text-tone-ink-soft" style={{ fontSize: "var(--step-1)" }}>
                {tProcess(`${n}Body`)}
              </p>
            </div>
          </article>
        ))}
      </HorizontalScroll>
    </section>
  );
}
