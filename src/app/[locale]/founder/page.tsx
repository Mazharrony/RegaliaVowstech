import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { company } from "@/content/company";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "founderPage" });
  const title = `${t("name")} — ${t("role")}`;
  const description =
    "Meet Jack Mohammed Ali, the founder and managing director of Regalia Vows Tech — the conviction, the story and the beliefs behind Dubai's integrated studio for brand, technology and experience.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/founder`,
      languages: { en: "/en/founder", ar: "/ar/founder", "x-default": "/en/founder" },
    },
    openGraph: { title, description, url: `/${locale}/founder`, locale: locale === "ar" ? "ar_AE" : "en_AE" },
    twitter: { title, description },
  };
}

type BeliefEntry = { title: string; body: string };

export default async function FounderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("founderPage");

  const beliefs = t.raw("beliefs") as BeliefEntry[];

  const initials = t("name")
    .split(" ")
    .map((s: string) => s.charAt(0))
    .join("")
    .slice(0, 2);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="container-x pb-16 pt-20 md:pb-28 md:pt-36">
        <Reveal>
          <p className="eyebrow mb-8">{t("eyebrow")}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display-1 max-w-4xl text-balance">{t("name")}</h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-4 font-mono text-sm uppercase tracking-[0.18em] text-[var(--color-muted)]">
            {t("role")}
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mt-10 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
            {t("lead")}
          </p>
        </Reveal>
      </section>

      {/* ── Manifesto quote ──────────────────────────────────────────── */}
      <section className="border-y hairline bg-[var(--color-bg-alt)] py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <blockquote className="max-w-4xl text-balance font-serif text-3xl leading-snug md:text-4xl lg:text-[2.6rem]">
              <span aria-hidden className="me-1 text-[var(--color-muted)]">&ldquo;</span>
              {t("manifesto")}
              <span aria-hidden className="ms-1 text-[var(--color-muted)]">&rdquo;</span>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────────────────── */}
      <section className="border-b hairline">
        <div className="container-x grid gap-16 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-4">{t("storyEyebrow")}</p>
              <h2 className="display-3">{t("storyTitle")}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 flex items-center gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[var(--color-ink)] font-mono text-lg font-semibold text-[var(--color-bg)]">
                  {initials}
                </div>
                <div>
                  <p className="font-medium leading-snug">{t("name")}</p>
                  <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {t("role")}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="space-y-8 lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.08}>
              <p className="text-lg leading-relaxed text-[var(--color-muted)] md:text-xl">
                {t("storyP1")}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-lg leading-relaxed text-[var(--color-muted)] md:text-xl">
                {t("storyP2")}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg leading-relaxed text-[var(--color-muted)] md:text-xl">
                {t("storyP3")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Beliefs ──────────────────────────────────────────────────── */}
      <section className="border-b hairline bg-[var(--color-bg-alt)]">
        <div className="container-x py-24 md:py-32">
          <div className="mb-14 grid gap-10 md:mb-20 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow mb-5 inline-flex items-center gap-2">
                  <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
                  {t("beliefsEyebrow")}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-2 max-w-[16ch] text-balance">{t("beliefsTitle")}</h2>
              </Reveal>
            </div>
            <Reveal delay={0.12} className="lg:col-span-6">
              <p className="text-[var(--color-muted)] md:text-lg">{t("beliefsBody")}</p>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.07}>
                <div className="flex h-full flex-col gap-4 rounded-md border hairline bg-[var(--color-bg)] p-7 md:p-8">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-2xl tracking-tight md:text-3xl">{b.title}</h3>
                  <p className="text-[var(--color-muted)]">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Personal note ────────────────────────────────────────────── */}
      <section className="border-b hairline">
        <div className="container-x grid gap-16 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-4">{t("noteEyebrow")}</p>
              <h2 className="display-3">{t("noteTitle")}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.1}>
              <figure>
                <blockquote className="font-serif text-2xl leading-snug md:text-3xl">
                  <span aria-hidden className="me-1 text-[var(--color-muted)]">&ldquo;</span>
                  {t("noteQuote")}
                  <span aria-hidden className="ms-1 text-[var(--color-muted)]">&rdquo;</span>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t hairline pt-6">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--color-fg)] font-mono text-sm text-[var(--color-bg)]">
                    {initials}
                  </div>
                  <div>
                    <p className="font-medium">{t("name")}</p>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      {t("role")}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Connect ──────────────────────────────────────────────────── */}
      <section className="border-t hairline">
        <div className="container-x py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow mb-4">{t("connectEyebrow")}</p>
                <h2 className="display-3">{t("connectTitle")}</h2>
                <p className="mt-6 max-w-md text-[var(--color-muted)] md:text-lg">
                  {t("connectBody")}
                </p>
              </Reveal>
            </div>
            <div className="flex flex-col gap-4 self-start lg:col-span-7">
              <Reveal delay={0.1}>
                <a
                  href={`mailto:${company.email}`}
                  className="font-serif text-2xl underline-offset-4 hover:underline md:text-3xl"
                >
                  {company.email}
                </a>
              </Reveal>
              <Reveal delay={0.15}>
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="font-mono text-sm uppercase tracking-[0.18em] text-[var(--color-muted)]"
                >
                  {company.phone}
                </a>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {company.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-wipe font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
