import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { AedSymbol } from "@/components/icons/AedSymbol";
import { services, getService, getServices, type ServicePackage } from "@/content/services";
import { routing } from "@/i18n/routing";
import { getPhotosByCategory } from "@/content/gallery";
import { CorporateGallery } from "@/components/sections/CorporateGallery";
import { JsonLd, faqPageLd, serviceLd, breadcrumbLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getService(slug, locale);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: {
        en: `/en/services/${slug}`,
        ar: `/ar/services/${slug}`,
        "x-default": `/en/services/${slug}`,
      },
    },
    openGraph: {
      title: service.title,
      description: service.summary,
      url: `/${locale}/services/${slug}`,
      locale: locale === "ar" ? "ar_AE" : "en_AE",
    },
    twitter: { title: service.title, description: service.summary },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getService(slug, locale);
  if (!service) notFound();

  const tCommon = await getTranslations("common");
  const tPage = await getTranslations("servicePage");
  const tModels = await getTranslations("models");
  const localized = getServices(locale);
  const idx = localized.findIndex((s) => s.slug === slug);
  const next = localized[(idx + 1) % localized.length];

  const modelsBadge = tModels("eyebrow");
  const modelsCta = tModels("viewDetails");
  const tGallery = await getTranslations("gallery");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://regaliavowstech.com";

  return (
    <>
      <JsonLd
        data={serviceLd({
          name: service.title,
          description: service.summary,
          url: `${siteUrl}/${locale}/services/${slug}`,
        })}
      />
      <JsonLd data={faqPageLd(service.faqs)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: "Services", url: `${siteUrl}/${locale}/services` },
          { name: service.title, url: `${siteUrl}/${locale}/services/${slug}` },
        ])}
      />
      {/* Hero — full-bleed image behind the text */}
      <section className="relative isolate flex min-h-[72svh] flex-col justify-end overflow-hidden bg-[#0e0e0d] text-white md:min-h-[80svh]">
        <Image
          src={service.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Legibility scrim + brand tint */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,8,6,0.92) 0%, rgba(10,8,6,0.55) 52%, rgba(10,8,6,0.65) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 65% at 12% 100%, rgba(255,149,0,0.2), transparent 60%)",
          }}
        />

        <div className="container-x relative pb-14 pt-36 md:pb-20 md:pt-44">
          <Reveal>
            <Link
              href="/services"
              className="font-mono text-xs uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
            >
              ← {tCommon("allServices")}
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-10 inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-accent)]">
              <span>{service.number}</span>
              <span aria-hidden className="inline-block h-px w-8 bg-[var(--color-accent)]" />
              <span>{service.tagline}</span>
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <h1 className="display-1 mt-5 max-w-4xl text-balance text-white">
              {service.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-2xl text-lg text-white/85 md:text-xl">
              {service.summary}
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="btn btn-solid">
                {tCommon("startProject")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="#packages"
                className="btn border border-white/30 text-white transition-colors hover:bg-white/10"
              >
                {tPage("packages")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="border-t hairline">
        <div className="container-x py-20 md:py-28">
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4">{tPage("whatYouGet")}</p>
              <h2 className="display-3 text-balance">{tPage("deliverables")}</h2>
            </div>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {service.deliverables.map((d, i) => {
              const isModelsCard =
                (slug === "events-expo" || slug === "corporate-events") &&
                (d.name === "Models & Talent Services" ||
                  d.name === "خدمات الموديلز والمواهب");

              return (
                <Reveal
                  key={d.name}
                  delay={i * 0.04}
                  className={isModelsCard ? "sm:col-span-2 lg:col-span-2" : undefined}
                >
                  {isModelsCard ? (
                    <Link href="/models" className="group block h-full">
                      <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-ink)] bg-[var(--color-bg-alt)] transition-colors hover:bg-[var(--color-bg)]">
                        {d.image && (
                          <div className="relative aspect-[16/10] w-full overflow-hidden">
                            <Image
                              src={d.image}
                              alt={d.name}
                              fill
                              sizes="(min-width: 1024px) 420px, 100vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-7 md:p-8">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                              {String(i + 1).padStart(2, "0")}
                            </p>
                            <span className="inline-flex h-6 items-center rounded-full bg-[var(--color-accent)] px-2.5 text-[0.66rem] font-semibold tracking-[-0.005em] text-[var(--color-ink)]">
                              {modelsBadge}
                            </span>
                          </div>
                          <h3 className="mt-4 font-serif text-xl tracking-tight md:text-2xl">
                            {d.name}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                            {d.description}
                          </p>
                          <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                              {modelsCta}
                            </span>
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border surface-card transition-colors">
                      {d.image && (
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <Image
                            src={d.image}
                            alt={d.name}
                            fill
                            sizes="(min-width: 1024px) 420px, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-7 md:p-8">
                        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-4 font-serif text-xl tracking-tight md:text-2xl">
                          {d.name}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                          {d.description}
                        </p>
                      </div>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="border-t hairline bg-[var(--color-bg-alt)]">
        <div className="container-x py-20 md:py-28">
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4">{tPage("packages")}</p>
              <h2 className="display-3 text-balance">
                {tPage("packagesTitle")}
              </h2>
            </div>
            <p className="text-sm text-[var(--color-muted)] md:col-span-5 md:text-base">
              {tPage("packagesBody")}
            </p>
          </div>

          <div
            className={[
              "mt-12 grid gap-6 md:mt-16",
              service.packages.length === 1
                ? "max-w-xl"
                : service.packages.length === 2
                  ? "md:grid-cols-2"
                  : service.packages.length === 4
                    ? "md:grid-cols-2 lg:grid-cols-4"
                    : "md:grid-cols-3",
            ].join(" ")}
          >
            {service.packages.map((pkg, i) => (
              <Reveal key={pkg.tier} delay={i * 0.06}>
                <PackageCard pkg={pkg} t={tPage} />
              </Reveal>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-xs text-[var(--color-muted)] md:text-sm">
            {tPage("vatNote")}
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="border-t hairline">
        <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">{tPage("howItRuns")}</p>
            <h2 className="display-3">{tPage("process")}</h2>
          </div>
          <ol className="border-t hairline lg:col-span-8">
            {service.process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.05}>
                <li className="grid gap-3 border-b hairline py-7 md:grid-cols-12 md:gap-6">
                  <span className="font-mono text-sm text-[var(--color-accent)] md:col-span-2">
                    {p.step}
                  </span>
                  <h3 className="font-serif text-2xl tracking-tight md:col-span-4">
                    {p.title}
                  </h3>
                  <p className="text-[var(--color-muted)] md:col-span-6 md:text-lg">
                    {p.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t hairline">
        <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">{tPage("commonQuestions")}</p>
            <h2 className="display-3">{tPage("faq")}</h2>
          </div>
          <dl className="lg:col-span-8">
            {service.faqs.map((f) => (
              <Reveal key={f.q}>
                <div className="border-b hairline py-6">
                  <dt className="font-serif text-xl md:text-2xl">{f.q}</dt>
                  <dd className="mt-3 text-[var(--color-muted)] md:text-lg">
                    {f.a}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Photo gallery teaser — corporate-events only */}
      {slug === "corporate-events" && (
        <section className="border-t hairline">
          <div className="container-x py-20 md:py-28">
            <Reveal>
              <p className="eyebrow mb-4">{tGallery("teaserEyebrow")}</p>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="display-3 text-balance">{tGallery("teaserTitle")}</h2>
                <Link
                  href="/gallery"
                  className="btn btn-ink shrink-0"
                >
                  <span>{tGallery("teaserCta")}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 md:mt-14">
              <CorporateGallery photos={getPhotosByCategory("corporate")} limit={9} />
            </div>
            <Reveal delay={0.1} className="mt-8 text-center">
              <Link href="/gallery" className="btn btn-ink">
                <span>{tGallery("teaserCta")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}


      {/* Next service */}
      <section className="border-t hairline">
        <Link
          href={`/services/${next.slug}`}
          className="group block py-20 md:py-28"
        >
          <div className="container-x flex items-baseline justify-between gap-6">
            <div className="min-w-0 flex-1">
              <p className="eyebrow mb-4">{tCommon("nextService")}</p>
              <p className="display-2 text-balance transition-colors group-hover:text-[var(--color-accent)]">
                {next.title}
              </p>
            </div>
            <ArrowUpRight className="h-7 w-7 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-10 md:w-10" />
          </div>
        </Link>
      </section>
    </>
  );
}

function PackageCard({
  pkg,
  t,
}: {
  pkg: ServicePackage;
  t: (key: string, values?: Record<string, string | number>) => string;
}) {
  const isHighlight = !!pkg.highlight;
  const cadenceLabel =
    pkg.cadence === "month"
      ? t("perMonth")
      : pkg.cadence === "one-time"
        ? t("oneTime")
        : pkg.cadence === "project"
          ? t("perProject")
          : "";
  const hasPrice = !!pkg.priceFrom;

  return (
    <div
      className={[
        "group flex h-full flex-col rounded-[var(--radius-xl)] border p-7 transition-colors md:p-8",
        isHighlight
          ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-bg)]"
          : "surface-card text-[var(--color-ink)]",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <p
          className={[
            "font-mono text-[0.7rem] uppercase tracking-[0.22em]",
            isHighlight ? "text-white/70" : "text-[var(--color-muted)]",
          ].join(" ")}
        >
          {pkg.tier}
        </p>
        {isHighlight && (
          <span className="inline-flex h-6 items-center rounded-full bg-[var(--color-accent)] px-2.5 text-[0.66rem] font-semibold tracking-[-0.005em] text-[var(--color-ink)]">
            {t("mostPicked")}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-serif text-2xl tracking-tight md:text-3xl">
        {pkg.name}
      </h3>

      <p
        className={[
          "mt-3 text-sm md:text-base",
          isHighlight ? "text-white/80" : "text-[var(--color-muted)]",
        ].join(" ")}
      >
        {pkg.summary}
      </p>

      <div
        className={[
          "mt-7 border-t pt-6",
          isHighlight ? "border-white/20" : "border-[var(--color-line)]",
        ].join(" ")}
      >
        {hasPrice ? (
          <>
            <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
              <span
                className={[
                  "font-mono text-[0.65rem] uppercase tracking-[0.22em]",
                  isHighlight ? "text-white/70" : "text-[var(--color-muted)]",
                ].join(" ")}
              >
                {t("from")}
              </span>
              <AedSymbol
                className={[
                  "mb-1.5 h-5 w-5",
                  isHighlight ? "text-white" : "text-[var(--color-ink)]",
                ].join(" ")}
                aria-hidden="true"
              />
              <span className="font-serif text-3xl leading-none tracking-tight md:text-4xl">
                {pkg.priceFrom}
              </span>
              {cadenceLabel && (
                <span
                  className={[
                    "mb-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em]",
                    isHighlight ? "text-white/70" : "text-[var(--color-muted)]",
                  ].join(" ")}
                >
                  {cadenceLabel}
                </span>
              )}
            </div>
            {pkg.note && (
              <p
                className={[
                  "mt-2 text-xs",
                  isHighlight ? "text-white/70" : "text-[var(--color-muted)]",
                ].join(" ")}
              >
                {pkg.note}
              </p>
            )}
          </>
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl tracking-tight md:text-3xl">
              {t("onRequest")}
            </span>
            <span
              className={[
                "font-mono text-[0.7rem] uppercase tracking-[0.18em]",
                isHighlight ? "text-white/70" : "text-[var(--color-muted)]",
              ].join(" ")}
            >
              {t("scopedToBrief")}
            </span>
          </div>
        )}
      </div>

      <div className="mt-7 flex-1" />

      <Link
        href="/contact"
        className={[
          "btn mt-8 w-full justify-between",
          isHighlight ? "btn-solid" : "btn-ink",
        ].join(" ")}
      >
        {hasPrice ? t("startWith", { tier: pkg.tier }) : t("requestQuote")}
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
