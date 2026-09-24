import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ScrollLine } from "@/components/motion/ScrollLine";
import { cn } from "@/lib/utils";
import { SERVICE_TONES, serviceTone, toneClass, toneCycle, type Tone } from "@/lib/tones";
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
  const tone = serviceTone(slug);
  const nextTone = serviceTone(next.slug);

  const modelsAt =
    slug === "events-expo" || slug === "corporate-events"
      ? service.deliverables.findIndex(
          (d) => d.name === "Models & Talent Services" || d.name === "خدمات الموديلز والمواهب",
        )
      : -1;
  // Bento at lg (3 columns): the Models card is always 2 wide; widen the first
  // card (and the last, for a one-cell remainder) so the grid closes with no holes.
  const lgCells = service.deliverables.length + (modelsAt >= 0 ? 1 : 0);
  const isLgWide = (i: number) =>
    i === modelsAt ||
    (lgCells % 3 !== 0 && i === 0) ||
    (lgCells % 3 === 1 && i === service.deliverables.length - 1);
  // Anchored on the page's service hue, ≤ 6 tones per section. The Models card
  // keeps the Models hue it has everywhere else; the rest then cycle four tones
  // (an even count keeps jewel/light alternating) without it.
  const deliverableTone = (i: number): Tone =>
    i === modelsAt
      ? SERVICE_TONES.models
      : modelsAt >= 0
        ? toneCycle((i > modelsAt ? i - 1 : i) % 4, { anchor: tone, exclude: [SERVICE_TONES.models] })
        : toneCycle(i % 6, { anchor: tone });

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
      {/* Hero — full-bleed image behind the text, tinted in the service tone */}
      <section
        className={cn(
          "photo photo-plain relative isolate flex min-h-[72svh] flex-col justify-end overflow-hidden bg-[var(--ramp-7)] text-white md:min-h-[80svh]",
          toneClass(tone),
        )}
      >
        <Parallax media speed={-0.35} className="absolute inset-0">
          <Image src={service.image} alt="" fill preload sizes="100vw" className="object-cover" />
        </Parallax>
        {/* Legibility scrim + tone tint */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--ramp-7) 92%, transparent) 0%, color-mix(in srgb, var(--ramp-7) 55%, transparent) 52%, color-mix(in srgb, var(--ramp-7) 65%, transparent) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 rtl:-scale-x-100"
          style={{
            background:
              "radial-gradient(90% 65% at 12% 100%, color-mix(in srgb, var(--tone-base) 45%, transparent), transparent 62%)",
          }}
        />

        <div className="container-x relative pb-14 pt-36 md:pb-20 md:pt-44">
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/85 transition-colors hover:text-white"
          >
            {/* Unicode arrows don't mirror; flip it so "back" points back in RTL */}
            <span aria-hidden className="rtl:-scale-x-100">←</span>
            {tCommon("allServices")}
          </Link>
          {/* Tone bloom on the ramp-7 scrim: ≥ 7:1 for every service tone */}
          <p className="mt-8 inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-tone-bloom">
            <span>{service.number}</span>
            <span aria-hidden className="inline-block h-px w-8 bg-tone-bloom" />
            <span>{service.tagline}</span>
          </p>
          <h1 className="display-1 mt-5 max-w-4xl text-balance text-white">
            {service.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg text-white/85 md:text-xl">
            {service.summary}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn btn-solid">
              {tCommon("startProject")}
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
            <a
              href="#packages"
              className="btn border border-white/30 text-white transition-colors hover:bg-white/10"
            >
              {tPage("packages")}
            </a>
          </div>
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
          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-3">
            {service.deliverables.map((d, i) => {
              const isModelsCard = i === modelsAt;
              const wide = isLgWide(i);
              const cardClass = cn(
                "tone-card group flex h-full flex-col rounded-[var(--radius-xl)]",
                toneClass(deliverableTone(i)),
              );
              const body = (
                <>
                  {d.image && (
                    // Wide cards take a wider crop so their row stays level.
                    <div className={cn("relative aspect-[16/10] w-full overflow-hidden", wide && "lg:aspect-[21/9]")}>
                      <Image
                        src={d.image}
                        alt={d.name}
                        fill
                        sizes={
                          isModelsCard
                            ? "(min-width: 1024px) 880px, 100vw"
                            : wide
                              ? "(min-width: 1024px) 880px, (min-width: 640px) 50vw, 100vw"
                              : "(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
                        }
                        className="object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-tone-ink-soft">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      {isModelsCard && <span className="tone-badge">{modelsBadge}</span>}
                    </div>
                    <h3 className="mt-4 text-balance font-serif text-[length:var(--step-3)] leading-[1.05] tracking-tight">
                      {d.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-tone-ink-soft md:text-base">
                      {d.description}
                    </p>
                    {isModelsCard && (
                      <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-tone-ink-soft">
                          {modelsCta}
                        </span>
                        <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-brand group-hover:-translate-y-1 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                      </div>
                    )}
                  </div>
                </>
              );

              return (
                <Reveal
                  key={d.name}
                  delay={(i % 3) * 0.05}
                  className={cn(isModelsCard && "sm:col-span-2", wide && "lg:col-span-2")}
                >
                  {isModelsCard ? (
                    <Link href="/models" className={cardClass}>
                      {body}
                    </Link>
                  ) : (
                    <div className={cardClass}>{body}</div>
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
                <PackageCard pkg={pkg} t={tPage} tone={tone} />
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
          <div className={cn("relative lg:col-span-8", toneClass(tone))}>
            <ScrollLine className="absolute inset-y-0 start-0 w-0.5" />
            <ol className="border-t hairline">
              {service.process.map((p) => (
                <li key={p.step} className="grid gap-3 border-b hairline py-7 ps-7 md:grid-cols-12 md:gap-6 md:ps-10">
                  <span className="tone-text font-mono text-sm font-semibold md:col-span-2">
                    {p.step}
                  </span>
                  <h3 className="font-serif text-2xl tracking-tight md:col-span-4">
                    {p.title}
                  </h3>
                  <p className="text-[var(--color-muted)] md:col-span-6 md:text-lg">
                    {p.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
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
              <Reveal key={f.q} className="border-b hairline py-6">
                <dt className="font-serif text-xl md:text-2xl">{f.q}</dt>
                <dd className="mt-3 text-[var(--color-muted)] md:text-lg">
                  {f.a}
                </dd>
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
                  <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 md:mt-14">
              <CorporateGallery photos={getPhotosByCategory("corporate")} limit={9} />
            </div>
            <Reveal delay={0.1} className="mt-8 text-center">
              <Link href="/gallery" className="btn btn-ink">
                <span>{tGallery("teaserCta")}</span>
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}


      {/* Next service — previews its tone */}
      <section className={cn("border-t hairline", toneClass(nextTone))}>
        <Link
          href={`/services/${next.slug}`}
          className="group block py-20 transition-colors duration-300 ease-brand hover:bg-[color-mix(in_srgb,var(--tone-base)_9%,#fff)] md:py-28"
        >
          <div className="container-x flex items-baseline justify-between gap-6">
            <div className="min-w-0 flex-1">
              <p className="eyebrow mb-4 inline-flex items-center gap-3">
                <span aria-hidden className="tone-dot" />
                {tCommon("nextService")}
              </p>
              {/* --tone-text-from: the base on jewels, a burnt shade on light tones
                  (sunset) — ≥ 5.1:1 on the 9% wash for every service tone */}
              <p className="display-2 text-balance transition-colors duration-300 ease-brand group-hover:text-[var(--tone-text-from)]">
                {next.title}
              </p>
            </div>
            <ArrowUpRight className="h-7 w-7 shrink-0 text-[var(--tone-text-from)] transition-transform duration-300 ease-brand group-hover:-translate-y-1 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1 md:h-10 md:w-10" />
          </div>
        </Link>
      </section>
    </>
  );
}

function PackageCard({
  pkg,
  t,
  tone,
}: {
  pkg: ServicePackage;
  t: (key: string, values?: Record<string, string | number>) => string;
  tone: Tone;
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
      className={cn(
        // `!`: .surface-card's own radius (same layer, later) would win otherwise
        "flex h-full flex-col rounded-[var(--radius-xl)]! border p-7 md:p-8",
        isHighlight
          ? cn("tone-card tone-card-flip", toneClass(tone))
          : "surface-card text-[var(--color-ink)] transition-colors",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p
          className={[
            "font-mono text-[0.7rem] uppercase tracking-[0.22em]",
            isHighlight ? "text-tone-ink-soft" : "text-[var(--color-muted)]",
          ].join(" ")}
        >
          {pkg.tier}
        </p>
        {isHighlight && (
          <span className="tone-badge">{t("mostPicked")}</span>
        )}
      </div>

      <h3 className="mt-4 font-serif text-[length:var(--step-3)] leading-[1.05] tracking-tight">
        {pkg.name}
      </h3>

      <p
        className={[
          "mt-3 text-sm md:text-base",
          isHighlight ? "text-tone-ink-soft" : "text-[var(--color-muted)]",
        ].join(" ")}
      >
        {pkg.summary}
      </p>

      <div
        className={[
          "mt-7 border-t pt-6",
          isHighlight ? "border-[var(--tone-edge)]" : "border-[var(--color-line)]",
        ].join(" ")}
      >
        {hasPrice ? (
          <>
            <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
              <span
                className={[
                  "font-mono text-[0.65rem] uppercase tracking-[0.22em]",
                  isHighlight ? "text-tone-ink-soft" : "text-[var(--color-muted)]",
                ].join(" ")}
              >
                {t("from")}
              </span>
              <AedSymbol
                className={[
                  "mb-1.5 h-5 w-5",
                  isHighlight ? "text-tone-ink" : "text-[var(--color-ink)]",
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
                    isHighlight ? "text-tone-ink-soft" : "text-[var(--color-muted)]",
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
                  isHighlight ? "text-tone-ink-soft" : "text-[var(--color-muted)]",
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
                isHighlight ? "text-tone-ink-soft" : "text-[var(--color-muted)]",
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
        <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
      </Link>
    </div>
  );
}
