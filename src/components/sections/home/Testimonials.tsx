"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { testimonials } from "@/content/company";
import { easings } from "@/lib/utils";

export function Testimonials() {
  const t = useTranslations("home");
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, [reduce]);

  const item = testimonials[i];

  const next = () => setI((v) => (v + 1) % testimonials.length);
  const prev = () => setI((v) => (v - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-pad bg-[var(--color-bg-alt)]">
      <div className="container-wide">
        <div className="mb-12 flex items-end justify-between">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
              {t("testimonialsEyebrow")} · {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </p>
          </Reveal>
        </div>

        <div className="relative grid grid-cols-12 gap-4 md:gap-8">
          {/* Oversized open-quote */}
          <div
            aria-hidden
            className="pointer-events-none col-span-2 -mt-2 font-serif text-outline text-[var(--color-accent)] md:col-span-1 md:-mt-6"
            style={{ fontSize: "clamp(4rem, 14vw, 12rem)", lineHeight: 0.8 }}
          >
            “
          </div>

          <div className="relative col-span-10 min-h-[260px] md:col-span-11">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
                transition={{ duration: 0.8, ease: easings.out }}
              >
                <blockquote className="display-2 max-w-[22ch] text-balance">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
                  <span className="font-serif text-[var(--color-ink)]" style={{ fontSize: "var(--step-1)" }}>
                    {item.name}
                  </span>
                  <span className="h-px w-8 bg-[var(--color-line)]" />
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-ink-soft)]">
                    {item.role}
                  </span>
                  <span className="text-sm text-[var(--color-muted)]">
                    {item.company} · {item.location}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t hairline pt-6 md:mt-14">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show testimonial ${idx + 1}`}
                className="h-1 w-8 overflow-hidden bg-[var(--color-line)] transition-colors hover:bg-[var(--color-muted)] md:w-12"
              >
                <span
                  className={`block h-full transition-all duration-700 ${
                    idx === i ? "w-full bg-[var(--color-ink)]" : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.22em]">
            <button
              type="button"
              onClick={prev}
              className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-accent)]"
              aria-label="Previous"
            >
              <ArrowUpRight className="h-3.5 w-3.5 -rotate-[135deg]" />
              Prev
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-accent)]"
              aria-label="Next"
            >
              Next
              <ArrowUpRight className="h-3.5 w-3.5 rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
