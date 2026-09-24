"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  type MotionValue,
} from "framer-motion";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsRtl, useMotionEnabled, useMotionGate } from "./hooks";

type Props = {
  /** One copy of the row; it is repeated as needed to fill the width. */
  children: ReactNode;
  /** Base drift in px per second. */
  speed?: number;
  /** Space between items and at the copy seam. */
  gap?: string;
  /** Accessible name of the pause toggle (defaults per locale). */
  pauseLabel?: string;
  className?: string;
  rowClassName?: string;
};

/**
 * Marquee that drifts at a base speed, speeds up with scroll velocity and
 * reverses when the visitor scrolls back up. Static under reduced motion.
 * It moves for longer than 5s, so it carries a pause toggle (WCAG 2.2.2) and
 * also holds still under a hovering mouse.
 */
export function VelocityMarquee({ children, speed = 40, gap = "3rem", pauseLabel, className, rowClassName }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const enabled = useMotionEnabled();
  const gate = useMotionGate(enabled);
  const rtl = useIsRtl();
  const inView = useInView(wrapRef, { margin: "200px" });

  const copyW = useMotionValue(0);
  const baseX = useMotionValue(0);
  const x = useTransform([baseX, copyW, gate], ([b, w, g]: number[]) =>
    g && w ? (rtl ? -1 : 1) * wrap(-w, 0, b) : 0,
  );

  useEffect(() => {
    const wrapEl = wrapRef.current;
    const copyEl = copyRef.current;
    if (!wrapEl || !copyEl) return;
    const ro = new ResizeObserver(() => {
      const w = copyEl.offsetWidth;
      copyW.set(w);
      setCopies(w ? Math.max(2, Math.ceil(wrapEl.clientWidth / w) + 1) : 2);
    });
    ro.observe(wrapEl);
    ro.observe(copyEl);
    return () => ro.disconnect();
  }, [copyW]);

  const onHover = (on: boolean) => (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") setHovered(on);
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div
        ref={wrapRef}
        className="min-w-0 flex-1 overflow-hidden"
        onPointerEnter={onHover(true)}
        onPointerLeave={onHover(false)}
      >
        <motion.div className="flex w-max" style={{ x }}>
          {Array.from({ length: copies }, (_, i) => (
            <div
              key={i}
              ref={i === 0 ? copyRef : undefined}
              aria-hidden={i > 0 || undefined}
              className={cn("flex shrink-0 items-center", rowClassName)}
              // Gap lives inside each copy (incl. its end) so the loop seam never jumps.
              style={{ gap, paddingInlineEnd: gap }}
            >
              {children}
            </div>
          ))}
        </motion.div>
      </div>
      {enabled && (
        <button
          type="button"
          aria-pressed={paused}
          aria-label={pauseLabel ?? (rtl ? "إيقاف الشريط مؤقتًا" : "Pause ticker")}
          onClick={() => setPaused((p) => !p)}
          className="ms-4 me-[var(--container-padding)] grid size-11 shrink-0 place-items-center rounded-full border border-current/25 transition-colors duration-300 ease-brand hover:bg-current/10"
        >
          {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
        </button>
      )}
      {/* The frame loop only exists while the row can actually move. */}
      {enabled && inView && !paused && !hovered && (
        <MarqueeDriver baseX={baseX} copyW={copyW} speed={speed} />
      )}
    </div>
  );
}

function MarqueeDriver({
  baseX,
  copyW,
  speed,
}: {
  baseX: MotionValue<number>;
  copyW: MotionValue<number>;
  speed: number;
}) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (!copyW.get()) return;
    const f = boost.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    baseX.set(baseX.get() - dir.current * speed * (delta / 1000) * (1 + Math.abs(f)));
  });

  return null;
}
