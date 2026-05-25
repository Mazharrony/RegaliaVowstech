"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

export function Marquee({ children, speed = 40, className }: Props) {
  const reduce = useReducedMotion();
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex w-max gap-16"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        <div className="flex shrink-0 items-center gap-16">{children}</div>
        <div className="flex shrink-0 items-center gap-16" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
