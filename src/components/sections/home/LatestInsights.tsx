import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { insights } from "@/content/insights";

export function LatestInsights() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const items = insights.slice(0, 3);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "ar" ? "ar" : "en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <section className="section-pad">
      <div className="container-wide">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-20">
          <div>
            <Reveal>
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
                {t("insightsEyebrow")}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-1 max-w-2xl text-balance">{t("insightsTitle")}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 border-b hairline pb-2 font-mono text-[0.7rem] uppercase tracking-[0.22em]"
            >
              {tCommon("readMore")}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-10 border-t hairline pt-12 md:grid-cols-3 md:gap-8 md:pt-14">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                href={`/insights/${p.slug}`}
                className="group flex h-full flex-col gap-6"
              >
                <div className="flex items-center justify-between font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  <span>{p.category}</span>
                  <span>{p.readMinutes} min read</span>
                </div>
                <h3
                  className="font-serif text-balance tracking-tight transition-colors duration-500 group-hover:text-[var(--color-accent)]"
                  style={{ fontSize: "var(--step-3)", lineHeight: 1.1 }}
                >
                  {p.title}
                </h3>
                <p className="text-[var(--color-muted)]">{p.excerpt}</p>
                <div className="mt-auto flex items-center justify-between border-t hairline pt-5 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  <span>{fmt(p.date)}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
