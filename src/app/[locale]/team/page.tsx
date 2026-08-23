import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { company } from "@/content/company";
import { JsonLd, founderPersonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "teamPage" });
  const title = t("title");
  const description = t("lead");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/team`,
      languages: { en: "/en/team", ar: "/ar/team", "x-default": "/en/team" },
    },
    openGraph: { title, description, url: `/${locale}/team`, locale: locale === "ar" ? "ar_AE" : "en_AE" },
    twitter: { title, description },
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("teamPage");
  const tFounder = await getTranslations("founderPage");

  const roles = t.raw("roles") as string[];

  const initials = tFounder("name")
    .split(" ")
    .map((s: string) => s.charAt(0))
    .join("")
    .slice(0, 2);

  return (
    <>
      <JsonLd data={founderPersonLd()} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="container-x pb-16 pt-20 md:pb-28 md:pt-36">
        <Reveal>
          <p className="eyebrow mb-8">{t("eyebrow")}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display-1 max-w-4xl text-balance">{t("title")}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-10 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
            {t("lead")}
          </p>
        </Reveal>
      </section>

      {/* ── Leadership ───────────────────────────────────────────────── */}
      <section className="border-y hairline bg-[var(--color-bg-alt)]">
        <div className="container-x grid gap-14 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
                {t("leadershipEyebrow")}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex items-center gap-5">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[var(--color-ink)] font-mono text-xl font-semibold text-[var(--color-bg)]">
                  {initials}
                </div>
                <div>
                  <p className="font-serif text-2xl tracking-tight">{tFounder("name")}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {tFounder("role")}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.12}>
              <blockquote className="text-balance font-serif text-2xl leading-snug md:text-3xl">
                <span aria-hidden className="me-1 text-[var(--color-muted)]">&ldquo;</span>
                {tFounder("manifesto")}
                <span aria-hidden className="ms-1 text-[var(--color-muted)]">&rdquo;</span>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Talent grid ──────────────────────────────────────────────── */}
      <section className="border-b hairline">
        <div className="container-x py-24 md:py-32">
          <div className="mb-14 grid gap-10 md:mb-20 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow mb-5 inline-flex items-center gap-2">
                  <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
                  {t("gridEyebrow")}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-2 max-w-[16ch] text-balance">{t("gridTitle")}</h2>
              </Reveal>
            </div>
            <Reveal delay={0.12} className="lg:col-span-6">
              <p className="text-[var(--color-muted)] md:text-lg">{t("gridBody")}</p>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Founder — the first seat */}
            <Reveal>
              <div className="flex h-full flex-col items-start gap-6 rounded-md border hairline bg-[var(--color-bg-alt)] p-7">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-[var(--color-ink)] font-mono text-lg font-semibold text-[var(--color-bg)]">
                  {initials}
                </div>
                <div className="mt-auto">
                  <p className="font-serif text-xl tracking-tight">{tFounder("name")}</p>
                  <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    {tFounder("role")}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Placeholder seats */}
            {roles.map((role, i) => (
              <Reveal key={role} delay={(i + 1) * 0.06}>
                <div className="flex h-full flex-col items-start gap-6 rounded-md border border-dashed border-[var(--color-line)] p-7">
                  <div className="grid h-16 w-16 place-items-center rounded-full border border-dashed border-[var(--color-line)] font-mono text-sm text-[var(--color-muted)]">
                    {String(i + 2).padStart(2, "0")}
                  </div>
                  <div className="mt-auto">
                    <p className="font-serif text-xl tracking-tight text-[var(--color-muted)]">
                      {t("placeholderName")}
                    </p>
                    <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                      {role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join / connect ───────────────────────────────────────────── */}
      <section>
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
