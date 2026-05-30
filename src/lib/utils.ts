import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const easings = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  /** Apple standard easing — for hover, press, micro-interactions */
  apple: [0.32, 0.72, 0, 1] as const,
  /** Apple entrance easing — for reveal/scroll-in animations */
  appleEntrance: [0.16, 1, 0.3, 1] as const,
};

export const appleSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
  mass: 0.8,
};
