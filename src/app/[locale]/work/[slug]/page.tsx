import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { work, getCase } from "@/content/work";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    work.map((w) => ({ locale, slug: w.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return { title: `${c.client} — ${c.title}`, description: c.summary };
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
  const idx = work.findIndex((w) => w.slug === slug);
  const next = work[(idx + 1) % work.length];

  return (
    <>
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
                  {s.replace(/-/g, " ")}
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

      {[
        { eyebrow: "Challenge", body: c.challenge },
        { eyebrow: "Approach", body: c.approach },
        { eyebrow: "Outcome", body: c.outcome },
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
