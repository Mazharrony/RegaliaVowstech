"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { easings } from "@/lib/utils";
import type { ReactNode } from "react";
import { useReducedMotionSafe } from "./hooks";

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  ...props
}: RevealProps) {
  // Same markup on server and client; reduced motion settles to the visible
  // pose instantly after hydration (the SSR opacity:0 is never left behind).
  const reduce = useReducedMotionSafe();
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once, amount: "some" }}
      transition={reduce ? { duration: 0 } : { duration: 0.9, delay, ease: easings.out }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
