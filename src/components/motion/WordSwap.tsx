"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easings } from "@/lib/utils";

type Props = {
  words: string[];
  interval?: number;
  className?: string;
  accent?: boolean;
};

export function WordSwap({ words, interval = 2600, className, accent = false }: Props) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);

  if (reduce) {
    return (
      <span className={className} style={{ color: accent ? "var(--color-accent)" : undefined }}>
        {words[0]}
      </span>
    );
  }

  return (
    <span className="word-swap relative align-bottom" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{ duration: 0.85, ease: easings.out }}
          className={className}
          style={{ color: accent ? "var(--color-accent)" : undefined, display: "inline-block" }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
