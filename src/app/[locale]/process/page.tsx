import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata() {
  const t = await getTranslations("nav");
  return { title: t("process") };
}

const phases = [
  {
    n: "01",
    title: "Discover",
    body: "We start with listening. Stakeholder interviews, audits and research that turn ambition into a sharp, signed-off brief.",
    deliverables: ["Stakeholder interviews", "Audit & competitive review", "Opportunity map", "Signed brief"],
  },
  {
    n: "02",
    title: "Define",
    body: "Strategy, narrative and a roadmap the whole team can rally around. We make the trade-offs visible and the bets explicit.",
    deliverables: ["Strategy & positioning", "Information architecture", "Roadmap & estimates", "Success metrics"],
  },
  {
    n: "03",
    title: "Design & Build",
    body: "Identity, interfaces, software and physical builds — shaped in tight loops with weekly demos and a single shared backlog.",
    deliverables: ["Design system", "Production build", "Integration & QA", "Launch readiness review"],
  },
  {
    n: "04",
    title: "Launch & Evolve",
    body: "Go-live, measurement, optimisation and the next chapter. We stay close after launch, not just before it.",
    deliverables: ["Go-live", "Analytics & monitoring", "Iteration backlog", "Quarterly reviews"],
  },
];

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations("nav");

  return (
    <>
      <section className="container-x pb-12 pt-20 md:pb-24 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-8">{tNav("process")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display-1 max-w-5xl text-balance">
            A clear path from brief to launch — and beyond.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
            Four phases, run in tight loops. Every phase ships something useful,
            so momentum compounds and nothing waits until the end.
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
                <p className="eyebrow mb-4">Deliverables</p>
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
    </>
  );
}
