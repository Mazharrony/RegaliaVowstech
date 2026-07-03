import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { work, getCase, getRelatedCases } from "@/content/work";
import { routing } from "@/i18n/routing";
import { JsonLd, caseStudyLd, breadcrumbLd, videoObjectLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    work.map((w) => ({ locale, slug: w.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const c = getCase(slug);
  if (!c) return {};
  const title = `${c.client} — ${c.title}`;
  return {
    title,
    description: c.summary,
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: {
        en: `/en/work/${slug}`,
        ar: `/ar/work/${slug}`,
        "x-default": `/en/work/${slug}`,
      },
    },
    openGraph: {
      title,
      description: c.summary,
      url: `/${locale}/work/${slug}`,
      locale: locale === "ar" ? "ar_AE" : "en_AE",
    },
    twitter: { title, description: c.summary },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const c = getCase(slug);
  if (!c) notFound();
  const tCommon = await getTranslations("common");
  const t = await getTranslations("casePage");
  const idx = work.findIndex((w) => w.slug === slug);
  const next = work[(idx + 1) % work.length];
  const related = getRelatedCases(slug, 2);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://regaliavowstech.com";

  return (
    <>
      <JsonLd
        data={caseStudyLd({
          title: c.title,
          description: c.summary,
          client: c.client,
          year: c.year,
          slug: c.slug,
          locale,
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: "Work", url: `${siteUrl}/${locale}/work` },
          { name: c.client, url: `${siteUrl}/${locale}/work/${slug}` },
        ])}
      />
      <JsonLd
        data={videoObjectLd({
          name: `${c.client} — ${c.title}`,
          description: c.summary,
          thumbnailUrl: `${siteUrl}/media/Corporate/coreporate81.JPEG`,
          uploadDate: `${c.year}-01-01`,
          url: `${siteUrl}/${locale}/work/${slug}`,
        })}
      />
      <section
        className="relative overflow-hidden text-[var(--color-bg)]"
        style={{ background: c.cover }}
      >
        <div className="container-x grid gap-10 py-20 md:py-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-2">
            <p
              className="font-mono text-xs uppercase tracking-[0.18em]"
              style={{ color: c.color }}
            >
              {c.year}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-10">
            <p
              className="font-mono text-xs uppercase tracking-[0.18em]"
              style={{ color: c.color }}
            >
              {c.client} · {c.industry}
            </p>
            <h1 className="display-1 mt-6 text-balance">{c.title}</h1>
            <p className="mt-8 max-w-2xl text-lg opacity-80 md:text-xl">
              {c.summary}
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              {c.services.map((s) => (
                <Link
                  key={s}
                  href={`/services/${s}`}
                  className="rounded-full border border-white/30 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-[var(--color-ink)]"
                >
                  {tCommon(`serviceTags.${s}`)}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y hairline bg-[var(--color-bg-alt)]">
        <div className="container-x grid gap-8 py-12 md:grid-cols-3 md:py-16">
          {c.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.05}>
              <p className="display-2">{m.value}</p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                {m.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-b hairline">
        <div className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{t("projectMetaEyebrow")}</p>
          </Reveal>
          <div className="lg:col-span-8">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3">
              <Reveal>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {t("metaYear")}
                </dt>
                <dd className="mt-2 font-serif text-xl md:text-2xl">{c.year}</dd>
              </Reveal>
              <Reveal delay={0.04}>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {t("metaIndustry")}
                </dt>
                <dd className="mt-2 font-serif text-xl md:text-2xl">{c.industry}</dd>
              </Reveal>
              {c.duration && (
                <Reveal delay={0.08}>
                  <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {t("metaDuration")}
                  </dt>
                  <dd className="mt-2 font-serif text-xl md:text-2xl">{c.duration}</dd>
                </Reveal>
              )}
              {c.teamSize && (
                <Reveal delay={0.12}>
                  <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {t("metaTeam")}
                  </dt>
                  <dd className="mt-2 font-serif text-xl md:text-2xl">{c.teamSize}</dd>
                </Reveal>
              )}
              {c.location && (
                <Reveal delay={0.16}>
                  <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {t("metaLocation")}
                  </dt>
                  <dd className="mt-2 font-serif text-xl md:text-2xl">{c.location}</dd>
                </Reveal>
              )}
            </dl>
            {c.stack && c.stack.length > 0 && (
              <Reveal delay={0.2}>
                <div className="mt-10 border-t hairline pt-8">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {t("stackEyebrow")}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {c.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border hairline px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-muted)]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {[
        { eyebrow: t("challengeEyebrow"), body: c.challenge },
        { eyebrow: t("approachEyebrow"), body: c.approach },
        { eyebrow: t("outcomeEyebrow"), body: c.outcome },
      ].map((b) => (
        <section key={b.eyebrow} className="border-b hairline">
          <div className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">{b.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <p className="display-3 text-balance">{b.body}</p>
            </Reveal>
          </div>
        </section>
      ))}

      {c.testimonial && (
        <section className="border-b hairline bg-[var(--color-bg-alt)]">
          <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">{t("quoteEyebrow")}</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <figure>
                <blockquote className="font-serif text-2xl leading-snug md:text-4xl">
                  <span aria-hidden className="mr-1 text-[var(--color-muted)]">“</span>
                  {c.testimonial.quote}
                  <span aria-hidden className="ml-1 text-[var(--color-muted)]">”</span>
                </blockquote>
                <figcaption className="mt-8 border-t hairline pt-6">
                  <p className="font-medium">{c.testimonial.author}</p>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {c.testimonial.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-b hairline">
          <div className="container-x py-20 md:py-28">
            <Reveal>
              <p className="eyebrow mb-4">{t("relatedEyebrow")}</p>
              <h2 className="display-3 mb-12 max-w-2xl">{t("relatedTitle")}</h2>
            </Reveal>
            <div className="grid gap-px bg-[var(--color-line)] md:grid-cols-2">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.06}>
                  <Link
                    href={`/work/${r.slug}`}
                    className="group flex h-full flex-col gap-6 bg-[var(--color-bg)] p-8 transition-colors hover:bg-[var(--color-bg-alt)] md:p-10"
                  >
                    <div
                      aria-hidden
                      className="aspect-[16/10] w-full"
                      style={{ background: r.cover }}
                    />
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                          {r.client} · {r.industry}
                        </p>
                        <h3 className="mt-3 font-serif text-2xl md:text-3xl">{r.title}</h3>
                      </div>
                      <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section>
        <Link href={`/work/${next.slug}`} className="group block py-20 md:py-28">
          <div className="container-x flex items-baseline justify-between gap-6">
            <div className="min-w-0 flex-1">
              <p className="eyebrow mb-4">{tCommon("nextCase")}</p>
              <p className="display-2 text-balance transition-colors group-hover:text-[var(--color-accent)]">
                {next.client} — {next.title}
              </p>
            </div>
            <ArrowUpRight className="h-7 w-7 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-10 md:w-10" />
          </div>
        </Link>
      </section>
    </>
  );
}
