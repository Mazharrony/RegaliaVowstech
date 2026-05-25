"use client";

import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { WordSwap } from "@/components/motion/WordSwap";
import { TextSplit } from "@/components/motion/TextSplit";
import { motion, useReducedMotion } from "framer-motion";
import { easings } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const reduce = useReducedMotion();

  const swapWords = [
    t("heroSwap1"),
    t("heroSwap2"),
    t("heroSwap3"),
    t("heroSwap4"),
    t("heroSwap5"),
  ];

  return (
    <section className="relative isolate overflow-hidden pt-[88px] md:pt-[120px]">
      {/* Accent corner panel */}
      <motion.div
        aria-hidden
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="pointer-events-none absolute -right-32 -top-20 hidden h-[420px] w-[420px] rounded-full md:block"
        style={{
          background:
            "radial-gradient(circle at center, rgba(184,137,58,0.18), transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="container-wide relative">
        {/* Meta strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b hairline pb-5">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 animate-ticker-pulse rounded-full bg-[var(--color-accent)]" />
              <p className="eyebrow">{t("heroEyebrow")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="hidden md:block">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
              {t("heroMeta2")}
            </p>
          </Reveal>
        </div>

        {/* Headline block */}
        <div className="grid grid-cols-12 gap-y-10 pt-12 md:pt-20">
          <div className="col-span-12 lg:col-span-9">
            <h1 className="mega leading-[0.9] text-balance">
              <TextSplit as="span" className="block" text={t("heroLead")} />
              <span className="block">
                <WordSwap words={swapWords} accent />
              </span>
              <TextSplit as="span" className="block" text={t("heroLine2")} delay={0.3} />
            </h1>
          </div>

          {/* Side meta column */}
          <Reveal
            delay={0.4}
            className="col-span-12 hidden flex-col items-end justify-end gap-4 md:flex lg:col-span-3"
          >
            <span className="block h-24 w-px bg-[var(--color-line)]" />
            <p className="max-w-[14ch] text-end font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
              {t("heroMeta1")}
            </p>
          </Reveal>
        </div>

        {/* Body + CTAs */}
        <div className="mt-16 grid gap-10 pb-24 md:pb-32 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.5} className="lg:col-span-5">
            <p className="max-w-xl text-[var(--color-muted)]" style={{ fontSize: "var(--step-1)" }}>
              {t("heroBody")}
            </p>
          </Reveal>
          <Reveal delay={0.6} className="lg:col-span-5 lg:col-start-7">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-ink)] px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-bg)] transition-all hover:bg-[var(--color-accent)] md:px-7 md:py-4 md:text-[0.72rem]"
              >
                {tCommon("startProject")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-ink)]"
              >
                <span className="link-wipe">{tCommon("viewWork")}</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Bottom rail */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: easings.out }}
          className="flex items-center justify-between gap-4 border-t hairline py-5 text-[var(--color-muted)]"
        >
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em]">
            {tCommon("based")}
          </span>
          <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.22em] md:inline">
            {tCommon("estYear")}
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em]">
            {tCommon("scrollHint")}
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
