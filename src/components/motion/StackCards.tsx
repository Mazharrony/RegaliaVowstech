"use client";

import { Children, useEffect, useRef, useState, type FocusEvent, type ReactNode, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { clamp01, docTop, useMotionEnabled, useMotionGate } from "./hooks";

type Geo = { deckTop: number; stick: number[]; natural: number[]; h: number[] };

type Props = {
  /** A flat array of cards (Children.toArray does not unwrap Fragments). */
  children: ReactNode;
  className?: string;
  /** Radius of the cards, so the dimming veil matches their corners. */
  radius?: string;
  /** Max ink veil over a fully covered card. */
  dim?: number;
  /** Scale lost per card stacked on top. */
  step?: number;
  /** Out-param: 0→1 across the stacking phase (feed ScrollTint). */
  progress?: MotionValue<number>;
};

/**
 * Sticky stacking deck. Each card sticks a little below the previous one and,
 * as later cards slide over it, scales down and dims. Sticky itself is CSS, so
 * the stack works before hydration; if the deck can't fit in the viewport (short
 * screens) or motion is reduced, it falls back to a plain list.
 *
 * Math, for card i: it is touched by card i+1 at c = natural[i+1] − stick[i] − h[i]
 * and the last card lands at L = natural[n−1] − stick[n−1]; t ramps 0→1 over c→L.
 */
export function StackCards({
  children,
  className,
  radius = "var(--radius-xl)",
  dim = 0.28,
  step = 0.04,
  progress,
}: Props) {
  const items = Children.toArray(children);
  const n = items.length;
  const deckRef = useRef<HTMLDivElement>(null);
  const geo = useRef<Geo>({ deckTop: 0, stick: [], natural: [], h: [] });
  const [fits, setFits] = useState(true);
  const live = useMotionEnabled() && fits;
  const gate = useMotionGate(live);
  const { scrollY } = useScroll();
  // Bumped after every measure, so geometry-derived values recompute without a scroll.
  const geoTick = useMotionValue(0);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const cards = Array.from(deck.querySelectorAll<HTMLElement>(":scope > [data-stack-item]"));
    // Fit against the small viewport (100svh, which the cards are sized in):
    // innerHeight changes as mobile toolbars collapse, which would flip the
    // deck between stacked and static mid-scroll.
    const probe = document.createElement("div");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText =
      "position:fixed;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none";
    document.body.appendChild(probe);
    const measure = () => {
      const g = geo.current;
      let acc = 0;
      g.deckTop = docTop(deck); // the deck itself is never sticky or transformed
      cards.forEach((c, i) => {
        const cs = getComputedStyle(c);
        g.stick[i] = parseFloat(cs.top) || 0;
        g.h[i] = c.offsetHeight;
        g.natural[i] = acc;
        acc += c.offsetHeight + (parseFloat(cs.marginBlockEnd) || 0);
      });
      if (!cards.length) return;
      setFits(g.stick[cards.length - 1] + Math.max(...g.h) <= probe.offsetHeight - 16);
      geoTick.set(geoTick.get() + 1);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(deck);
    ro.observe(document.body); // content above the deck changing height moves deckTop
    cards.forEach((c) => ro.observe(c));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      probe.remove();
    };
  }, [n, geoTick]);

  const syncProgress = () => {
    const g = geo.current;
    if (!progress || n < 2 || g.natural.length < n) return;
    const s0 = g.natural[0] - g.stick[0];
    const s1 = g.natural[n - 1] - g.stick[n - 1];
    progress.set(clamp01((scrollY.get() - g.deckTop - s0) / Math.max(1, s1 - s0)));
  };
  useMotionValueEvent(scrollY, "change", syncProgress);
  useMotionValueEvent(geoTick, "change", syncProgress);

  // Shift+Tab lands on a card that is still stuck under the next one, so the
  // browser sees it as in view and doesn't scroll. Bring it back to where it
  // has just landed, before the next card covers it.
  const onItemFocus = (i: number) => (e: FocusEvent<HTMLDivElement>) => {
    if (!live || i >= n - 1 || !(e.target as HTMLElement).matches(":focus-visible")) return;
    const g = geo.current;
    if (g.natural.length < n) return;
    const s = window.scrollY - g.deckTop;
    const landed = g.natural[i] - g.stick[i];
    const touched = g.natural[i + 1] - g.stick[i] - g.h[i];
    if (s > touched) window.scrollTo({ top: g.deckTop + landed, behavior: "instant" });
  };

  return (
    <div
      ref={deckRef}
      data-fits={fits}
      className={cn(
        "group/stack relative [--stack-gap:6svh] [--stack-offset:12px] [--stack-top:calc(var(--header-clear)_+_1rem)] md:[--stack-gap:8svh] md:[--stack-offset:20px]",
        className,
      )}
    >
      {items.map((child, i) => (
        <div
          key={i}
          data-stack-item
          onFocus={onItemFocus(i)}
          className="sticky motion-reduce:static group-data-[fits=false]/stack:static"
          style={{
            top: `calc(var(--stack-top) + ${i} * var(--stack-offset))`,
            marginBlockEnd: i < n - 1 ? "var(--stack-gap)" : undefined,
          }}
        >
          <StackLayer
            index={i}
            count={n}
            geo={geo}
            geoTick={geoTick}
            scrollY={scrollY}
            gate={gate}
            step={step}
            dim={dim}
            radius={radius}
            live={live}
          >
            {child}
          </StackLayer>
        </div>
      ))}
      {/* Dwell: lets the last card sit before the deck scrolls away */}
      <div aria-hidden className="h-[12svh] motion-reduce:hidden group-data-[fits=false]/stack:hidden" />
    </div>
  );
}

function StackLayer({
  index,
  count,
  geo,
  geoTick,
  scrollY,
  gate,
  step,
  dim,
  radius,
  live,
  children,
}: {
  index: number;
  count: number;
  geo: RefObject<Geo>;
  geoTick: MotionValue<number>;
  scrollY: MotionValue<number>;
  gate: MotionValue<number>;
  step: number;
  dim: number;
  radius: string;
  live: boolean;
  children: ReactNode;
}) {
  const t = useTransform([scrollY, gate, geoTick], ([y, g]: number[]) => {
    if (!g || index === count - 1) return 0;
    const G = geo.current;
    if (G.natural.length < count) return 0;
    const s = y - G.deckTop;
    const c = G.natural[index + 1] - G.stick[index] - G.h[index];
    const L = G.natural[count - 1] - G.stick[count - 1];
    return clamp01((s - c) / Math.max(1, L - c));
  });
  const scale = useTransform(t, (v) => 1 - v * (count - 1 - index) * step);
  const veil = useTransform(t, (v) => v * dim);

  return (
    <motion.div
      className="relative h-full origin-top"
      style={{ scale, borderRadius: radius, willChange: live ? "transform" : undefined }}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[var(--color-ink)]"
        style={{ opacity: veil }}
      />
    </motion.div>
  );
}
