"use client";

import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { WordSwap } from "@/components/motion/WordSwap";
import { TextSplit } from "@/components/motion/TextSplit";
import { MagneticButton } from "@/components/motion/MagneticButton";
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
    <section className="relative isolate flex min-h-[88svh] flex-col pt-[88px] md:min-h-[100svh] md:pt-[120px]">
      <div className="container-wide flex flex-1 flex-col">
        {/* Top hairline */}
        <Reveal className="border-b hairline pb-5">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 animate-ticker-pulse rounded-full bg-[var(--color-accent)]" />
            <p className="eyebrow">{t("heroMeta2")}</p>
          </div>
        </Reveal>

        {/* Headline + CTAs — asymmetric split */}
        <div className="grid flex-1 grid-cols-12 items-start gap-y-12 pt-12 sm:pt-16 md:pt-24 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="mega leading-[0.92] text-balance">
              <TextSplit as="span" className="block" text={t("heroLead")} />
              <span className="block">
                <WordSwap words={swapWords} accent />
              </span>
              <TextSplit as="span" className="block" text={t("heroLine2")} delay={0.3} />
            </h1>

            <Reveal delay={0.5}>
              <p
                className="mt-10 max-w-xl text-[var(--color-muted)] md:mt-14"
                style={{ fontSize: "var(--step-1)" }}
              >
                {t("heroBody")}
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={0.4}
            className="col-span-12 flex flex-col gap-5 lg:col-span-4 lg:items-end lg:pt-4"
          >
            <MagneticButton as="div" strength={8} className="w-full sm:w-auto">
              <Link
                href="/contact"
                className="btn-ios btn-ios-primary btn-ios-lg w-full sm:w-auto"
              >
                {tCommon("startProject")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </MagneticButton>
            <Link
              href="/work"
              className="btn-ios btn-ios-ghost btn-ios-lg w-full sm:w-auto"
            >
              {tCommon("viewWork")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>

        {/* Bottom hairline */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: easings.out }}
          className="mt-auto flex items-center justify-between gap-4 border-t hairline pb-5 pt-6 text-[var(--color-muted)]"
        >
          <span className="text-[0.78rem] font-medium tracking-[-0.005em]">
            {tCommon("based")}
          </span>
          <span className="inline-flex items-center gap-2 text-[0.78rem] font-medium tracking-[-0.005em]">
            {tCommon("scrollHint")}
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
