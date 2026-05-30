import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/content/company";
import { getServices } from "@/content/services";
import { MaskReveal } from "@/components/motion/MaskReveal";

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tLegal = await getTranslations("legal");
  const tCommon = await getTranslations("common");
  const services = getServices(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="relative slab-dark border-t hairline-dark">
      {/* Massive contact card */}
      <div className="container-wide pb-16 pt-16 md:pb-24 md:pt-24 lg:pb-28 lg:pt-28">
        <div className="grid gap-12 md:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6">{tNav("contact")} · 2026</p>
            <MaskReveal>
              <h2 className="display-1 text-balance text-[var(--color-bg)]">
                {t("letsTalk")}
              </h2>
            </MaskReveal>

            <div className="mt-12 flex flex-col gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 self-start border-b border-[color-mix(in_srgb,var(--color-bg)_22%,transparent)] pb-2 font-serif text-2xl font-semibold tracking-[-0.02em] text-[var(--color-bg)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] md:text-3xl"
              >
                {company.email}
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="text-[0.92rem] font-medium tracking-[-0.005em] text-[color-mix(in_srgb,var(--color-bg)_68%,transparent)] transition-colors hover:text-[var(--color-bg)]"
              >
                {company.phone}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 min-[420px]:grid-cols-2 sm:gap-12 lg:col-span-4 lg:grid-cols-2 lg:gap-8">
            <div>
              <p className="eyebrow mb-5">{t("studio")}</p>
              <ul className="space-y-2.5 text-sm">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="link-wipe text-[var(--color-bg)]"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5">{t("company")}</p>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/about" className="link-wipe text-[var(--color-bg)]">{tNav("about")}</Link></li>
                <li><Link href="/work" className="link-wipe text-[var(--color-bg)]">{tNav("work")}</Link></li>
                <li><Link href="/process" className="link-wipe text-[var(--color-bg)]">{tNav("process")}</Link></li>
                <li><Link href="/insights" className="link-wipe text-[var(--color-bg)]">{tNav("insights")}</Link></li>
                <li><Link href="/contact" className="link-wipe text-[var(--color-bg)]">{tNav("contact")}</Link></li>
              </ul>

              <p className="eyebrow mt-10 mb-5">{t("social")}</p>
              <ul className="space-y-2.5 text-sm">
                {company.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-wipe inline-flex items-center gap-1.5 text-[var(--color-bg)]"
                    >
                      {s.label}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Meta strip */}
        <div className="mt-16 grid gap-8 border-t border-[color-mix(in_srgb,var(--color-bg)_15%,transparent)] pt-10 text-[0.92rem] text-[color-mix(in_srgb,var(--color-bg)_60%,transparent)] sm:grid-cols-2 md:mt-20 md:grid-cols-4">
          <div>
            <p className="eyebrow mb-2">{company.shortName}</p>
            <p className="text-[var(--color-bg)]">{company.address.line1}</p>
            <p>{company.address.line2}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Hours</p>
            <p className="text-[var(--color-bg)]">Sun – Thu</p>
            <p>09:00 – 18:00 GST</p>
          </div>
          <div>
            <p className="eyebrow mb-2">{tCommon("estYear").split(" ")[0]}</p>
            <p className="text-[var(--color-bg)]">{tCommon("estYear")}</p>
            <p>GCC + Worldwide</p>
          </div>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-3 sm:gap-x-4 md:justify-end md:gap-8">
            <Link href="/legal/privacy" className="link-wipe">{tLegal("privacy")}</Link>
            <Link href="/legal/terms" className="link-wipe">{tLegal("terms")}</Link>
            <span>© {year}</span>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden border-t border-[color-mix(in_srgb,var(--color-bg)_15%,transparent)]">
        <p
          className="mega whitespace-nowrap py-6 text-center text-[var(--color-bg)] opacity-[0.95] md:py-8"
        >
          <span className="opacity-95">Regalia</span>
          <span className="mx-1.5 text-[var(--color-accent)] sm:mx-3 md:mx-6">·</span>
          <span className="opacity-95">Vows</span>
          <span className="mx-1.5 text-[var(--color-accent)] sm:mx-3 md:mx-6">·</span>
          <span className="opacity-95">Tech</span>
        </p>
      </div>
    </footer>
  );
}
