"use client";

import { useRef, type ReactNode } from "react";
import { cubicBezier, motion, useScroll, useTransform } from "framer-motion";
import { clamp01, useIsRtl, useMotionEnabled, useMotionGate } from "./hooks";

type ScrollOffset = NonNullable<NonNullable<Parameters<typeof useScroll>[0]>["offset"]>;

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "rise" | "scale" | "tilt" | "slide-start";
  /** Scroll window over which the entrance plays, scrubbed by the scrollbar. */
  offset?: ScrollOffset;
  /** Travel in px for rise / slide / tilt. */
  distance?: number;
};

const ease = cubicBezier(0.16, 1, 0.3, 1);

/**
 * Scroll-scrubbed entrance: progress follows the scrollbar both ways instead
 * of playing once on a timer. Never place inside a sticky/pinned element —
 * framer's offset measurement freezes there.
 */
export function ScrubReveal({
  children,
  className,
  variant = "rise",
  offset = ["start end", "start 65%"],
  distance = 56,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const gate = useMotionGate(useMotionEnabled());
  const rtl = useIsRtl();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  // No spring: it would start at 0 and fade already-visible content after hydration.
  const t = useTransform([scrollYProgress, gate], ([p, g]: number[]) => (g ? ease(clamp01(p)) : 1));
  const opacity = useTransform(t, (v) => 0.001 + v * 0.999);
  const y = useTransform(t, (v) =>
    variant === "rise" ? (1 - v) * distance : variant === "tilt" ? (1 - v) * distance * 0.6 : 0,
  );
  const x = useTransform(t, (v) => (variant === "slide-start" ? (1 - v) * distance * 1.3 * (rtl ? 1 : -1) : 0));
  const scale = useTransform(t, (v) => (variant === "scale" ? 0.86 + 0.14 * v : 1));
  const rotateX = useTransform(t, (v) => (variant === "tilt" ? (1 - v) * 16 : 0));

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
        x,
        y,
        scale,
        rotateX,
        // Perspective only for tilt: otherwise SSR would emit a transform and
        // turn this box into a containing block for fixed descendants.
        ...(variant === "tilt" ? { transformPerspective: 1100, transformOrigin: "50% 100%" } : null),
      }}
    >
      {children}
    </motion.div>
  );
}
