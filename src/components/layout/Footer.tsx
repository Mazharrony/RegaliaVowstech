import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/content/company";
import { getServices } from "@/content/services";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { cn } from "@/lib/utils";
import { toneClass, toneCycle } from "@/lib/tones";

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tLegal = await getTranslations("legal");
  const tCommon = await getTranslations("common");
  const services = getServices(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="relative slab border-t hairline-dark">
      {/* Massive contact card */}
      <div className="container-wide pb-16 pt-16 md:pb-24 md:pt-24 lg:pb-28 lg:pt-28">
        <div className="grid gap-12 md:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span aria-hidden className="spectrum-rule" />
              {tNav("contact")} · 2026
            </p>
            <MaskReveal>
              <h2 className="display-1 text-balance text-ink">
                {t("letsTalk")}
              </h2>
            </MaskReveal>

            <div className="mt-12 flex flex-col gap-4">
              <Link
                href="/contact"
                className={cn(
                  "group inline-flex items-center gap-3 self-start border-b border-ink/25 pb-2 font-serif text-2xl font-semibold tracking-[-0.02em] text-ink transition-colors duration-300 ease-[var(--ease-brand)] hover:border-tone-strong hover:text-tone-strong md:text-3xl",
                  toneClass("violet")
                )}
              >
                {company.email}
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
              </Link>
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="text-[0.92rem] font-medium tracking-[-0.005em] text-ink/85 transition-colors hover:text-ink"
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
                      className="link-wipe text-ink"
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
                <li><Link href="/about" className="link-wipe text-ink">{tNav("about")}</Link></li>
                <li><Link href="/process" className="link-wipe text-ink">{tNav("process")}</Link></li>
                <li><Link href="/contact" className="link-wipe text-ink">{tNav("contact")}</Link></li>
              </ul>

              <p className="eyebrow mt-10 mb-5">{t("social")}</p>
              <ul className="space-y-2.5 text-sm">
                {company.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-wipe inline-flex items-center gap-1.5 text-ink"
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
        <div className="mt-16 grid gap-8 border-t border-ink/15 pt-10 text-[0.92rem] text-ink/85 sm:grid-cols-2 md:mt-20 md:grid-cols-4">
          <div>
            <p className="eyebrow mb-2">{company.shortName}</p>
            <p className="text-ink">{company.address.line1}</p>
            <p>{company.address.line2}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Hours</p>
            <p className="text-ink">Sun – Thu</p>
            <p>09:00 – 18:00 GST</p>
          </div>
          <div>
            <p className="eyebrow mb-2">{tCommon("estYear").split(" ")[0]}</p>
            <p className="text-ink">{tCommon("estYear")}</p>
            <p>UAE-first · Dubai</p>
          </div>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-3 sm:gap-x-4 md:justify-end md:gap-8">
            <Link href="/legal/privacy" className="link-wipe">{tLegal("privacy")}</Link>
            <Link href="/legal/terms" className="link-wipe">{tLegal("terms")}</Link>
            <span>© {year}</span>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden border-t border-ink/15">
        <p
          className="mega whitespace-nowrap py-6 text-center text-ink opacity-[0.95] md:py-8"
        >
          {["Regalia", "Vows", "Tech"].map((word, i) => [
            i > 0 && (
              <span
                key={`dot-${word}`}
                className={cn(
                  "tone-dot mx-2.5 size-[0.16em] align-middle sm:mx-4 md:mx-7",
                  toneClass(toneCycle(i - 1, { set: "jewel" }))
                )}
              />
            ),
            <span key={word} className="opacity-95">
              {word}
            </span>,
          ])}
        </p>
      </div>
    </footer>
  );
}
