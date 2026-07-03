import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { insights, getInsight, getRelatedInsights } from "@/content/insights";
import { routing } from "@/i18n/routing";
import { ReadingProgress } from "@/components/insight/ReadingProgress";
import { ShareButtons } from "@/components/insight/ShareButtons";
import { TocSidebar } from "@/components/insight/TocSidebar";
import { CTASection } from "@/components/sections/home/CTASection";
import { JsonLd, articleLd, breadcrumbLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    insights.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const p = getInsight(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: {
      canonical: `/${locale}/insights/${slug}`,
      languages: {
        en: `/en/insights/${slug}`,
        ar: `/ar/insights/${slug}`,
        "x-default": `/en/insights/${slug}`,
      },
    },
    openGraph: {
      title: p.title,
      description: p.excerpt,
      url: `/${locale}/insights/${slug}`,
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      type: "article",
      publishedTime: p.date,
    },
    twitter: { title: p.title, description: p.excerpt },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getInsight(slug);
  if (!post) notFound();
  const tNav = await getTranslations("nav");
  const t = await getTranslations("insightPage");

  const related = getRelatedInsights(slug, 3);
  const sections =
    post.sections && post.sections.length > 0
      ? post.sections
      : [
          {
            id: "overview",
            heading: post.title,
            paragraphs: post.body,
          },
        ];
  const tocItems = sections.map((s) => ({ id: s.id, heading: s.heading }));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://regaliavowstech.com";
  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === "ar" ? "ar-AE" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <article>
      <JsonLd
        data={articleLd({
          title: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: post.author,
          slug: post.slug,
          locale,
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: "Insights", url: `${siteUrl}/${locale}/insights` },
          { name: post.title, url: `${siteUrl}/${locale}/insights/${slug}` },
        ])}
      />
      <ReadingProgress />

      <header
        className="relative overflow-hidden text-[var(--color-bg)]"
        style={{ background: post.coverColor ?? "var(--color-fg)" }}
      >
        <div className="container-x pb-16 pt-20 md:pb-24 md:pt-32">
          <Reveal>
            <Link
              href="/insights"
              className="font-mono text-xs uppercase tracking-[0.18em] opacity-80 hover:opacity-100"
            >
              ← {tNav("insights")}
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="mt-10 font-mono text-xs uppercase tracking-[0.18em]"
              style={{ color: post.accentColor ?? "currentColor" }}
            >
              {post.category}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="display-1 mt-6 max-w-4xl text-balance">{post.title}</h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-10 max-w-2xl text-lg opacity-80 md:text-xl">{post.excerpt}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] opacity-80">
              {formattedDate} · {post.readMinutes} {t("readingTimeSuffix")} · {post.author}
            </p>
          </Reveal>
        </div>
      </header>

      <section className="border-b hairline">
        <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <TocSidebar items={tocItems} title={t("tocTitle")} />
          </aside>

          <div className="lg:col-span-7">
            {sections.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.04}>
                <section
                  id={s.id}
                  className="scroll-mt-28 border-b hairline py-10 first:pt-0 last:border-b-0"
                >
                  <h2 className="font-serif text-2xl md:text-4xl">{s.heading}</h2>
                  <div className="mt-6 space-y-6 text-lg leading-relaxed text-[var(--color-ink-soft)] md:text-xl">
                    {s.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}

            <div className="mt-12 grid gap-10 border-t hairline pt-10 md:grid-cols-2">
              {post.tags && post.tags.length > 0 && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {t("tagsEyebrow")}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border hairline px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-muted)]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {t("shareEyebrow")}
                </p>
                <div className="mt-4">
                  <ShareButtons
                    title={post.title}
                    labelCopy={t("shareCopy")}
                    labelCopied={t("shareCopied")}
                    labelTwitter={t("shareTwitter")}
                    labelLinkedin={t("shareLinkedin")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {post.authorBio && (
        <section className="border-b hairline bg-[var(--color-bg-alt)]">
          <div className="container-x grid gap-10 py-20 md:py-24 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">{t("authorEyebrow")}</p>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-8">
              <div className="flex items-start gap-6">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[var(--color-fg)] font-mono text-lg text-[var(--color-bg)]">
                  {post.author
                    .split(" ")
                    .map((s) => s.charAt(0))
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="font-serif text-2xl md:text-3xl">{post.author}</p>
                  {post.authorRole && (
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      {post.authorRole}
                    </p>
                  )}
                  <p className="mt-4 max-w-2xl text-[var(--color-muted)] md:text-lg">
                    {post.authorBio}
                  </p>
                </div>
              </div>
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
            <div className="grid gap-px bg-[var(--color-line)] md:grid-cols-3">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.06}>
                  <Link
                    href={`/insights/${r.slug}`}
                    className="group flex h-full flex-col gap-6 bg-[var(--color-bg)] p-8 transition-colors hover:bg-[var(--color-bg-alt)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      {r.category}
                    </p>
                    <h3 className="font-serif text-xl md:text-2xl">{r.title}</h3>
                    <p className="line-clamp-3 text-[var(--color-muted)]">{r.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between border-t hairline pt-4">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                        {r.readMinutes} {t("readingTimeSuffix")}
                      </span>
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </article>
  );
}
