"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
};

export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.8,
  decimals = 0,
  className,
}: Props) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduce || !started) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to, duration, reduce]);

  return (
    <motion.span
      className={className}
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, margin: "-15% 0px" }}
    >
      {prefix}
      {decimals > 0
        ? value.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : Math.round(value).toLocaleString()}
      {suffix}
    </motion.span>
  );
}
