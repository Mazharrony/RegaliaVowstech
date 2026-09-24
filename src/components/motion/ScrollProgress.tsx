"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMotionEnabled, useMotionGate } from "./hooks";

/** Page-level reading progress: a 3px spectrum bar pinned above the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });
  const gate = useMotionGate(useMotionEnabled());
  // Reduced motion tracks the raw value — still informative, just no spring.
  const scaleX = useTransform([scrollYProgress, spring, gate], ([raw, s, g]: number[]) => (g ? s : raw));

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[image:var(--grad-spectrum)] rtl:origin-right print:hidden"
    />
  );
}
