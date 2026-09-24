import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { company } from "@/content/company";
import { JsonLd, founderPersonLd } from "@/components/seo/JsonLd";
import { toneClass, toneCycle } from "@/lib/tones";
import { cn } from "@/lib/utils";

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
      {/* Violet is the founder's hue here and on the about page */}
      <section className="tone-violet border-y hairline bg-[var(--color-bg-alt)]">
        <div className="container-x grid gap-14 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <span aria-hidden className="spectrum-rule" />
                {t("leadershipEyebrow")}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex items-center gap-5">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-tone-base font-mono text-xl font-semibold text-tone-ink">
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
                <span aria-hidden className="tone-text me-1">&ldquo;</span>
                {tFounder("manifesto")}
                <span aria-hidden className="tone-text ms-1">&rdquo;</span>
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
                  <span aria-hidden className="spectrum-rule" />
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

          {/* Founder 2x1 + seven seats fill three rows of three at lg */}
          <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {/* Founder — the first seat */}
            <Reveal className="sm:col-span-2">
              <div className="tone-card tone-violet flex h-full min-h-72 flex-col items-start justify-between gap-10 rounded-[var(--radius-xl)] p-7 md:p-10">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-tone-ink font-mono text-xl font-semibold text-tone-deep">
                  {initials}
                </div>
                <div>
                  <h3 className="display-3">{tFounder("name")}</h3>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-tone-ink-soft">
                    {tFounder("role")}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Open seats: pastel, dashed edge. Lilac sits out so it can't echo the violet founder. */}
            {roles.map((role, i) => (
              <Reveal
                key={role}
                delay={(i + 1) * 0.06}
                className={cn(i === roles.length - 1 && roles.length % 2 === 1 && "sm:col-span-2 lg:col-span-1")}
              >
                <div
                  className={cn(
                    "tone-card flex h-full flex-col items-start gap-10 rounded-[var(--radius-xl)] border-2 border-dashed border-tone-ink/25 p-7 md:p-8",
                    toneClass(toneCycle(i, { set: "pastel", exclude: ["lilac"] })),
                  )}
                >
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-dashed border-tone-ink/40 font-mono text-sm text-tone-ink-soft">
                    {String(i + 2).padStart(2, "0")}
                  </div>
                  <div className="mt-auto">
                    <h3 className="display-4 break-words">{role}</h3>
                    <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-tone-ink-soft">
                      {t("placeholderName")}
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
                <p className="eyebrow mb-4 inline-flex items-center gap-2">
                  <span aria-hidden className="spectrum-rule" />
                  {t("connectEyebrow")}
                </p>
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
