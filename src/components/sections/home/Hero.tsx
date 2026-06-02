"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { easings } from "@/lib/utils";

export function Hero() {
  const tCommon = useTranslations("common");
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const v = videoRef.current;
    if (!v) return;
    const start = () => {
      v.play().catch(() => {
        // autoplay may be blocked; poster remains visible — acceptable
      });
    };
    if (v.readyState >= 2) start();
    else v.addEventListener("loadeddata", start, { once: true });
    return () => v.removeEventListener("loadeddata", start);
  }, [reduce]);

  return (
    <section className="relative isolate flex min-h-[88svh] flex-col pt-[88px] md:min-h-[100svh] md:pt-[120px]">
      <div className="container-wide flex flex-1 flex-col">
        <div className="relative flex-1 overflow-hidden rounded-[var(--radius-xl)] border hairline bg-[var(--color-bg-alt)]">
          {/* Poster + video */}
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
            poster="/media/hero-poster.jpg"
            playsInline
            muted
            loop
            autoPlay={!reduce}
            preload="metadata"
            aria-hidden
            onLoadedData={() => setReady(true)}
          >
            <source
              src="/media/hero-mobile.mp4"
              type="video/mp4"
              media="(max-width: 768px)"
            />
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>

          {/* Poster fallback layer (visible until video paints, and when reduced-motion) */}
          <div
            aria-hidden
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              ready && !reduce ? "opacity-0" : "opacity-100"
            }`}
            style={{ backgroundImage: "url(/media/hero-poster.jpg)" }}
          />

          {/* Soft inner vignette to lift edge contrast — kept very subtle */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -120px 140px -80px rgba(0,0,0,0.35)",
            }}
          />
        </div>

        {/* Bottom hairline meta */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: easings.out }}
          className="mt-6 flex items-center justify-between gap-4 border-t hairline pb-5 pt-6 text-[var(--color-muted)]"
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
