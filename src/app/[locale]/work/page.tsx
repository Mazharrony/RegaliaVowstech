import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { work } from "@/content/work";
import { CTASection } from "@/components/sections/home/CTASection";
import { WorkFilter } from "@/components/work/WorkFilter";

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

  const items = work.map((w) => ({
    slug: w.slug,
    client: w.client,
    title: w.title,
    industry: w.industry,
    year: w.year,
    cover: w.cover,
    color: w.color,
    services: [...w.services],
  }));

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

      <WorkFilter work={items} />

      <CTASection />
    </>
  );
}
