import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/home/CTASection";

export async function generateMetadata() {
  const t = await getTranslations("nav");
  return { title: t("process") };
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
    title: t(`phase${n}Title`),
    body: t(`phase${n}Body`),
    deliverables: [
      t(`phase${n}D1`),
      t(`phase${n}D2`),
      t(`phase${n}D3`),
      t(`phase${n}D4`),
    ],
  }));

  const engagements = [1, 2, 3].map((n) => ({
    title: t(`engagement${n}Title`),
    body: t(`engagement${n}Body`),
  }));

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
        {phases.map((p, i) => (
          <div key={p.n} className={i % 2 === 1 ? "bg-[var(--color-bg-alt)]" : ""}>
            <div className="container-x grid gap-10 border-b hairline py-20 md:py-28 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <p className="font-mono text-xs text-[var(--color-muted)]">{p.n} / 04</p>
                <h2 className="display-2 mt-6">{p.title}</h2>
              </Reveal>
              <Reveal delay={0.1} className="lg:col-span-5">
                <p className="text-lg text-[var(--color-muted)] md:text-xl">{p.body}</p>
              </Reveal>
              <Reveal delay={0.15} className="lg:col-span-3">
                <p className="eyebrow mb-4">{t("deliverables")}</p>
                <ul className="space-y-2 text-sm">
                  {p.deliverables.map((d) => (
                    <li key={d} className="border-b hairline pb-2">{d}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        ))}
      </section>

      <section className="border-t hairline">
        <div className="container-x py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow mb-5 inline-flex items-center gap-2">
                  <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
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

          <ul className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3">
            {engagements.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <li className="flex h-full flex-col gap-4 rounded-md border hairline p-7 md:p-8">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    {String(i + 1).padStart(2, "0")} / 03
                  </span>
                  <h3 className="font-serif text-2xl tracking-tight md:text-3xl">
                    {e.title}
                  </h3>
                  <p className="text-[var(--color-muted)]">{e.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
