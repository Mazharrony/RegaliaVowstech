"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { work } from "@/content/work";

export function SelectedWork() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const featured = work.slice(0, 4);

  return (
    <section className="section-pad bg-[var(--color-bg-alt)]">
      <div className="container-wide">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-20">
          <div>
            <Reveal>
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
                {t("workEyebrow")}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-1 max-w-2xl text-balance">{t("workTitle")}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="hidden md:block">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 border-b hairline pb-2 font-mono text-[0.7rem] uppercase tracking-[0.22em]"
            >
              {tCommon("viewWork")}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-10 md:gap-14 lg:grid-cols-12">
          {featured.map((w, i) => {
            // Alternating asymmetric layout: large / medium / large / medium
            const span =
              i % 2 === 0
                ? "lg:col-span-7"
                : "lg:col-span-5 lg:mt-24";
            const aspect = i % 2 === 0 ? "aspect-[16/11]" : "aspect-[4/5]";

            return (
              <Reveal key={w.slug} delay={i * 0.05} className={span}>
                <Link href={`/work/${w.slug}`} className="group block">
                  <MaskReveal>
                    <div
                      className={`relative overflow-hidden ${aspect}`}
                      style={{ background: w.cover }}
                    >
                      {/* Mesh */}
                      <div
                        aria-hidden
                        className="absolute inset-0 transition-transform duration-1000 group-hover:scale-[1.04]"
                        style={{
                          background: `
                            radial-gradient(at 30% 20%, ${w.color}33, transparent 55%),
                            radial-gradient(at 80% 90%, ${w.color}22, transparent 60%)`,
                        }}
                      />
                      {/* Diagonal stripe accent corner */}
                      <div
                        aria-hidden
                        className="absolute end-0 top-0 h-24 w-24 opacity-20 transition-opacity duration-700 group-hover:opacity-40 md:h-32 md:w-32"
                        style={{
                          background: `repeating-linear-gradient(135deg, ${w.color} 0 1px, transparent 1px 14px)`,
                        }}
                      />
                      {/* Number */}
                      <span
                        className="absolute start-6 top-6 font-mono text-[0.7rem] uppercase tracking-[0.22em]"
                        style={{ color: w.color }}
                      >
                        {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                      </span>
                      {/* Title block */}
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-[var(--color-bg)] md:p-10">
                        <div>
                          <p
                            className="font-mono text-[0.7rem] uppercase tracking-[0.22em]"
                            style={{ color: w.color }}
                          >
                            {w.client} · {w.year}
                          </p>
                          <p
                            className="mt-3 font-serif text-balance tracking-tight"
                            style={{ fontSize: "var(--step-3)", lineHeight: 1.05 }}
                          >
                            {w.title}
                          </p>
                        </div>
                        <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-7 md:w-7" />
                      </div>
                    </div>
                  </MaskReveal>

                  {/* Meta row */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {w.services.slice(0, 2).map((s) => (
                        <span
                          key={s}
                          className="rounded-full border hairline px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-muted)]"
                        >
                          {tCommon(`serviceTags.${s}`)}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                      {w.industry}
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-14 md:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 border-b hairline pb-2 font-mono text-[0.7rem] uppercase tracking-[0.22em]"
          >
            {tCommon("viewWork")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
