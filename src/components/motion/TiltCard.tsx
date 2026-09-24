"use client";

import { useCallback, useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { clamp01, useMotionEnabled } from "./hooks";

type Props = {
  children: ReactNode;
  /** Must include the wrapped card's radius so the glare clips to it. */
  className?: string;
  /** Maximum tilt in degrees. */
  max?: number;
  glare?: boolean;
};

const tiltSpring = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * Pointer-reactive 3D tilt with a cursor-following glare. Wraps a .tone-card
 * (the card's own hover `translate` composes with this `transform`). Inert on
 * touch, coarse pointers and reduced motion.
 */
export function TiltCard({ children, className, max = 6, glare = true }: Props) {
  const rect = useRef<DOMRect | null>(null);
  const enabled = useMotionEnabled("(hover: hover) and (pointer: fine)");

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), tiltSpring);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), tiltSpring);
  const glareOpacity = useSpring(hover, { stiffness: 200, damping: 30 });
  // Glare is 200% of the card, so ±50% of its own size reaches the card edges.
  const glareX = useTransform(px, (v) => `${(v - 0.5) * 50}%`);
  const glareY = useTransform(py, (v) => `${(v - 0.5) * 50}%`);

  // Scrolling under a hovered card moves it, so the cached rect only needs
  // invalidating while hovered.
  const invalidate = useCallback(() => {
    rect.current = null;
  }, []);
  useEffect(() => () => window.removeEventListener("scroll", invalidate), [invalidate]);

  const onEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled || e.pointerType !== "mouse") return;
    rect.current = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.willChange = "transform";
    window.addEventListener("scroll", invalidate, { passive: true });
    hover.set(1);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled || e.pointerType !== "mouse") return;
    // Cached on enter: measuring per move would include the tilt itself.
    const r = rect.current ?? (rect.current = e.currentTarget.getBoundingClientRect());
    px.set(clamp01((e.clientX - r.left) / r.width));
    py.set(clamp01((e.clientY - r.top) / r.height));
  };
  const onLeave = (e: PointerEvent<HTMLDivElement>) => {
    window.removeEventListener("scroll", invalidate);
    rect.current = null;
    e.currentTarget.style.willChange = "";
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  };

  return (
    <motion.div
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("relative", className)}
      // No perspective until tilt can happen, so inert cards ship no 3D layer.
      style={{ rotateX, rotateY, transformPerspective: enabled ? 900 : undefined }}
    >
      {children}
      {glare && (
        <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <motion.span
            className="absolute left-[-50%] top-[-50%] h-[200%] w-[200%] bg-[radial-gradient(closest-side,rgb(255_255_255/0.32),transparent)] mix-blend-soft-light"
            style={{ x: glareX, y: glareY, opacity: glareOpacity }}
          />
        </span>
      )}
    </motion.div>
  );
}
