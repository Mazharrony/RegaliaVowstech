"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMediaQuery, useMotionEnabled, useMotionGate } from "./hooks";

type Props = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /**
   * Fraction of a 160px travel. Positive floats up faster than the page;
   * negative lags behind it (the "background" feel — use for media).
   */
  speed?: number;
  /**
   * Media mode: the outer box clips and the inner layer is oversized by the
   * travel, so an image never shows its edge. Put `<Image fill sizes>` inside.
   */
  media?: boolean;
  /**
   * center: rests at the viewport centre (natural layout there). load: rests
   * where it sits at page load, so content visible on arrival never jumps
   * when motion switches on after hydration.
   */
  rest?: "center" | "load";
  /** Only move while this media query matches (e.g. "(min-width: 768px)"). */
  query?: string;
};

export function Parallax({
  children,
  className,
  innerClassName,
  speed = 0.2,
  media = false,
  rest = "center",
  query,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useMotionEnabled(query);
  const gate = useMotionGate(on);
  const mobile = useMediaQuery("(max-width: 767px)");
  const travel = 160 * speed * (mobile ? 0.5 : 1);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: rest === "load" ? ["start start", "end start"] : ["start end", "end start"],
  });
  // Both rest poses equal the SSR pose (natural layout) at their anchor point.
  const y = useTransform([scrollYProgress, gate], ([p, g]: number[]) =>
    g ? (rest === "load" ? -p * travel : (0.5 - p) * 2 * travel) : 0,
  );
  // Framer doesn't promote style-bound MotionValues; without a layer, blurred
  // or filtered content would repaint every scroll frame.
  const willChange = on ? "transform" : undefined;

  if (media) {
    const bleed = Math.abs(travel);
    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)}>
        <motion.div
          className={cn("absolute inset-x-0", innerClassName)}
          style={{ y, top: -bleed, bottom: -bleed, willChange }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div className={innerClassName} style={{ y, willChange }}>
        {children}
      </motion.div>
    </div>
  );
}
