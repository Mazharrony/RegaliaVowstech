"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { getPhotosByCategory, type Photo } from "@/content/gallery";

/** Scatter layout for the floating bubbles (desktop canvas). */
const BUBBLES = [
  { top: "2%", start: "0%", size: 190, rot: -4, dur: 6.5, delay: 0 },
  { top: "0%", start: "17%", size: 130, rot: 6, dur: 7.5, delay: -2 },
  { top: "8%", start: "31%", size: 170, rot: 0, dur: 8, delay: -1 },
  { top: "0%", start: "48%", size: 210, rot: -5, dur: 7.2, delay: -3.6 },
  { top: "10%", start: "68%", size: 160, rot: 3, dur: 6.8, delay: -1.4 },
  { top: "2%", start: "85%", size: 145, rot: 7, dur: 6, delay: -3 },
  { top: "44%", start: "5%", size: 150, rot: -6, dur: 7, delay: -1.5 },
  { top: "52%", start: "20%", size: 200, rot: 0, dur: 6.8, delay: -4 },
  { top: "50%", start: "41%", size: 130, rot: -2, dur: 5.6, delay: -3.4 },
  { top: "42%", start: "54%", size: 185, rot: 4, dur: 7.6, delay: -2.5 },
  { top: "54%", start: "73%", size: 170, rot: 0, dur: 6.4, delay: -0.8 },
  { top: "44%", start: "89%", size: 115, rot: 5, dur: 5.8, delay: -2.2 },
  { top: "28%", start: "13%", size: 95, rot: -3, dur: 5.2, delay: -1.8 },
];

/** Decorative accent dots drifting in the background. */
const DOTS = [
  { top: "6%", start: "44%", size: 12, dur: 5, delay: 0 },
  { top: "36%", start: "3%", size: 9, dur: 6, delay: -2 },
  { top: "22%", start: "78%", size: 14, dur: 7, delay: -1 },
  { top: "80%", start: "30%", size: 10, dur: 5.4, delay: -3 },
  { top: "74%", start: "66%", size: 8, dur: 6.6, delay: -4 },
  { top: "32%", start: "36%", size: 7, dur: 6.2, delay: -2.6 },
  { top: "88%", start: "52%", size: 11, dur: 5.8, delay: -1.2 },
  { top: "40%", start: "96%", size: 9, dur: 6.8, delay: -0.6 },
];

/** Hollow accent rings floating between the bubbles. */
const RINGS = [
  { top: "20%", start: "58%", size: 54, dur: 7.4, delay: -1.6, dashed: false },
  { top: "68%", start: "10%", size: 42, dur: 6.2, delay: -3.2, dashed: true },
  { top: "78%", start: "84%", size: 64, dur: 7.8, delay: -0.4, dashed: false },
  { top: "12%", start: "10%", size: 36, dur: 5.6, delay: -2.4, dashed: true },
];

export function GalleryTeaser() {
  const t = useTranslations("home");
  const [active, setActive] = useState<Photo | null>(null);
  const photos = useMemo(() => {
    // Sample evenly across the whole corporate pool so every batch of
    // photography surfaces on the homepage, not just the first uploads.
    const pool = getPhotosByCategory("corporate");
    const step = Math.max(1, Math.floor(pool.length / BUBBLES.length));
    return Array.from(
      { length: Math.min(BUBBLES.length, pool.length) },
      (_, i) => pool[(i * step) % pool.length],
    );
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section className="section-pad relative overflow-hidden">
      {/* Playful backdrop blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -start-24 top-1/4 h-96 w-96 rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent-tint) 0%, transparent 65%)",
            filter: "blur(30px)",
          }}
        />
        <div
          className="absolute -end-20 bottom-0 h-80 w-80 rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-accent-soft) 22%, transparent) 0%, transparent 65%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      <div className="container-wide relative">
        {/* Header */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-16">
          <div>
            <Reveal>
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
                {t("galleryTeaserEyebrow")}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-1 max-w-2xl text-balance">
                {t("galleryTeaserTitle")}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-[var(--color-muted)]" style={{ fontSize: "var(--step-1)" }}>
                {t("galleryTeaserBody")}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.25}>
            <Link href="/gallery" className="btn btn-soft btn-sm">
              {t("galleryTeaserCta")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>

        {/* Desktop: floating bubble canvas */}
        <div
          className="relative hidden h-[540px] md:block"
          style={{
            backgroundImage:
              "radial-gradient(color-mix(in srgb, var(--color-accent) 22%, transparent) 1.5px, transparent 1.5px)",
            backgroundSize: "30px 30px",
          }}
        >
          {DOTS.map((d, i) => (
            <span
              key={i}
              aria-hidden
              className="animate-float-bob absolute rounded-full bg-[var(--color-accent)] opacity-40"
              style={{
                top: d.top,
                insetInlineStart: d.start,
                width: d.size,
                height: d.size,
                animationDuration: `${d.dur}s`,
                animationDelay: `${d.delay}s`,
              }}
            />
          ))}
          {RINGS.map((r, i) => (
            <span
              key={i}
              aria-hidden
              className="animate-float-bob absolute rounded-full opacity-60"
              style={{
                top: r.top,
                insetInlineStart: r.start,
                width: r.size,
                height: r.size,
                border: `2px ${r.dashed ? "dashed" : "solid"} var(--color-accent)`,
                animationDuration: `${r.dur}s`,
                animationDelay: `${r.delay}s`,
              }}
            />
          ))}

          {photos.map((photo, i) => {
            const b = BUBBLES[i];
            return (
              <motion.button
                key={photo.id}
                type="button"
                onClick={() => setActive(photo)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="bubble-card photo photo-plain cursor-pointer rounded-[2rem]"
                style={
                  {
                    top: b.top,
                    insetInlineStart: b.start,
                    width: b.size,
                    height: b.size,
                    "--bubble-rot": `${b.rot}deg`,
                    "--bubble-dur": `${b.dur}s`,
                    "--bubble-delay": `${b.delay}s`,
                  } as React.CSSProperties
                }
                aria-label={photo.alt}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </motion.button>
            );
          })}
        </div>

        {/* Mobile: snap-scroll bubble row */}
        <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-4 md:hidden">
          {photos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActive(photo)}
              className="relative h-36 w-36 shrink-0 overflow-hidden rounded-[1.6rem] border-[3px] border-[var(--color-surface)] shadow-lg"
              aria-label={photo.alt}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="144px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Popup lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[min(78vh,640px)] w-[min(92vw,900px)] overflow-hidden rounded-[2rem] border-4 border-[var(--color-surface)] bg-[var(--color-ink)] shadow-2xl"
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 900px) 92vw, 900px"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute end-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-[var(--color-accent)]"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
