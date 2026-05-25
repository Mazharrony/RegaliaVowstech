import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { company } from "@/content/company";

export async function generateMetadata() {
  const t = await getTranslations("nav");
  return { title: t("contact") };
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
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
