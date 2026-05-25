"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === "en" ? "ar" : "en";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      className="font-mono text-xs uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-60 disabled:opacity-40"
      aria-label="Switch language"
    >
      {locale === "en" ? "AR" : "EN"}
    </button>
  );
}
