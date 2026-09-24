import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubReveal } from "@/components/motion/ScrubReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";
import { serviceTone, toneClass, toneCycle } from "@/lib/tones";
import { getServices, type Service } from "@/content/services";
import { CTASection } from "@/components/sections/home/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const title = t("services");
  const description =
    "Production and creative services in Dubai — video production, corporate events, event branding, photography, brand identity and digital marketing across the UAE."
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services`,
      languages: { en: "/en/services", ar: "/ar/services", "x-default": "/en/services" },
    },
    openGraph: { title, description, url: `/${locale}/services`, locale: locale === "ar" ? "ar_AE" : "en_AE" },
    twitter: { title, description },
  };
}

export default async function ServicesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations("nav");
  const tIndex = await getTranslations("servicesIndex");
  const tModels = await getTranslations("models");
  const services = getServices(locale);
  const industries = tIndex.raw("industries") as string[];
  const contentAds = services.find((s) => s.slug === "content-ads");
  const toCard = (s: Service) => ({
    key: s.slug as string,
    href: `/services/${s.slug}`,
    number: s.number,
    title: s.title,
    tagline: s.tagline,
    image: s.image as string | undefined,
  });
  // Models sits at 05, between the primary services and content & ads.
  const cards = [
    ...services.filter((s) => s.slug !== "content-ads").map(toCard),
    { key: "models", href: "/models", number: "05", title: tModels("title"), tagline: tModels("body"), image: undefined },
    ...(contentAds ? [toCard(contentAds)] : []),
  ];

  return (
    <>
      <section className="container-x pb-12 pt-20 md:pb-24 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-8">{tNav("services")}</p>
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

      <section className="container-x pb-20 md:pb-28">
        <ul className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {cards.map((c, i) => {
            const feature = i === 0;
            return (
              <li key={c.href} className={feature ? "lg:col-span-2 lg:row-span-2" : undefined}>
                <ScrubReveal className="h-full" variant={feature ? "scale" : "rise"}>
                  <TiltCard className="h-full rounded-[var(--radius-xl)]" max={feature ? 3 : 6}>
                    <Link
                      href={c.href}
                      className={cn(
                        "tone-card group flex h-full flex-col rounded-[var(--radius-xl)]",
                        feature ? "min-h-[26rem]" : "min-h-[17rem] md:min-h-[19rem]",
                        toneClass(serviceTone(c.key)),
                      )}
                    >
                      {feature && c.image && (
                        <div className="relative min-h-56 flex-1 overflow-hidden">
                          <Image
                            src={c.image}
                            alt=""
                            fill
                            preload
                            sizes="(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className={cn("flex flex-col p-7 md:p-8", !feature && "flex-1")}>
                        <div className="flex items-start justify-between gap-4">
                          <span className="font-mono text-xs tracking-[0.18em] text-tone-ink-soft">
                            {c.number}
                          </span>
                          <ArrowUpRight
                            aria-hidden
                            className="h-6 w-6 shrink-0 transition-transform duration-300 ease-brand group-hover:-translate-y-1 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                          />
                        </div>
                        <h2
                          className={cn(
                            "mt-auto text-balance pt-10 font-serif leading-[1.02] tracking-tight",
                            feature ? "text-[length:var(--step-4)]" : "text-[length:var(--step-3)]",
                          )}
                        >
                          {c.title}
                        </h2>
                        <p className="mt-3 max-w-xl text-sm text-tone-ink-soft md:text-base">
                          {c.tagline}
                        </p>
                      </div>
                    </Link>
                  </TiltCard>
                </ScrubReveal>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-t hairline bg-[var(--color-bg-alt)]">
        <div className="container-x py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow mb-5 inline-flex items-center gap-2">
                  <span aria-hidden className="spectrum-rule" />
                  {tIndex("industriesEyebrow")}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="display-2 max-w-[16ch] text-balance">
                  {tIndex("industriesTitle")}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="lg:col-span-6">
              <p className="text-[var(--color-muted)] md:text-lg">
                {tIndex("industriesBody")}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ul className="mt-12 flex flex-wrap gap-2 md:mt-16 md:gap-3">
              {industries.map((label, i) => (
                <li
                  key={label}
                  className={cn("tone-chip md:min-h-10 md:px-5 md:text-[0.9rem]", toneClass(toneCycle(i % 6)))}
                >
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
