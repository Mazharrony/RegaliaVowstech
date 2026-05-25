import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";

type Section = { title: string; body: string };

export async function LegalDocument({ namespace }: { namespace: string }) {
  const t = await getTranslations(namespace);
  const sections = t.raw("sections") as Section[];

  return (
    <>
      <section className="container-x pb-12 pt-20 md:pb-20 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-8">{t("eyebrow")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display-1 max-w-4xl text-balance">{t("headline")}</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-[var(--color-muted)] md:text-lg">
            {t("intro")}
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            {t("lastUpdated")}
          </p>
        </Reveal>
      </section>

      <section className="border-t hairline">
        <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <span className="inline-block h-px w-6 bg-[var(--color-accent)]" />
                {t("tocTitle")}
              </p>
              <ol className="space-y-2">
                {sections.map((s, i) => (
                  <li key={s.title}>
                    <a
                      href={`#section-${i + 1}`}
                      className="group flex gap-3 border-b hairline py-2 text-sm transition-colors hover:text-[var(--color-accent)]"
                    >
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug">{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="space-y-16 md:space-y-20">
              {sections.map((s, i) => (
                <Reveal key={s.title} delay={0.05}>
                  <section
                    id={`section-${i + 1}`}
                    className="scroll-mt-28 border-t hairline pt-10 first:border-0 first:pt-0 md:pt-12"
                  >
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                      {String(i + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
                    </p>
                    <h2 className="display-3 mt-4 text-balance">{s.title}</h2>
                    <p className="prose-editorial mt-6 max-w-2xl text-[var(--color-muted)] md:text-lg">
                      {s.body}
                    </p>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
