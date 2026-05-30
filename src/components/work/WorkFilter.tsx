"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";

type WorkItem = {
  slug: string;
  client: string;
  title: string;
  industry: string;
  year: number;
  cover: string;
  color: string;
  services: string[];
};

type Sort = "newest" | "oldest";

export function WorkFilter({ work }: { work: WorkItem[] }) {
  const t = useTranslations("workIndex");
  const [industry, setIndustry] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [sort, setSort] = useState<Sort>("newest");

  const industries = useMemo(() => {
    const counts = work.reduce<Record<string, number>>((acc, w) => {
      acc[w.industry] = (acc[w.industry] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [work]);

  const years = useMemo(
    () =>
      Array.from(new Set(work.map((w) => w.year))).sort((a, b) => b - a),
    [work],
  );

  const filtered = useMemo(() => {
    const list = work.filter(
      (w) =>
        (!industry || w.industry === industry) &&
        (!year || w.year === year),
    );
    list.sort((a, b) =>
      sort === "newest" ? b.year - a.year : a.year - b.year,
    );
    return list;
  }, [work, industry, year, sort]);

  const reset = () => {
    setIndustry(null);
    setYear(null);
    setSort("newest");
  };

  return (
    <>
      <section className="border-t hairline">
        <div className="container-x flex flex-col gap-6 py-8 md:py-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <p className="eyebrow inline-flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-px w-6 bg-[var(--color-accent)]"
              />
              {t("industriesEyebrow")}
            </p>
            <ul className="flex flex-wrap gap-2">
              <li>
                <button
                  type="button"
                  onClick={() => setIndustry(null)}
                  aria-pressed={industry === null}
                  className={
                    industry === null
                      ? "inline-flex h-8 items-center rounded-full bg-[var(--color-ink)] px-3.5 text-[0.75rem] font-semibold tracking-[-0.005em] text-[var(--color-bg)]"
                      : "inline-flex h-8 items-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface-muted)] px-3.5 text-[0.75rem] font-medium tracking-[-0.005em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                  }
                >
                  {t("industriesAll")} · {work.length}
                </button>
              </li>
              {industries.map(([label, count]) => {
                const active = industry === label;
                return (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => setIndustry(active ? null : label)}
                      aria-pressed={active}
                      className={
                        active
                          ? "inline-flex h-8 items-center rounded-full bg-[var(--color-ink)] px-3.5 text-[0.75rem] font-semibold tracking-[-0.005em] text-[var(--color-bg)]"
                          : "inline-flex h-8 items-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface-muted)] px-3.5 text-[0.75rem] font-medium tracking-[-0.005em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                      }
                    >
                      {label} · {count}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <label className="flex items-center gap-3">
              <span className="eyebrow">{t("yearsEyebrow")}</span>
              <select
                value={year ?? ""}
                onChange={(e) =>
                  setYear(e.target.value ? Number(e.target.value) : null)
                }
                className="border-b hairline bg-transparent py-1 font-mono text-xs uppercase tracking-[0.18em] focus:outline-none focus-visible:border-[var(--color-fg)]"
              >
                <option value="">{t("yearsAll")}</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-3">
              <span className="eyebrow">{t("sortEyebrow")}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="border-b hairline bg-transparent py-1 font-mono text-xs uppercase tracking-[0.18em] focus:outline-none focus-visible:border-[var(--color-fg)]"
              >
                <option value="newest">{t("sortNewest")}</option>
                <option value="oldest">{t("sortOldest")}</option>
              </select>
            </label>
            <p
              className="ms-auto font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]"
              aria-live="polite"
            >
              {t("resultsCount", { count: filtered.length })}
            </p>
          </div>
        </div>
      </section>

      <section className="container-x border-t hairline pb-24 pt-12 md:pb-32 md:pt-16">
        {filtered.length === 0 ? (
          <div className="mx-auto max-w-md py-20 text-center">
            <h2 className="font-serif text-3xl">{t("emptyTitle")}</h2>
            <p className="mt-4 text-[var(--color-muted)]">{t("emptyBody")}</p>
            <button
              type="button"
              onClick={reset}
              className="btn-ios btn-ios-secondary btn-ios-sm mt-6"
            >
              {t("emptyReset")}
            </button>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2">
            {filtered.map((w, i) => (
              <Reveal key={w.slug} delay={(i % 2) * 0.05}>
                <Link href={`/work/${w.slug}`} className="group block">
                  <div
                    className="relative aspect-[5/4] overflow-hidden rounded-md"
                    style={{ background: w.cover }}
                  >
                    <div className="absolute inset-0 flex items-end p-6 md:p-8">
                      <div className="flex w-full items-end justify-between gap-4 text-[var(--color-bg)]">
                        <div>
                          <p
                            className="font-mono text-[0.7rem] uppercase tracking-[0.18em]"
                            style={{ color: w.color }}
                          >
                            {w.client} · {w.year}
                          </p>
                          <p className="mt-2 font-serif text-2xl text-balance md:text-3xl">
                            {w.title}
                          </p>
                        </div>
                        <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      {w.industry}
                    </span>
                    {w.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border hairline px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-muted)]"
                      >
                        {s.replace(/-/g, " ")}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
