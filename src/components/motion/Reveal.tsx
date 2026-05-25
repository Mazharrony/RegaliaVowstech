"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { easings } from "@/lib/utils";
import type { ReactNode } from "react";

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
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: "some" }}
      transition={{ duration: 0.9, delay, ease: easings.out }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
