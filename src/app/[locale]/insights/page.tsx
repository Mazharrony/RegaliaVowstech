import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
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

  return (
    <>
      <section className="container-x pb-12 pt-20 md:pb-24 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-8">{tNav("insights")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display-1 max-w-5xl text-balance">
            Field notes from the studio.
          </h1>
        </Reveal>
      </section>

      <section className="border-t hairline">
        <ul className="container-x">
          {insights.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/insights/${p.slug}`}
                className="group flex flex-col gap-3 border-b hairline py-8 transition-colors hover:text-[var(--color-accent)] md:grid md:grid-cols-12 md:items-baseline md:gap-6 md:py-14"
              >
                <div className="flex items-center justify-between gap-4 md:contents">
                  <span className="font-mono text-xs text-[var(--color-muted)] md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
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
