import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { work } from "@/content/work";

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

  return (
    <>
      <section className="container-x pb-12 pt-20 md:pb-24 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-8">{tNav("work")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display-1 max-w-5xl text-balance">
            Recent launches, in their own words.
          </h1>
        </Reveal>
      </section>

      <section className="container-x grid gap-10 pb-24 md:grid-cols-2 md:pb-32">
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
    </>
  );
}
