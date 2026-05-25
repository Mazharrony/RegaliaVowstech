import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { company } from "@/content/company";

export async function generateMetadata() {
  const t = await getTranslations("nav");
  return { title: t("about") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tStats = await getTranslations("stats");
  const tNav = await getTranslations("nav");

  const timeline = [
    { year: "2019", text: "Studio founded in Dubai." },
    { year: "2021", text: "First regional brand programmes for federal clients." },
    { year: "2023", text: "Software practice formalised — CMS, automation and AI." },
    { year: "2025", text: "Sixty teams partnered across fourteen countries." },
  ];

  const values = [
    { title: "Craft", body: "Detail is the difference between work that ships and work that lasts." },
    { title: "Clarity", body: "Plain writing, clear scopes, decisions made in the room." },
    { title: "Curiosity", body: "We hire for it. We protect time for it. We hand it to clients." },
    { title: "Care", body: "For people, for data, for the work — and for the launches that follow." },
  ];

  return (
    <>
      <section className="container-x pb-12 pt-20 md:pb-24 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-8">{tNav("about")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display-1 max-w-5xl text-balance">
            An independent studio at the seam of craft, code and commerce.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
            Regalia Vows Tech is a Dubai-based studio of designers, engineers
            and producers. We work with public bodies, scale-ups and groups
            across the GCC on the projects that will define their next chapter.
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
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4">Story</p>
          <h2 className="display-3">A short history.</h2>
        </div>
        <ol className="lg:col-span-8">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.06}>
              <li className="grid grid-cols-[56px_1fr] items-baseline gap-4 border-b hairline py-5 md:grid-cols-[120px_1fr] md:gap-6 md:py-6">
                <span className="font-mono text-sm text-[var(--color-muted)]">{t.year}</span>
                <span className="font-serif text-lg md:text-2xl">{t.text}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-t hairline">
        <div className="container-x grid gap-16 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">Values</p>
            <h2 className="display-3">What we hold to.</h2>
          </div>
          <div className="grid gap-px lg:col-span-8 md:grid-cols-2 bg-[var(--color-line)]">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="h-full bg-[var(--color-bg)] p-8">
                  <h3 className="font-serif text-2xl">{v.title}</h3>
                  <p className="mt-4 text-[var(--color-muted)] md:text-lg">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
