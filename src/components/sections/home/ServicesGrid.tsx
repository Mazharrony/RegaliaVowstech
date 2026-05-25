"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { getServices } from "@/content/services";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { easings } from "@/lib/utils";

export function ServicesGrid() {
  const locale = useLocale();
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const services = useMemo(() => getServices(locale), [locale]);

  return (
    <section className="section-pad relative">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-16 grid gap-10 md:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
                {t("servicesEyebrow")} · 09
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-1 max-w-[14ch] text-balance">{t("servicesTitle")}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[var(--color-muted)]" style={{ fontSize: "var(--step-1)" }}>
              {t("servicesBody")}
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 border-b hairline pb-2 font-mono text-[0.7rem] uppercase tracking-[0.22em]"
            >
              {tCommon("allServices")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>

        {/* Index list */}
        <ul
          className="relative border-t hairline"
          onMouseLeave={() => setHovered(null)}
        >
          {services.map((s) => (
            <li key={s.slug} className="relative">
              <Link
                href={`/services/${s.slug}`}
                onMouseEnter={() => setHovered(s.slug)}
                onFocus={() => setHovered(s.slug)}
                className="group relative flex items-center justify-between gap-6 border-b hairline py-6 transition-colors md:py-8"
              >
                <div className="flex items-baseline gap-6 md:gap-12">
                  <span className="font-mono text-[0.7rem] tabular-nums text-[var(--color-muted)] md:text-sm">
                    {s.number}
                  </span>
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
                    <h3
                      className="font-serif tracking-tight text-[var(--color-ink)] transition-transform duration-700 group-hover:translate-x-3 rtl:group-hover:-translate-x-3"
                      style={{ fontSize: "var(--step-3)" }}
                    >
                      {s.title}
                    </h3>
                    <p className="hidden text-sm text-[var(--color-muted)] md:block md:max-w-[36ch]">
                      {s.tagline}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--color-muted)] transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--color-accent)] md:h-6 md:w-6" />

                {/* Hover accent bar */}
                <AnimatePresence>
                  {!reduce && hovered === s.slug && (
                    <motion.span
                      aria-hidden
                      layoutId="cap-accent"
                      className="absolute inset-y-0 -start-3 w-[3px] bg-[var(--color-accent)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: easings.out }}
                    />
                  )}
                </AnimatePresence>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
