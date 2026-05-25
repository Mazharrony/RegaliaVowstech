import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/content/services";

export async function generateMetadata() {
  const t = await getTranslations("nav");
  return { title: t("services") };
}

export default async function ServicesIndexPage({
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
          <p className="eyebrow mb-8">{tNav("services")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display-1 max-w-5xl text-balance">
            Seven disciplines, working as one studio.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-[var(--color-muted)] md:text-lg">
            From a fresh identity to AI in production to the expo stand that
            wins the floor — we run the whole arc, and we run it tightly.
          </p>
        </Reveal>
      </section>

      <section className="border-t hairline">
        <ul className="container-x">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex flex-col gap-3 border-b hairline py-8 transition-colors hover:text-[var(--color-accent)] md:grid md:grid-cols-12 md:items-baseline md:gap-6 md:py-14"
              >
                <div className="flex items-center justify-between gap-4 md:contents">
                  <span className="font-mono text-xs text-[var(--color-muted)] md:col-span-1">
                    {s.number}
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:order-last md:col-span-1 md:justify-self-end" />
                </div>
                <span className="font-serif text-[clamp(1.6rem,5vw,1.8rem)] tracking-tight md:col-span-5 md:text-5xl md:leading-[0.95]">
                  {s.title}
                </span>
                <span className="text-sm text-[var(--color-muted)] md:col-span-5 md:text-base">
                  {s.tagline}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
