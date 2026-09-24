"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { easings } from "@/lib/utils";
import { useReducedMotionSafe } from "./hooks";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  from?: "bottom" | "top" | "left" | "right";
};

const initialFor = (from: Props["from"]) => {
  switch (from) {
    case "top": return { clipPath: "inset(0 0 100% 0)" };
    case "left": return { clipPath: "inset(0 100% 0 0)" };
    case "right": return { clipPath: "inset(0 0 0 100%)" };
    default: return { clipPath: "inset(100% 0 0 0)" };
  }
};

export function MaskReveal({
  children,
  className,
  delay = 0,
  duration = 1.1,
  from = "bottom",
}: Props) {
  // Same element on server and client; reduced motion opens the mask
  // instantly after hydration instead of swapping the tree.
  const reduce = useReducedMotionSafe();
  return (
    <motion.div
      className={className}
      initial={initialFor(from)}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      animate={reduce ? { clipPath: "inset(0 0 0 0)" } : undefined}
      viewport={{ once: true, amount: "some" }}
      transition={reduce ? { duration: 0 } : { duration, ease: easings.out, delay }}
      style={{ willChange: reduce ? undefined : "clip-path" }}
    >
      {children}
    </motion.div>
  );
}
