"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LOCALES = ["en", "ar"] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const setLocale = (next: (typeof LOCALES)[number]) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "relative inline-flex items-center rounded-full p-0.5",
        "bg-[color-mix(in_srgb,var(--color-ink)_6%,transparent)]",
        "border border-[var(--color-line)]",
        isPending && "opacity-60"
      )}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            disabled={isPending}
            aria-pressed={active}
            className={cn(
              "relative z-10 inline-flex h-7 min-w-[34px] items-center justify-center rounded-full px-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.06em] transition-colors",
              active
                ? "text-[var(--color-ink)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            )}
          >
            {active && (
              <motion.span
                layoutId="locale-pill"
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-[var(--color-surface)] shadow-[var(--shadow-sm)]"
                transition={{ type: "spring", stiffness: 360, damping: 32 }}
              />
            )}
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
