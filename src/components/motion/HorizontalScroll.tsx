"use client";

import { Children, useEffect, useRef, useState, type FocusEvent, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { docTop, useHydrated, useIsRtl, useMediaQuery, useMotionEnabled, useMotionGate } from "./hooks";

type Props = {
  /** A flat array of items; each should carry an explicit width. */
  children: ReactNode;
  /** Accessible name for the list. */
  label?: string;
  className?: string;
};

/**
 * Pinned horizontal travel: vertical scroll drives the track sideways. Use it
 * full-bleed (outside container-wide) — it aligns its own padding to that
 * container. It is not pinned below md (a vertical stack), under reduced
 * motion (the items wrap, so nothing sits off-screen), or before measuring
 * and when the track already fits (a native snap scroller).
 *
 * Height: the outer box is 100svh + distance, so with offset
 * ["start start", "end end"] progress maps 1:1 onto distance.
 */
export function HorizontalScroll({ children, label, className }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rtl = useIsRtl();
  const enabled = useMotionEnabled("(min-width: 768px) and (min-height: 600px)");
  // Reduced motion gets a wrapped grid rather than a sideways scroller: its
  // items hold nothing focusable, so WebKit keyboard users couldn't scroll it.
  const hydrated = useHydrated();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const wrapped = hydrated && reduce;
  const [distance, setDistance] = useState(0);
  const pinned = enabled && distance > 0;
  const gate = useMotionGate(pinned);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  const x = useTransform([scrollYProgress, gate], ([p, g]: number[]) => (g ? (rtl ? 1 : -1) * p * distance : 0));
  const railScale = useTransform([scrollYProgress, gate], ([p, g]: number[]) => (g ? p : 0));

  useEffect(() => {
    const panel = panelRef.current;
    const track = trackRef.current;
    if (!enabled || !panel || !track) return;
    const ro = new ResizeObserver(() => {
      setDistance(Math.max(0, Math.ceil(track.offsetWidth - panel.clientWidth)));
    });
    ro.observe(panel);
    ro.observe(track);
    return () => ro.disconnect();
  }, [enabled]);

  // The pinned panel clips (overflow-x: clip, not scrollable), so a card that
  // receives keyboard focus off-screen is brought in by scrolling the page.
  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    if (!pinned || !(e.target as HTMLElement).matches(":focus-visible")) return;
    const item = (e.target as HTMLElement).closest<HTMLElement>("[data-hs-item]");
    const track = trackRef.current;
    const outer = outerRef.current;
    if (!item || !track || !outer) return;
    // Both offsets are against the sticky panel; in RTL the track overflows
    // to its left, so measure from the track's own edge.
    const rel = item.offsetLeft - track.offsetLeft;
    const fromStart = rtl ? track.offsetWidth - rel - item.offsetWidth : rel;
    const pad = parseFloat(getComputedStyle(track).paddingInlineStart) || 0;
    const along = Math.min(distance, Math.max(0, fromStart - pad));
    window.scrollTo({ top: docTop(outer) + along, behavior: "instant" });
  };

  return (
    <div
      ref={outerRef}
      className={cn("relative", className)}
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div
        ref={panelRef}
        className={cn(
          "flex flex-col",
          pinned
            ? "sticky top-0 h-[100svh] justify-center overflow-x-clip pt-[var(--header-clear)]"
            : !wrapped &&
                // Scroll padding matches the track's, or snapping parks the first card on the viewport edge
                "md:snap-x md:snap-mandatory md:overflow-x-auto md:scroll-ps-[max(var(--container-padding),calc((100vw_-_1760px)/2_+_var(--container-padding)))] md:scroll-pe-[var(--container-padding)] md:pb-4",
        )}
      >
        <motion.div
          ref={trackRef}
          role="list"
          aria-label={label}
          onFocus={onFocus}
          style={{ x, willChange: pinned ? "transform" : undefined }}
          className={cn(
            "flex flex-col gap-5 px-[var(--container-padding)] md:flex-row md:gap-6 md:ps-[max(var(--container-padding),calc((100vw_-_1760px)/2_+_var(--container-padding)))]",
            wrapped
              ? "md:flex-wrap md:pe-[max(var(--container-padding),calc((100vw_-_1760px)/2_+_var(--container-padding)))]"
              : "md:w-max",
          )}
        >
          {Children.toArray(children).map((child, i) => (
            <div key={i} role="listitem" data-hs-item className="md:shrink-0 md:snap-start">
              {child}
            </div>
          ))}
        </motion.div>
        {pinned && (
          <div
            aria-hidden
            className="mx-auto mt-10 h-[2px] w-[min(100%_-_2*var(--container-padding),1760px_-_2*var(--container-padding))] overflow-hidden rounded-full bg-[var(--color-line)]"
          >
            <motion.div
              className="h-full origin-left bg-[image:var(--grad-spectrum)] rtl:origin-right"
              style={{ scaleX: railScale }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
