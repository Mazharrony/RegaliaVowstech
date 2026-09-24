"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionEnabled, useMotionGate } from "./hooks";

type Props = {
  /**
   * Position and size it (e.g. "absolute inset-y-0 start-4 w-px") inside a
   * relative list; the element itself is the scroll target, so it must span
   * the full length it draws along.
   */
  className?: string;
  /** Draws along the block axis (timelines) or the inline axis. */
  axis?: "block" | "inline";
};

/**
 * A spectrum line that draws itself as its list scrolls past the reading line
 * (70% down the viewport). Fully drawn on the server and under reduced motion.
 */
export function ScrollLine({ className, axis = "block" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const gate = useMotionGate(useMotionEnabled());
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const scale = useTransform([scrollYProgress, gate], ([p, g]: number[]) => (g ? p : 1));

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none overflow-hidden bg-[var(--color-line)]", className)}>
      <motion.div
        className={cn(
          "h-full w-full",
          axis === "block"
            ? "origin-top bg-[linear-gradient(180deg,#ff8a2a,#ff4d9d_25%,#8b5cf6_50%,#3b82f6_75%,#14b8a6)]"
            : "origin-left bg-[image:var(--grad-spectrum)] rtl:origin-right",
        )}
        style={axis === "block" ? { scaleY: scale } : { scaleX: scale }}
      />
    </div>
  );
}
