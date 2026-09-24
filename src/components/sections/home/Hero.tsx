"use client";

import { useMemo, useRef, type CSSProperties, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { WordSwap } from "@/components/motion/WordSwap";
import { TextSplit } from "@/components/motion/TextSplit";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { useMotionEnabled, useMotionGate } from "@/components/motion/hooks";
import { getServices } from "@/content/services";
import { toneClass, toneCycle } from "@/lib/tones";
import { cn } from "@/lib/utils";

/** Capability ticker pinned to the hero's bottom edge; drifts with scroll velocity. */
function CapabilityTicker() {
  const locale = useLocale();
  const tModels = useTranslations("models");
  const items = useMemo(() => {
    const names = getServices(locale).map((s) => s.title);
    names.splice(4, 0, tModels("title"));
    return names;
  }, [locale, tModels]);

  return (
    <VelocityMarquee
      className="relative border-t border-ink/15 py-5 md:py-6"
      rowClassName="whitespace-nowrap font-serif text-xl tracking-tight text-ink md:text-2xl"
      gap="clamp(2.5rem, 4vw, 3.5rem)"
    >
      {items.flatMap((name, i) => [
        <span key={name}>{name}</span>,
        <span
          key={`dot-${name}`}
          aria-hidden
          className={cn("tone-dot", toneClass(toneCycle(i, { set: "jewel" })))}
        />,
      ])}
    </VelocityMarquee>
  );
}

/** Decorative layer that rises `travel` px as the hero scrolls out (still while the gate is shut). */
function Drift({
  progress,
  gate,
  travel,
  className,
  style,
  children,
}: {
  progress: MotionValue<number>;
  gate: MotionValue<number>;
  travel: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const y = useTransform([progress, gate], ([p, g]: number[]) => -travel * p * g);
  return (
    <motion.div aria-hidden className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}

export function Hero() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const sectionRef = useRef<HTMLElement>(null);
  const gate = useMotionGate(useMotionEnabled());
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  // Scroll-out: identity at progress 0 (and before hydration), so the LCP h1 paints untouched.
  const headY = useTransform([scrollYProgress, gate], ([p, g]: number[]) => -90 * p * g);
  const headScale = useTransform([scrollYProgress, gate], ([p, g]: number[]) => 1 - 0.06 * p * g);
  // Floor at 0.8: ink body copy and button labels stay ≥ 4.8:1 on the darkest orange stop.
  const headOpacity = useTransform([scrollYProgress, gate], ([p, g]: number[]) => 1 - 0.2 * p * g);

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
      ref={sectionRef}
      className="hero-takeover relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[88px] text-ink md:pt-[120px]"
      // Deep violet accent (the violet tone's deep end) reads on the bright stage
      style={{ "--color-accent": "#2e1065" } as React.CSSProperties}
    >
      {/* Breathing centre bloom (the poster's glow) */}
      <div aria-hidden className="hero-takeover-bloom" />

      {/* Interlocked RV monogram watermark — outruns the page on scroll-out */}
      <Drift
        progress={scrollYProgress}
        gate={gate}
        travel={320}
        className="pointer-events-none absolute -end-[2%] top-1/2 -translate-y-1/2 select-none whitespace-nowrap leading-none text-ink/[0.08]"
        style={{
          fontFamily: "var(--font-monogram), 'Playfair Display', Didot, serif",
          fontWeight: 500,
          fontSize: "clamp(13rem, 42vw, 42rem)",
        }}
      >
        {/* LTR island: in an RTL paragraph the two atomic inlines would reorder to "VR" */}
        <span dir="ltr">
          <span className="inline-block">R</span>
          <span
            className="inline-block"
            style={{ marginInlineStart: "-0.36em", transform: "translateY(0.14em)" }}
          >
            V
          </span>
        </span>
      </Drift>

      {/* Drifting wireframe shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <Drift progress={scrollYProgress} gate={gate} travel={220} className="absolute end-[13%] top-[16%]">
          <div className="animate-float-bob" style={{ perspective: 900, animationDuration: "8s" }}>
            <div className="hero-cube" style={{ width: cubeSize, height: cubeSize }}>
              {faces.map((tf) => (
                <span key={tf} style={{ transform: tf }} />
              ))}
            </div>
          </div>
        </Drift>
        <Drift progress={scrollYProgress} gate={gate} travel={120} className="absolute end-[30%] bottom-[30%]">
          <div
            className="animate-float-bob relative"
            style={{ perspective: 700, animationDelay: "-4s", animationDuration: "9.5s" }}
          >
            <div className="hero-ring h-32 w-32" />
            <div className="hero-ring-dashed absolute inset-4" />
          </div>
        </Drift>
        {[
          { end: "8%", top: "58%", size: 9, delay: "-1.4s", dur: "5.6s", travel: 60 },
          { end: "24%", top: "34%", size: 6, delay: "-3.2s", dur: "6.4s", travel: 280 },
          { end: "40%", top: "14%", size: 7, delay: "-2.1s", dur: "5.9s", travel: 170 },
        ].map((d, i) => (
          <Drift
            key={i}
            progress={scrollYProgress}
            gate={gate}
            travel={d.travel}
            className="absolute"
            style={{ insetInlineEnd: d.end, top: d.top }}
          >
            <span
              className="animate-float-bob block rounded-full bg-ink/40"
              style={{
                width: d.size,
                height: d.size,
                animationDelay: d.delay,
                animationDuration: d.dur,
              }}
            />
          </Drift>
        ))}
      </div>

      <div className="container-wide relative flex flex-1 flex-col">
        {/* Meta row */}
        <Reveal>
          <div className="flex items-center justify-between gap-4 border-b border-ink/15 pb-5">
            <p className="eyebrow inline-flex items-center gap-3 !text-ink">
              <span className="h-1.5 w-1.5 animate-ticker-pulse rounded-full bg-[var(--color-accent)]" />
              {t("heroMeta2")}
            </p>
            <p className="hidden font-mono text-[0.68rem] uppercase tracking-[0.24em] text-ink/85 md:block">
              {t("heroMeta1")}
            </p>
          </div>
        </Reveal>

        {/* Headline + copy — lifts, settles back and dims as the hero scrolls out */}
        <motion.div
          className="flex flex-1 flex-col justify-center py-12 origin-left md:py-16 rtl:origin-right"
          style={{ y: headY, scale: headScale, opacity: headOpacity }}
        >
          <h1 className="mega max-w-[16ch] leading-[0.94] text-balance text-ink">
            <TextSplit as="span" className="block" text={t("heroLead")} />
            <span className="block">
              <WordSwap words={swapWords} accent />
            </span>
            <TextSplit as="span" className="block" text={t("heroLine2")} delay={0.3} />
          </h1>

          <Reveal delay={0.5}>
            <p
              className="mt-8 max-w-xl text-ink md:mt-10"
              style={{ fontSize: "var(--step-1)" }}
            >
              {t("heroBody")}
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <MagneticButton as="div" strength={8} className="w-full sm:w-auto">
                <Link href="/contact" className="btn btn-solid btn-lg w-full sm:w-auto">
                  {tCommon("startProject")}
                  <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                </Link>
              </MagneticButton>
              <Link
                href="/gallery"
                className="btn btn-lg w-full border border-ink/35 text-ink transition-colors hover:bg-ink/10 sm:w-auto"
              >
                {t("galleryTeaserCta")}
                <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
              </Link>
            </div>
          </Reveal>
        </motion.div>
      </div>

      {/* Capability ticker */}
      <CapabilityTicker />
    </section>
  );
}
