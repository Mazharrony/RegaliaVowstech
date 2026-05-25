import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { insights, getInsight } from "@/content/insights";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    insights.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getInsight(slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt };
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

  return (
    <article>
      <header className="container-x pb-12 pt-20 md:pb-20 md:pt-32">
        <Reveal>
          <Link
            href="/insights"
            className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            ← {tNav("insights")}
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow mt-10">{post.category}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="display-1 mt-6 max-w-4xl text-balance">
            {post.title}
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            {new Date(post.date).toLocaleDateString(locale === "ar" ? "ar-AE" : "en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readMinutes} min · {post.author}
          </p>
        </Reveal>
      </header>

      <section className="border-t hairline">
        <div className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-12">
          <div className="prose-editorial space-y-8 text-lg leading-relaxed text-[var(--color-ink-soft)] lg:col-span-8 lg:col-start-3 md:text-xl">
            {post.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
