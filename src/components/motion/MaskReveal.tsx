"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { easings } from "@/lib/utils";

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
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={initialFor(from)}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration, ease: easings.out, delay }}
      style={{ willChange: "clip-path" }}
    >
      {children}
    </motion.div>
  );
}
