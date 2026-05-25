"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";

export function Metrics() {
  const t = useTranslations("home");

  const stats = [
    { label: t("metricProjects"), to: 240, suffix: "+" },
    { label: t("metricBrands"), to: 80, suffix: "+" },
    { label: t("metricMarkets"), to: 14, suffix: "" },
    { label: t("metricsImpressions"), to: 1.2, suffix: " B+", decimals: 1 },
  ];

  return (
    <section className="slab-dark relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, var(--color-accent) 0 1px, transparent 1px 96px)",
        }}
      />

      <div className="container-wide relative section-pad-lg">
        <div className="mb-16 grid gap-10 lg:grid-cols-12 lg:items-end md:mb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5 inline-flex items-center gap-2 text-[var(--color-muted-dark)]">
                <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
                {t("metricsEyebrow")}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-1 max-w-[18ch] text-balance text-[var(--color-bg)]">
                {t("metricsTitle")}
              </h2>
            </Reveal>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-[var(--color-line-dark)] pt-10 md:gap-x-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <li className="flex flex-col gap-5">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted-dark)]">
                  / 0{i + 1}
                </span>
                <span
                  className="font-serif text-[var(--color-bg)]"
                  style={{ fontSize: "var(--step-7)", lineHeight: 0.9 }}
                >
                  <Counter to={s.to} suffix={s.suffix} />
                </span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted-dark)]">
                  {s.label}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
