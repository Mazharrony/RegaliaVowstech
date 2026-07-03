import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, MessageCircle, Calendar, Plus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { company } from "@/content/company";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const title = t("contact");
  const description =
    "Start a project with Regalia Vows Tech — production house in Dubai. Reach us for video production, events, branding and photography across the UAE."
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: "/en/contact", ar: "/ar/contact", "x-default": "/en/contact" },
    },
    openGraph: { title, description, url: `/${locale}/contact`, locale: locale === "ar" ? "ar_AE" : "en_AE" },
    twitter: { title, description },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");

  return (
    <>
      <section className="container-x pb-12 pt-20 md:pb-24 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-8">{tNav("contact")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display-1 max-w-4xl text-balance">{t("title")}</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
            {t("body")}
          </p>
        </Reveal>
      </section>

      <section className="border-t hairline">
        <div className="container-x grid gap-16 py-20 md:py-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="space-y-10">
              <div>
                <p className="eyebrow mb-3">{t("office")}</p>
                <p className="font-serif text-xl">{company.address.line1}</p>
                <p className="font-serif text-xl">{company.address.line2}</p>
              </div>
              <div>
                <p className="eyebrow mb-3">Email</p>
                <a
                  href={`mailto:${company.email}`}
                  className="font-serif text-xl hover:text-[var(--color-accent)]"
                >
                  {company.email}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-3">Phone</p>
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="font-serif text-xl hover:text-[var(--color-accent)]"
                >
                  {company.phone}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-3">{t("hours")}</p>
                <p className="font-serif text-xl">{t("hoursValue")}</p>
              </div>
              <div>
                <p className="eyebrow mb-3">{t("responseTime")}</p>
                <p className="font-serif text-xl">{t("responseTimeValue")}</p>
              </div>
              <div>
                <p className="eyebrow mb-4 inline-flex items-center gap-2">
                  <span className="inline-block h-px w-6 bg-[var(--color-accent)]" />
                  {t("nextStepsEyebrow")}
                </p>
                <ol className="space-y-4 text-sm text-[var(--color-muted)]">
                  {[1, 2, 3].map((n) => (
                    <li key={n} className="flex gap-4 border-b hairline pb-4">
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        {String(n).padStart(2, "0")}
                      </span>
                      <span className="text-[var(--color-ink)]">{t(`nextStep${n}`)}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Faster channels */}
      <section className="border-t hairline bg-[var(--color-bg-alt)]">
        <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-4">{t("channelsEyebrow")}</p>
            <h2 className="display-3">{t("channelsTitle")}</h2>
            <p className="mt-6 max-w-md text-[var(--color-muted)] md:text-lg">
              {t("channelsBody")}
            </p>
          </Reveal>
          <div className="grid gap-px bg-[var(--color-line)] lg:col-span-8 md:grid-cols-2">
            <Reveal>
              <a
                href={`https://wa.me/${company.phone.replace(/\D/g, "")}?text=${encodeURIComponent(t("whatsappMessage"))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-4 bg-[var(--color-bg)] p-8 transition-colors hover:bg-[var(--color-bg-alt)]"
              >
                <MessageCircle className="h-6 w-6" />
                <h3 className="font-serif text-xl md:text-2xl">{t("whatsappLabel")}</h3>
                <p className="text-[var(--color-muted)]">{t("whatsappBody")}</p>
                <span className="mt-auto inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em]">
                  {t("whatsappCta")}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <a
                href={`mailto:${company.email}?subject=${encodeURIComponent(t("bookingSubject"))}&body=${t("bookingBodyText")}`}
                className="group flex h-full flex-col gap-4 bg-[var(--color-bg)] p-8 transition-colors hover:bg-[var(--color-bg-alt)]"
              >
                <Calendar className="h-6 w-6" />
                <h3 className="font-serif text-xl md:text-2xl">{t("bookingLabel")}</h3>
                <p className="text-[var(--color-muted)]">{t("bookingBody")}</p>
                <span className="mt-auto inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em]">
                  {t("bookingCta")}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t hairline">
        <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-4">{t("faqEyebrow")}</p>
            <h2 className="display-3">{t("faqTitle")}</h2>
          </Reveal>
          <ul className="lg:col-span-8">
            {(t.raw("faqs") as { q: string; a: string }[]).map((f, i) => (
              <Reveal key={f.q} delay={i * 0.03}>
                <li className="border-b hairline first:border-t">
                  <details className="group py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                      <span className="font-serif text-xl md:text-2xl">{f.q}</span>
                      <Plus
                        aria-hidden
                        className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-45"
                      />
                    </summary>
                    <p className="mt-4 max-w-3xl text-[var(--color-muted)] md:text-lg">
                      {f.a}
                    </p>
                  </details>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
