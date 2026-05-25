import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { insights } from "@/content/insights";

export async function generateMetadata() {
  const t = await getTranslations("nav");
  return { title: t("insights") };
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "ar" ? "ar-AE" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations("nav");
  const tIndex = await getTranslations("insightsIndex");

  const [featured, ...rest] = insights;

  return (
    <>
      <section className="container-x pb-12 pt-20 md:pb-24 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-8">{tNav("insights")}</p>
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

      {featured ? (
        <section className="border-t hairline bg-[var(--color-bg-alt)]">
          <div className="container-x py-16 md:py-24">
            <Reveal>
              <p className="eyebrow mb-8 inline-flex items-center gap-2">
                <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
                {tIndex("featuredEyebrow")}
              </p>
            </Reveal>
            <Link
              href={`/insights/${featured.slug}`}
              className="group grid gap-10 lg:grid-cols-12 lg:items-end"
            >
              <MaskReveal className="lg:col-span-7">
                <div
                  className="relative aspect-[16/10] overflow-hidden rounded-md"
                  style={{ background: "linear-gradient(135deg,#1a1a1a 0%,#2a1f14 100%)" }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 transition-transform duration-1000 group-hover:scale-[1.03]"
                    style={{
                      background:
                        "radial-gradient(at 30% 30%, rgba(184,137,58,0.28), transparent 55%), radial-gradient(at 80% 80%, rgba(184,137,58,0.16), transparent 60%)",
                    }}
                  />
                  <span className="absolute start-6 top-6 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    {featured.category}
                  </span>
                </div>
              </MaskReveal>
              <Reveal delay={0.1} className="lg:col-span-5">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  {formatDate(featured.date, locale)} · {featured.readMinutes} min
                </p>
                <h2 className="display-2 mt-5 text-balance transition-colors group-hover:text-[var(--color-accent)]">
                  {featured.title}
                </h2>
                <p className="mt-6 text-[var(--color-muted)] md:text-lg">
                  {featured.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 border-b hairline pb-2 font-mono text-[0.7rem] uppercase tracking-[0.22em]">
                  {tIndex("readArticle")}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Reveal>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="border-t hairline">
        <div className="container-x py-8 md:py-10">
          <p className="eyebrow inline-flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-[var(--color-accent)]" />
            {tIndex("allArticles")} · {insights.length}
          </p>
        </div>
        <ul className="container-x">
          {rest.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/insights/${p.slug}`}
                className="group flex flex-col gap-3 border-b hairline border-t py-8 transition-colors hover:text-[var(--color-accent)] md:grid md:grid-cols-12 md:items-baseline md:gap-6 md:py-14"
              >
                <div className="flex items-center justify-between gap-4 md:contents">
                  <span className="font-mono text-xs text-[var(--color-muted)] md:col-span-1">
                    {String(i + 2).padStart(2, "0")}
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
      </section>
    </>
  );
}
