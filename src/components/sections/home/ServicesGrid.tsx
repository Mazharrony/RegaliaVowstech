"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { getServices } from "@/content/services";

/**
 * Key service words highlighted inside each card description (EN + AR).
 * Longest-first sorting happens in emphasize() so multi-word phrases win.
 */
const CARD_KEYWORDS: Record<string, string[]> = {
  branding: [
    "Strategy", "naming", "visual systems", "brand guidelines",
    "استراتيجية", "تسمية", "نظام بصري", "دليل علامة",
  ],
  marketing: [
    "SEO", "paid media", "social media management", "websites", "e-commerce", "platforms",
    "الإعلانات المدفوعة", "إدارة السوشيال", "المواقع", "التجارة الإلكترونية", "المنصات",
  ],
  "events-expo": [
    "exhibition booth design and branding", "marketing and promotion",
    "content production", "media coverage", "brand activation", "visitor engagement",
    "تصميم وهوية الجناح", "التسويق والترويج", "إنتاج المحتوى", "التغطية الإعلامية", "تفعيل العلامة",
  ],
  "corporate-events": [
    "summits", "product launches", "townhalls", "gala nights",
    "strategy", "production", "media capture", "post-event communications",
    "المؤتمرات", "الإطلاقات", "اجتماعات الشركات", "حفلات التكريم", "التخطيط", "الإنتاج", "التغطية", "التقارير",
  ],
  models: [
    "campaigns", "fashion shoots", "corporate events", "product launches",
    "e-commerce photography", "social media content", "brand promotions",
    "حملات الإعلانات", "جلسات الأزياء", "الفعاليات المؤسسية", "إطلاق المنتجات",
    "تصوير التجارة الإلكترونية", "محتوى السوشيال ميديا", "حملات الترويج",
  ],
  "content-ads": [
    "photography", "videography", "livestreaming", "graphics",
    "reels", "behind-the-scenes", "testimonials",
    "تصوير", "فيديو", "بث مباشر", "جرافيكس", "ريلز", "كواليس", "شهادات",
  ],
};

function emphasize(text: string, words?: string[]) {
  if (!words?.length) return text;
  const pattern = [...words]
    .sort((a, b) => b.length - a.length)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  return text.split(new RegExp(`(${pattern})`, "gi")).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="font-bold italic text-white">
        {part}
      </em>
    ) : (
      part
    ),
  );
}

export function ServicesGrid() {
  const locale = useLocale();
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const tModels = useTranslations("models");
  const services = useMemo(() => getServices(locale), [locale]);
  const serviceCount = String(services.length + 1).padStart(2, "0"); // +1 for models

  const cards = useMemo(() => {
    const list = services.map((s) => ({
      key: s.slug as string,
      href: `/services/${s.slug}`,
      number: s.number,
      title: s.title,
      tagline: s.tagline,
      description: s.summary,
    }));
    list.push({
      key: "models",
      href: "/models",
      number: "05",
      title: tModels("title"),
      tagline: tModels("eyebrow"),
      description: tModels("body"),
    });
    return list.sort((a, b) => a.number.localeCompare(b.number));
  }, [services, tModels]);

  return (
    <section className="section-pad relative">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-16 grid gap-10 md:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
                {t("servicesEyebrow")} · {serviceCount}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-1 max-w-[14ch] text-balance">{t("servicesTitle")}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[var(--color-muted)]" style={{ fontSize: "var(--step-1)" }}>
              {t("servicesBody")}
            </p>
            <Link
              href="/services"
              className="btn btn-soft btn-sm mt-6"
            >
              {tCommon("allServices")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>

        {/* Capability cards */}
        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.key} delay={0.05 * i} className="h-full">
              <Link
                href={card.href}
                className="cap-card group flex h-full flex-col p-7 md:p-8"
              >
                <span aria-hidden className="cap-card-gradient" />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="font-mono text-[0.7rem] tabular-nums text-white/70 md:text-sm">
                    {card.number}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-white/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                </div>

                <h3
                  className="relative mt-10 font-serif tracking-tight text-balance text-white md:mt-14"
                  style={{ fontSize: "var(--step-3)", lineHeight: 1.1 }}
                >
                  {card.title}
                </h3>
                <p className="relative mt-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--ramp-0)_65%,#ffffff)]">
                  {card.tagline}
                </p>
                <p className="relative mt-4 text-sm leading-relaxed text-white/90">
                  {emphasize(card.description, CARD_KEYWORDS[card.key])}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
