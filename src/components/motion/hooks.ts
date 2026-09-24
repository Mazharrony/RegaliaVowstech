"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";
import { useLocale } from "next-intl";

/*
 * Shared contract for the scroll-motion kit: every component always renders
 * its scroll target and always binds its MotionValue styles, then multiplies
 * them by a gate. SSR and the first client render therefore show the neutral,
 * fully visible pose with identical markup — no hydration mismatch, and no-JS
 * visitors and crawlers see all content. Motion switches on after hydration.
 */

const noopSubscribe = () => () => {};

export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (cb: () => void) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    [query],
  );
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}

/**
 * True once hydrated, when the visitor hasn't asked for reduced motion and
 * `query` matches. Framer's own useReducedMotion is neither live nor equal
 * between server and client, so the kit never branches on it.
 */
export function useMotionEnabled(query = "all"): boolean {
  const hydrated = useHydrated();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const matches = useMediaQuery(query);
  return hydrated && !reduce && matches;
}

/**
 * Reduced-motion preference that is false on the server and the first client
 * render, so entrance components hydrate with the server's markup and only
 * then settle into their static pose. Replaces framer's useReducedMotion.
 */
export function useReducedMotionSafe(): boolean {
  const hydrated = useHydrated();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  return hydrated && reduce;
}

/** 0/1 MotionValue that transformers multiply by, so styles stay bound either way. */
export function useMotionGate(on: boolean): MotionValue<number> {
  const gate = useMotionValue(0);
  useEffect(() => {
    gate.set(on ? 1 : 0);
  }, [on, gate]);
  return gate;
}

/** SSR-consistent direction; never read document.dir during render. */
export function useIsRtl(): boolean {
  return useLocale() === "ar";
}

/** Document offset on the same basis framer uses (layout, ignoring transforms). */
export function docTop(el: HTMLElement): number {
  let y = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
  return y;
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
