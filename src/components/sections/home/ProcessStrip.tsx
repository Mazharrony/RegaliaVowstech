import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";

export function ProcessStrip() {
  const t = useTranslations("home");
  const tProcess = useTranslations("process");
  const steps = [1, 2, 3, 4] as const;

  return (
    <section className="section-pad">
      <div className="container-wide">
        <div className="mb-16 grid gap-10 md:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
                {t("processEyebrow")}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-1 max-w-3xl text-balance">{t("processTitle")}</h2>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-0 border-t hairline md:grid-cols-2 lg:grid-cols-4">
          {steps.map((n, i) => (
            <Reveal
              key={n}
              delay={i * 0.08}
              className="group relative border-b hairline p-7 transition-colors hover:bg-[var(--color-bg-alt)] md:border-e md:p-9 lg:last:border-e-0"
            >
              <div className="flex h-full flex-col gap-12">
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-serif text-[var(--color-muted-soft)] transition-colors duration-700 group-hover:text-[var(--color-accent)]"
                    style={{ fontSize: "var(--step-5)", lineHeight: 0.9 }}
                  >
                    0{n}
                  </span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    / 04
                  </span>
                </div>
                <div>
                  <h3 className="display-4 mb-4">{tProcess(`${n}Title`)}</h3>
                  <p className="text-[var(--color-muted)]" style={{ fontSize: "var(--step-0)" }}>
                    {tProcess(`${n}Body`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
