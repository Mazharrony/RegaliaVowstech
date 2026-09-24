import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollLine } from "@/components/motion/ScrollLine";
import { StackCards } from "@/components/motion/StackCards";
import { TiltCard } from "@/components/motion/TiltCard";
import { company } from "@/content/company";
import { toneClass, toneCycle } from "@/lib/tones";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const title = t("about");
  const description =
    "Meet the senior team behind Regalia Vows Tech — a Dubai production house building brands, events and visual content across the UAE."
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: "/en/about", ar: "/ar/about", "x-default": "/en/about" },
    },
    openGraph: { title, description, url: `/${locale}/about`, locale: locale === "ar" ? "ar_AE" : "en_AE" },
    twitter: { title, description },
  };
}

type TimelineEntry = { year: string; text: string };
type ValueEntry = { title: string; body: string };
type PrincipleEntry = { title: string; body: string };

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");
  const tStats = await getTranslations("stats");

  const timeline = t.raw("timeline") as TimelineEntry[];
  const values = t.raw("values") as ValueEntry[];
  const principles = t.raw("principles") as PrincipleEntry[];

  return (
    <>
      <section className="container-x pb-12 pt-20 md:pb-24 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-8">{t("eyebrow")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display-1 max-w-5xl text-balance">{t("headline")}</h1>
        </Reveal>
        {/* Above the fold: a scroll scrub would dim it right after first paint */}
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-3xl text-xl leading-snug md:text-2xl">{t("intro")}</p>
        </Reveal>
      </section>

      <section className="container-x grid grid-cols-2 gap-3 pb-24 md:gap-5 md:pb-32 lg:grid-cols-4">
        {(["years", "projects", "clients", "countries"] as const).map((k, i) => (
          <Reveal key={k} delay={i * 0.05}>
            <div
              className={cn(
                "tone-card flex h-full min-h-40 flex-col justify-end gap-3 rounded-[var(--radius-xl)] p-5 md:min-h-52 md:p-8",
                toneClass(toneCycle(i)),
              )}
            >
              {/* Keep "·" on the first line when a value wraps */}
              <p className="display-4">{company.stats[k].replace(" · ", "\u00a0· ")}</p>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-tone-ink-soft">{tStats(k)}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="border-t hairline">
        <div className="container-x grid gap-16 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-4 inline-flex items-center gap-2">
                <span aria-hidden className="spectrum-rule" />
                {t("founderEyebrow")}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-3">{t("founderTitle")}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              {/* Violet: the founder's hue on the team page too */}
              <figure className="tone-violet">
                <blockquote className="font-serif text-2xl leading-snug md:text-3xl">
                  <span aria-hidden className="tone-text me-1">“</span>
                  {t("founderBody")}
                  <span aria-hidden className="tone-text ms-1">”</span>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t hairline pt-6">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-tone-base font-mono text-sm text-tone-ink">
                    {t("founderName")
                      .split(" ")
                      .map((s) => s.charAt(0))
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium">{t("founderName")}</p>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      {t("founderRole")}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t hairline">
        <div className="container-x grid gap-16 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4 inline-flex items-center gap-2">
              <span aria-hidden className="spectrum-rule" />
              {t("storyEyebrow")}
            </p>
            <h2 className="display-3">{t("storyTitle")}</h2>
          </div>
          {/* Line centre (8px) runs through each year's dot */}
          <div className="relative lg:col-span-8">
            <ScrollLine className="absolute inset-y-10 start-[7px] w-0.5" />
            <ol>
              {timeline.map((entry, i) => (
                <li key={entry.year} className="relative ps-10 md:ps-14">
                  <Reveal
                    delay={i * 0.04}
                    className="grid gap-2 py-6 md:grid-cols-[160px_1fr] md:items-baseline md:gap-8 md:py-8"
                  >
                    <span className={cn("display-4 relative", toneClass(toneCycle(i, { set: "jewel" })))}>
                      <span
                        aria-hidden
                        className="tone-dot absolute -start-10 top-1/2 h-4 w-4 -translate-y-1/2 ring-4 ring-[var(--color-bg)] md:-start-14"
                      />
                      <span className="tone-text">{entry.year}</span>
                    </span>
                    <span className="font-serif text-lg md:text-2xl">{entry.text}</span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Values bento: the header takes the first cell, so at xl the feature
          plus five cards fill two rows of four with no gaps. */}
      <section className="border-t hairline">
        <div className="container-x grid gap-4 py-24 md:grid-cols-2 md:gap-5 md:py-32 xl:grid-cols-4">
          <div className="mb-8 md:col-span-2 xl:col-span-1 xl:mb-0 xl:pe-4">
            <p className="eyebrow mb-4 inline-flex items-center gap-2">
              <span aria-hidden className="spectrum-rule" />
              {t("valuesEyebrow")}
            </p>
            <h2 className="display-3">{t("valuesTitle")}</h2>
          </div>
          {values.map((v, i) => {
            const feature = i === 0;
            return (
              <Reveal
                key={v.title}
                delay={i * 0.05}
                className={cn(
                  feature && "md:col-span-2",
                  i === values.length - 1 && values.length % 2 === 0 && "md:col-span-2 xl:col-span-1",
                )}
              >
                <TiltCard className="h-full rounded-[var(--radius-xl)]">
                  <article
                    className={cn(
                      "tone-card flex h-full flex-col justify-between gap-10 rounded-[var(--radius-xl)] p-7 md:p-9",
                      toneClass(toneCycle(i, { anchor: "cobalt" })),
                      feature && "min-h-72",
                    )}
                  >
                    <h3 className={feature ? "display-3" : "display-4"}>{v.title}</h3>
                    <p className={cn("text-tone-ink-soft", feature && "max-w-xl md:text-lg")}>{v.body}</p>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* No overflow clipping here: the deck and the header are sticky. */}
      <section className="border-t hairline bg-[var(--color-bg-alt)]">
        <div className="container-x grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-[calc(var(--header-clear)_+_2rem)] lg:col-span-4 lg:self-start">
            <p className="eyebrow mb-4 inline-flex items-center gap-2">
              <span aria-hidden className="spectrum-rule" />
              {t("principlesEyebrow")}
            </p>
            <h2 className="display-3">{t("principlesTitle")}</h2>
            <p className="mt-6 max-w-md text-[var(--color-muted)] md:text-lg">
              {t("principlesBody")}
            </p>
          </div>
          <StackCards className="lg:col-span-8">
            {principles.map((p, i) => (
              <article
                key={p.title}
                className={cn(
                  "tone-card flex min-h-[min(58svh,460px)] flex-col justify-between gap-10 rounded-[var(--radius-xl)] p-7 sm:p-10 md:p-12",
                  toneClass(toneCycle(i, { anchor: "teal" })),
                )}
              >
                <span className="display-2 leading-none tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="display-3 max-w-[16ch] text-balance">{p.title}</h3>
                  <p className="mt-5 max-w-xl text-tone-ink-soft md:text-lg">{p.body}</p>
                </div>
              </article>
            ))}
          </StackCards>
        </div>
      </section>

      <section className="border-t hairline">
        <div className="container-x py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4 inline-flex items-center gap-2">
                <span aria-hidden className="spectrum-rule" />
                Contact
              </p>
              <h2 className="display-3">Start a conversation.</h2>
              <p className="mt-6 max-w-md text-[var(--color-muted)] md:text-lg">
                Tell us what you’re building. We reply within one business day.
              </p>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-4 self-start">
              <a href={`mailto:${company.email}`} className="font-serif text-2xl underline-offset-4 hover:underline md:text-3xl">
                {company.email}
              </a>
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="font-mono text-sm uppercase tracking-[0.18em] text-[var(--color-muted)]">
                {company.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
