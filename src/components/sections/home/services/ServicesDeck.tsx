"use client";

import type { ReactNode } from "react";
import { useMotionValue } from "framer-motion";
import { ScrollTint } from "@/components/motion/ScrollTint";
import { StackCards } from "@/components/motion/StackCards";
import type { Tone } from "@/lib/tones";

/**
 * Client leaf for the home services section: the deck's stacking progress
 * drives the backdrop, so the wash shifts to each card's tone as it lands.
 */
export function ServicesDeck({
  tones,
  header,
  children,
}: {
  tones: Tone[];
  header: ReactNode;
  /** Flat array of cards, in the same order as `tones`. */
  children: ReactNode;
}) {
  const deckP = useMotionValue(0);

  return (
    <ScrollTint tones={tones} progress={deckP} innerClassName="section-pad">
      <div className="container-wide">
        {header}
        <StackCards radius="var(--radius-xl)" progress={deckP}>
          {children}
        </StackCards>
      </div>
    </ScrollTint>
  );
}
