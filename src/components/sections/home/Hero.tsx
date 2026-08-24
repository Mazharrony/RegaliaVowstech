"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { WordSwap } from "@/components/motion/WordSwap";
import { TextSplit } from "@/components/motion/TextSplit";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useReducedMotion } from "framer-motion";
import { getServices } from "@/content/services";

/** White capability ticker pinned to the hero's bottom edge. */
function CapabilityTicker() {
  const locale = useLocale();
  const tModels = useTranslations("models");
  const reduce = useReducedMotion() ?? false;
  const items = useMemo(() => {
    const names = getServices(locale).map((s) => s.title);
    names.splice(4, 0, tModels("title"));
    return names;
  }, [locale, tModels]);

  return (
    <div className="relative border-t border-white/15 py-5 md:py-6">
      <div className="overflow-hidden">
        <div
          className="flex w-max gap-10 md:gap-14"
          style={reduce ? undefined : { animation: "marquee-x 30s linear infinite" }}
        >
          {[...items, ...items].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex items-center gap-10 whitespace-nowrap font-serif text-xl tracking-tight text-white/80 md:gap-14 md:text-2xl"
            >
              {name}
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const swapWords = [
    t("heroSwap1"),
    t("heroSwap2"),
    t("heroSwap3"),
    t("heroSwap4"),
    t("heroSwap5"),
  ];

  const cubeSize = 72;
  const half = cubeSize / 2;
  const faces = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  return (
    <section
      className="hero-takeover relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[88px] text-white md:pt-[120px]"
      style={{ "--color-accent": "var(--ramp-0)" } as React.CSSProperties}
    >
      {/* Breathing centre bloom (the poster's glow) */}
      <div aria-hidden className="hero-takeover-bloom" />

      {/* Interlocked RV monogram watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -end-[2%] top-1/2 -translate-y-1/2 select-none whitespace-nowrap leading-none text-white/[0.08]"
        style={{
          fontFamily: "var(--font-monogram), 'Playfair Display', Didot, serif",
          fontWeight: 500,
          fontSize: "clamp(13rem, 42vw, 42rem)",
        }}
      >
        <span className="inline-block">R</span>
        <span
          className="inline-block"
          style={{ marginInlineStart: "-0.36em", transform: "translateY(0.14em)" }}
        >
          V
        </span>
      </span>

      {/* Drifting wireframe shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <div
          className="animate-float-bob absolute end-[13%] top-[16%]"
          style={{ perspective: 900, animationDuration: "8s" }}
        >
          <div className="hero-cube" style={{ width: cubeSize, height: cubeSize }}>
            {faces.map((tf) => (
              <span key={tf} style={{ transform: tf }} />
            ))}
          </div>
        </div>
        <div
          className="animate-float-bob absolute end-[30%] bottom-[30%]"
          style={{ perspective: 700, animationDelay: "-4s", animationDuration: "9.5s" }}
        >
          <div className="relative">
            <div className="hero-ring h-32 w-32" />
            <div className="hero-ring-dashed absolute inset-4" />
          </div>
        </div>
        {[
          { end: "8%", top: "58%", size: 9, delay: "-1.4s", dur: "5.6s" },
          { end: "24%", top: "34%", size: 6, delay: "-3.2s", dur: "6.4s" },
          { end: "40%", top: "14%", size: 7, delay: "-2.1s", dur: "5.9s" },
        ].map((d, i) => (
          <span
            key={i}
            className="animate-float-bob absolute rounded-full bg-white/60"
            style={{
              insetInlineEnd: d.end,
              top: d.top,
              width: d.size,
              height: d.size,
              animationDelay: d.delay,
              animationDuration: d.dur,
            }}
          />
        ))}
      </div>

      <div className="container-wide relative flex flex-1 flex-col">
        {/* Meta row */}
        <Reveal>
          <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-5">
            <p className="eyebrow inline-flex items-center gap-3 !text-white/70">
              <span className="h-1.5 w-1.5 animate-ticker-pulse rounded-full bg-[var(--color-accent)]" />
              {t("heroMeta2")}
            </p>
            <p className="hidden font-mono text-[0.68rem] uppercase tracking-[0.24em] text-white/60 md:block">
              {t("heroMeta1")}
            </p>
          </div>
        </Reveal>

        {/* Headline + copy */}
        <div className="flex flex-1 flex-col justify-center py-12 md:py-16">
          <h1 className="mega max-w-[16ch] leading-[0.94] text-balance text-white">
            <TextSplit as="span" className="block" text={t("heroLead")} />
            <span className="block">
              <WordSwap words={swapWords} accent />
            </span>
            <TextSplit as="span" className="block" text={t("heroLine2")} delay={0.3} />
          </h1>

          <Reveal delay={0.5}>
            <p
              className="mt-8 max-w-xl text-white/85 md:mt-10"
              style={{ fontSize: "var(--step-1)" }}
            >
              {t("heroBody")}
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <MagneticButton as="div" strength={8} className="w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="btn btn-lg w-full bg-white text-[var(--ramp-7)] shadow-[var(--shadow-lg)] transition-colors hover:bg-[color-mix(in_srgb,var(--ramp-0)_22%,#ffffff)] sm:w-auto"
                >
                  {tCommon("startProject")}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </MagneticButton>
              <Link
                href="/gallery"
                className="btn btn-lg w-full border border-white/40 text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                {t("galleryTeaserCta")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>

      </div>

      {/* Capability ticker */}
      <CapabilityTicker />
    </section>
  );
}
