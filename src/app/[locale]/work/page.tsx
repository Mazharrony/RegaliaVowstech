import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { work } from "@/content/work";
import { CTASection } from "@/components/sections/home/CTASection";

export async function generateMetadata() {
  const t = await getTranslations("nav");
  return { title: t("work") };
}

export default async function WorkIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations("nav");
  const tIndex = await getTranslations("workIndex");

  const industryCounts = work.reduce<Record<string, number>>((acc, w) => {
    acc[w.industry] = (acc[w.industry] ?? 0) + 1;
    return acc;
  }, {});
  const industries = Object.entries(industryCounts).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <section className="container-x pb-12 pt-20 md:pb-24 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-8">{tNav("work")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display-1 max-w-5xl text-balance">
            {tIndex("headline")}
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-[var(--color-muted)] md:text-lg">
            {tIndex("body")}
          </p>
        </Reveal>
      </section>

      <section className="border-t hairline">
        <div className="container-x flex flex-wrap items-center gap-x-6 gap-y-4 py-8 md:py-10">
          <p className="eyebrow inline-flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-[var(--color-accent)]" />
            {tIndex("industriesEyebrow")}
          </p>
          <ul className="flex flex-wrap gap-2">
            <li className="rounded-full bg-[var(--color-ink)] px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-bg)]">
              {tIndex("industriesAll")} · {work.length}
            </li>
            {industries.map(([label, count]) => (
              <li
                key={label}
                className="rounded-full border hairline px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-muted)]"
              >
                {label} · {count}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x grid gap-10 border-t hairline pb-24 pt-12 md:grid-cols-2 md:pb-32 md:pt-16">
        {work.map((w, i) => (
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
      </section>

      <CTASection />
    </>
  );
}
