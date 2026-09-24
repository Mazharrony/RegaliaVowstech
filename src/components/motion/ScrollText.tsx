"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { clamp01, useMotionEnabled, useMotionGate } from "./hooks";

type ScrollOffset = NonNullable<NonNullable<Parameters<typeof useScroll>[0]>["offset"]>;

type Props = {
  text: string;
  as?: "p" | "h2" | "h3" | "blockquote";
  className?: string;
  offset?: ScrollOffset;
  /** Opacity of words not yet reached. */
  from?: number;
};

/**
 * A statement that lights up word by word as it scrolls through the viewport.
 * Words are inline spans (not inline-block) with real whitespace between them,
 * so screen readers and crawlers get one plain string and Arabic letters keep
 * joining within each word.
 */
export function ScrollText({ text, as = "p", className, offset = ["start 85%", "end 40%"], from = 0.15 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const gate = useMotionGate(useMotionEnabled());
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const parts = text.split(/(\s+)/);
  const tokens: { part: string; word: number }[] = [];
  let words = 0;
  for (const part of parts) {
    if (part === "") continue;
    tokens.push({ part, word: /^\s+$/.test(part) ? -1 : words++ });
  }

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {tokens.map(({ part, word }, i) =>
        word < 0 ? (
          part
        ) : (
          <Word key={i} index={word} count={words} progress={scrollYProgress} gate={gate} from={from}>
            {part}
          </Word>
        ),
      )}
    </Tag>
  );
}

function Word({
  children,
  index,
  count,
  progress,
  gate,
  from,
}: {
  children: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  gate: MotionValue<number>;
  from: number;
}) {
  const opacity = useTransform([progress, gate], ([p, g]: number[]) =>
    g ? from + (1 - from) * clamp01((p - index / count) / (1.5 / count)) : 1,
  );
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}
