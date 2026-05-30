import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { company } from "@/content/company";

export async function generateMetadata() {
  const t = await getTranslations("nav");
  return { title: t("about") };
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
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
            {t("intro")}
          </p>
        </Reveal>
      </section>

      <section className="border-y hairline bg-[var(--color-bg-alt)]">
        <div className="container-x grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-4 md:py-20">
          {(["years", "projects", "clients", "countries"] as const).map((k, i) => (
            <Reveal key={k} delay={i * 0.05}>
              <p className="display-2">{company.stats[k]}</p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                {tStats(k)}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x grid gap-16 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-4">{t("founderEyebrow")}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-3">{t("founderTitle")}</h2>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <figure>
              <blockquote className="font-serif text-2xl leading-snug md:text-3xl">
                <span aria-hidden className="mr-1 text-[var(--color-muted)]">“</span>
                {t("founderBody")}
                <span aria-hidden className="ml-1 text-[var(--color-muted)]">”</span>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t hairline pt-6">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-fg)] font-mono text-sm text-[var(--color-bg)]">
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
      </section>

      <section className="border-t hairline">
        <div className="container-x grid gap-16 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">{t("storyEyebrow")}</p>
            <h2 className="display-3">{t("storyTitle")}</h2>
          </div>
          <ol className="lg:col-span-8">
            {timeline.map((entry, i) => (
              <Reveal key={entry.year} delay={i * 0.04}>
                <li className="grid grid-cols-[56px_1fr] items-baseline gap-4 border-b hairline py-5 md:grid-cols-[120px_1fr] md:gap-6 md:py-6">
                  <span className="font-mono text-sm text-[var(--color-muted)]">{entry.year}</span>
                  <span className="font-serif text-lg md:text-2xl">{entry.text}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t hairline">
        <div className="container-x grid gap-16 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">{t("valuesEyebrow")}</p>
            <h2 className="display-3">{t("valuesTitle")}</h2>
          </div>
          <div className="grid gap-px bg-[var(--color-line)] lg:col-span-8 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.04}>
                <div className="h-full bg-[var(--color-bg)] p-8">
                  <h3 className="font-serif text-2xl">{v.title}</h3>
                  <p className="mt-4 text-[var(--color-muted)] md:text-lg">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t hairline bg-[var(--color-bg-alt)]">
        <div className="container-x grid gap-16 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">{t("principlesEyebrow")}</p>
            <h2 className="display-3">{t("principlesTitle")}</h2>
            <p className="mt-6 max-w-md text-[var(--color-muted)] md:text-lg">
              {t("principlesBody")}
            </p>
          </div>
          <ol className="lg:col-span-8">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <li className="grid grid-cols-[40px_1fr] gap-4 border-b hairline py-6 md:grid-cols-[64px_1fr] md:gap-6 md:py-8">
                  <span className="font-mono text-sm text-[var(--color-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl">{p.title}</h3>
                    <p className="mt-2 text-[var(--color-muted)] md:text-lg">{p.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t hairline">
        <div className="container-x py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">Contact</p>
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
