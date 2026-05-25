import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { AedSymbol } from "@/components/icons/AedSymbol";
import { services, getService, getServices, type ServicePackage } from "@/content/services";
import { routing } from "@/i18n/routing";

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
  const localized = getServices(locale);
  const idx = localized.findIndex((s) => s.slug === slug);
  const next = localized[(idx + 1) % localized.length];

  return (
    <>
      {/* Hero */}
      <section className="container-x pb-12 pt-20 md:pb-20 md:pt-32">
        <Reveal>
          <Link
            href="/services"
            className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            ← {tCommon("allServices")}
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <Reveal delay={0.1} className="lg:col-span-1">
            <p className="font-mono text-xs text-[var(--color-muted)]">
              {service.number}
            </p>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-8">
            <h1 className="display-1 text-balance">{service.title}</h1>
            <p className="mt-8 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
              {service.summary}
            </p>
          </Reveal>
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

      {/* Deliverables */}
      <section className="border-t hairline">
        <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">{tPage("whatYouGet")}</p>
            <h2 className="display-3">{tPage("deliverables")}</h2>
          </div>
          <ul className="lg:col-span-8">
            {service.deliverables.map((d, i) => (
              <Reveal key={d} delay={i * 0.04}>
                <li className="flex items-baseline gap-6 border-b hairline py-5">
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg md:text-xl">{d}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="border-t hairline bg-[var(--color-bg-alt)]">
        <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">{tPage("howItRuns")}</p>
            <h2 className="display-3">{tPage("process")}</h2>
          </div>
          <div className="grid gap-6 lg:col-span-8 md:grid-cols-2">
            {service.process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06}>
                <div className="rounded-md border hairline bg-[var(--color-bg)] p-7">
                  <p className="font-mono text-xs text-[var(--color-muted)]">
                    {p.step}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl">{p.title}</h3>
                  <p className="mt-3 text-sm text-[var(--color-muted)] md:text-base">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
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
        "group flex h-full flex-col rounded-md border p-7 transition-colors md:p-8",
        isHighlight
          ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-bg)]"
          : "border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] hover:border-[var(--color-ink)]",
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
          <span className="rounded-full bg-[var(--color-accent)] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-bg)]">
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

      <ul className="mt-7 flex-1 space-y-3">
        {pkg.includes.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm md:text-base">
            <Check
              className={[
                "mt-1 h-3.5 w-3.5 shrink-0",
                isHighlight
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-ink)]",
              ].join(" ")}
              strokeWidth={2.5}
            />
            <span className={isHighlight ? "text-white/90" : "text-[var(--color-ink)]"}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={[
          "mt-8 inline-flex items-center justify-between gap-3 rounded-full px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] transition-colors",
          isHighlight
            ? "bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[var(--color-bg)] hover:text-[var(--color-ink)]"
            : "bg-[var(--color-ink)] text-[var(--color-bg)] hover:bg-[var(--color-accent)]",
        ].join(" ")}
      >
        {hasPrice ? t("startWith", { tier: pkg.tier }) : t("requestQuote")}
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
