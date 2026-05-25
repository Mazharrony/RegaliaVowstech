"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easings } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function TextSplit({ text, className, delay = 0, as = "h1" }: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Tag = motion[as];

  if (reduce) {
    const Static = as;
    return <Static className={className}>{text}</Static>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some" }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.1em" }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: "0%", opacity: 1 },
            }}
            transition={{ duration: 0.9, ease: easings.out }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
