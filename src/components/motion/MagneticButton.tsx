"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
};

export function MagneticButton({
  children,
  className,
  strength = 10,
  as = "button",
  href,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.8 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 will-change-transform",
        className
      )}
    >
      {children}
    </motion.div>
  );

  if (as === "a" && href) {
    return (
      <a href={href} onClick={onClick} className="inline-flex">
        {inner}
      </a>
    );
  }
  if (as === "button") {
    return (
      <button type="button" onClick={onClick} className="inline-flex">
        {inner}
      </button>
    );
  }
  return inner;
}
