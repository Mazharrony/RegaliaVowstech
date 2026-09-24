import { setRequestLocale, getTranslations } from "next-intl/server";
import { Compass, PenTool, Rocket, Search } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubReveal } from "@/components/motion/ScrubReveal";
import { StackCards } from "@/components/motion/StackCards";
import { CTASection } from "@/components/sections/home/CTASection";
import { cn } from "@/lib/utils";
import { toneClass, toneCycle } from "@/lib/tones";

const PHASE_ICONS = [Search, Compass, PenTool, Rocket];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const title = t("process");
  const description =
    "Our production process — discovery, strategy, production and delivery. How Regalia Vows Tech delivers brand films, events and creative projects in Dubai."
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/process`,
      languages: { en: "/en/process", ar: "/ar/process", "x-default": "/en/process" },
    },
    openGraph: { title, description, url: `/${locale}/process`, locale: locale === "ar" ? "ar_AE" : "en_AE" },
    twitter: { title, description },
  };
}

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations("nav");
  const t = await getTranslations("processPage");

  const phases = [1, 2, 3, 4].map((n) => ({
    n: String(n).padStart(2, "0"),
    Icon: PHASE_ICONS[n - 1],
    tone: toneCycle(n - 1),
    title: t(`phase${n}Title`),
    body: t(`phase${n}Body`),
    deliverables: [
      t(`phase${n}D1`),
      t(`phase${n}D2`),
      t(`phase${n}D3`),
      t(`phase${n}D4`),
    ],
  }));

  // Anchored past the phase deck's tones so the two sections don't echo.
  const engagements = [1, 2, 3].map((n) => ({
    tone: toneCycle(n - 1, { anchor: "magenta" }),
    title: t(`engagement${n}Title`),
    body: t(`engagement${n}Body`),
  }));

  const compareRows = t.raw("compareRows") as {
    label: string;
    project: string;
    retainer: string;
    sprint: string;
  }[];

  return (
    <>
      <section className="container-x pb-12 pt-20 md:pb-24 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-8">{tNav("process")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display-1 max-w-5xl text-balance">
            {t("headline")}
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
            {t("body")}
          </p>
        </Reveal>
      </section>

      <section className="border-t hairline">
        <div className="container-x py-20 md:py-28">
          <StackCards>
            {phases.map(({ n, Icon, tone, title, body, deliverables }) => (
              <article
                key={n}
                className={cn(
                  "tone-card flex flex-col gap-6 rounded-[var(--radius-xl)] p-6 md:min-h-[24rem] md:gap-8 md:p-10",
                  toneClass(tone),
                )}
              >
                <div className="flex items-start justify-between gap-6">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-tone-ink-soft">{n} / 04</p>
                  <span
                    aria-hidden
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-current/25 md:h-14 md:w-14"
                  >
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </span>
                </div>
                <div className="mt-auto grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
                  <div className="lg:col-span-7">
                    <h2 className="display-3">{title}</h2>
                    <p className="mt-4 text-tone-ink-soft md:text-lg">{body}</p>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="eyebrow mb-3">{t("deliverables")}</p>
                    <ul className="flex flex-wrap gap-2">
                      {deliverables.map((d) => (
                        <li key={d} className="tone-chip">{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </StackCards>
        </div>
      </section>

      <section className="border-t hairline">
        <div className="container-x py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow mb-5 inline-flex items-center gap-2">
                  <span aria-hidden className="spectrum-rule" />
                  {t("engagementEyebrow")}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="display-2 max-w-[16ch] text-balance">
                  {t("engagementTitle")}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="lg:col-span-6">
              <p className="text-[var(--color-muted)] md:text-lg">
                {t("engagementBody")}
              </p>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-6">
            {engagements.map((e, i) => (
              <li key={e.title} className={i === 0 ? "md:col-span-2" : undefined}>
                <ScrubReveal className="h-full" variant={i === 0 ? "scale" : "rise"}>
                  <div
                    className={cn(
                      "tone-card flex h-full flex-col gap-4 rounded-[var(--radius-xl)] p-7 md:p-10",
                      i === 0 && "md:min-h-[18rem] md:justify-end",
                      toneClass(e.tone),
                    )}
                  >
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-tone-ink-soft">
                      {String(i + 1).padStart(2, "0")} / 03
                    </span>
                    <h3
                      className={cn(
                        "font-serif tracking-tight",
                        i === 0 ? "text-[length:var(--step-4)]" : "text-[length:var(--step-3)]",
                      )}
                    >
                      {e.title}
                    </h3>
                    <p className={cn("text-tone-ink-soft", i === 0 && "max-w-2xl md:text-lg")}>{e.body}</p>
                  </div>
                </ScrubReveal>
              </li>
            ))}
          </ul>

          <Reveal>
            <div className="mt-20 md:mt-28">
              <p className="eyebrow mb-4">{t("compareEyebrow")}</p>
              <h3 className="display-3 max-w-2xl">{t("compareTitle")}</h3>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b hairline text-start">
                    <th
                      scope="col"
                      className="py-4 pe-4 text-start font-mono text-[0.7rem] font-normal uppercase tracking-[0.22em] text-[var(--color-muted)]"
                    >
                      {t("compareDimension")}
                    </th>
                    {engagements.map((e) => (
                      <th
                        key={e.title}
                        scope="col"
                        className="py-4 pe-4 text-start font-mono text-[0.7rem] font-normal uppercase tracking-[0.22em]"
                      >
                        <span className="inline-flex items-center gap-2">
                          <span aria-hidden className={cn("tone-dot", toneClass(e.tone))} />
                          {e.title}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.label} className="border-b hairline align-top">
                      <th
                        scope="row"
                        className="py-5 pe-4 text-start font-mono text-xs font-normal uppercase tracking-[0.18em] text-[var(--color-muted)]"
                      >
                        {row.label}
                      </th>
                      <td className="py-5 pe-4">{row.project}</td>
                      <td className="py-5 pe-4">{row.retainer}</td>
                      <td className="py-5 pe-4">{row.sprint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
