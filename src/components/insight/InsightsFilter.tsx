"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type InsightItem = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readMinutes: number;
};

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "ar" ? "ar-AE" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function InsightsFilter({
  posts,
  startIndex = 0,
}: {
  posts: InsightItem[];
  startIndex?: number;
}) {
  const t = useTranslations("insightsIndex");
  const locale = useLocale();
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const counts = posts.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const filtered = useMemo(
    () => (category ? posts.filter((p) => p.category === category) : posts),
    [posts, category],
  );

  return (
    <section className="border-t hairline">
      <div className="container-x flex flex-col gap-6 py-8 md:py-10">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <p className="eyebrow inline-flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-px w-6 bg-[var(--color-accent)]"
            />
            {t("filterEyebrow")}
          </p>
          <ul className="flex flex-wrap gap-2">
            <li>
              <button
                type="button"
                onClick={() => setCategory(null)}
                aria-pressed={category === null}
                className={
                  category === null
                    ? "rounded-full bg-[var(--color-ink)] px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-bg)]"
                    : "rounded-full border hairline px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                }
              >
                {t("filterAll")} · {posts.length}
              </button>
            </li>
            {categories.map(([label, count]) => {
              const active = category === label;
              return (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => setCategory(active ? null : label)}
                    aria-pressed={active}
                    className={
                      active
                        ? "rounded-full bg-[var(--color-ink)] px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-bg)]"
                        : "rounded-full border hairline px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                    }
                  >
                    {label} · {count}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="container-x py-20 text-center">
          <h2 className="font-serif text-3xl">{t("emptyTitle")}</h2>
          <p className="mt-4 text-[var(--color-muted)]">{t("emptyBody")}</p>
          <button
            type="button"
            onClick={() => setCategory(null)}
            className="mt-6 rounded-full border hairline px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)]"
          >
            {t("emptyReset")}
          </button>
        </div>
      ) : (
        <ul className="container-x">
          {filtered.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/insights/${p.slug}`}
                className="group flex flex-col gap-3 border-b hairline border-t py-8 transition-colors hover:text-[var(--color-accent)] md:grid md:grid-cols-12 md:items-baseline md:gap-6 md:py-14"
              >
                <div className="flex items-center justify-between gap-4 md:contents">
                  <span className="font-mono text-xs text-[var(--color-muted)] md:col-span-1">
                    {String(i + startIndex + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:order-last md:col-span-1 md:justify-self-end" />
                </div>
                <div className="md:col-span-7">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {p.category}
                  </p>
                  <p className="mt-3 font-serif text-[clamp(1.5rem,4.8vw,1.75rem)] tracking-tight md:text-4xl">
                    {p.title}
                  </p>
                </div>
                <span className="text-sm text-[var(--color-muted)] md:col-span-3">
                  {formatDate(p.date, locale)} · {p.readMinutes} min
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
