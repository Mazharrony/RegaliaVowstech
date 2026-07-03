import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { insights } from "@/content/insights";
import { InsightsFilter } from "@/components/insight/InsightsFilter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const title = t("insights");
  const description =
    "Production and brand insights from Regalia Vows Tech — articles on video production, event branding, corporate photography and creative strategy in Dubai."
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/insights`,
      languages: { en: "/en/insights", ar: "/ar/insights", "x-default": "/en/insights" },
    },
    openGraph: { title, description, url: `/${locale}/insights`, locale: locale === "ar" ? "ar_AE" : "en_AE" },
    twitter: { title, description },
  };
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
                  className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-xl)]"
                  style={{ background: "linear-gradient(135deg,var(--color-surface-elevated) 0%,var(--color-surface-muted) 100%)" }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 transition-transform duration-1000 group-hover:scale-[1.03]"
                    style={{
                      background:
                        "radial-gradient(at 30% 30%, color-mix(in srgb, var(--color-accent) 28%, transparent), transparent 55%), radial-gradient(at 80% 80%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 60%)",
                    }}
                  />
                  <span className="absolute start-6 top-6 inline-flex h-7 items-center rounded-full bg-[var(--color-accent-tint)] px-3 text-[0.72rem] font-semibold tracking-[-0.005em] text-[var(--color-accent)]">
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
        <InsightsFilter
          posts={rest.map((p) => ({
            slug: p.slug,
            title: p.title,
            category: p.category,
            date: p.date,
            readMinutes: p.readMinutes,
          }))}
          startIndex={1}
        />
      </section>
    </>
  );
}
