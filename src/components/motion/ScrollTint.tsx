"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { toneClass, type Tone } from "@/lib/tones";
import { clamp01, useMotionEnabled, useMotionGate } from "./hooks";

type Props = {
  tones: Tone[];
  /** Drive from outside (e.g. StackCards' progress); defaults to this section's scroll. */
  progress?: MotionValue<number>;
  className?: string;
  /** Padding belongs here: sticky children are bounded by the root's content box. */
  innerClassName?: string;
  children: ReactNode;
};

/**
 * Section whose background cross-fades through light washes of its tones as
 * it scrolls. Layers fade in opacity (compositor-only) rather than
 * interpolating a colour, and the backdrop is one viewport tall and sticky,
 * not section-tall. Only tracks its own scroll when no `progress` is given.
 */
export function ScrollTint({ progress, ...rest }: Props) {
  return progress ? <TintSection {...rest} progress={progress} /> : <SelfDrivenTint {...rest} />;
}

function SelfDrivenTint(props: Omit<Props, "progress">) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return <TintSection {...props} rootRef={ref} progress={scrollYProgress} />;
}

function TintSection({
  tones,
  progress,
  rootRef,
  className,
  innerClassName,
  children,
}: Omit<Props, "progress"> & { progress: MotionValue<number>; rootRef?: RefObject<HTMLDivElement | null> }) {
  const gate = useMotionGate(useMotionEnabled());

  return (
    <div ref={rootRef} className={cn("relative isolate overflow-clip", className)}>
      {/* lvh, not svh: once mobile toolbars collapse, an svh backdrop leaves an untinted strip */}
      <div aria-hidden className="pointer-events-none sticky top-0 -z-10 -mb-[100lvh] h-[100lvh]">
        {tones.map((tone, i) => (
          <TintLayer key={i} tone={tone} index={i} count={tones.length} progress={progress} gate={gate} />
        ))}
      </div>
      <div className={innerClassName}>{children}</div>
    </div>
  );
}

function TintLayer({
  tone,
  index,
  count,
  progress,
  gate,
}: {
  tone: Tone;
  index: number;
  count: number;
  progress: MotionValue<number>;
  gate: MotionValue<number>;
}) {
  const opacity = useTransform([progress, gate], ([v, g]: number[]) => {
    if (index === 0) return 1;
    if (!g) return 0;
    const a = (index - 0.6) / (count - 1);
    const b = (index - 0.1) / (count - 1);
    return clamp01((v - a) / (b - a));
  });
  return (
    <motion.div
      className={cn("scroll-tint-layer absolute inset-0", toneClass(tone))}
      style={{ opacity, willChange: index ? "opacity" : undefined }}
    />
  );
}
