import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ScrubReveal } from "@/components/motion/ScrubReveal";
import { getServices } from "@/content/services";
import { getPhotosByCategory } from "@/content/gallery";
import { serviceTone, toneClass } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { ServicesDeck } from "./services/ServicesDeck";

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
      <em key={i} className="font-bold italic text-tone-ink">
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
  const services = getServices(locale);
  const serviceCount = String(services.length + 1).padStart(2, "0"); // +1 for models

  const cards = [
    ...services.map((s) => ({
      key: s.slug as string,
      href: `/services/${s.slug}`,
      number: s.number,
      title: s.title,
      tagline: s.tagline,
      description: s.summary,
      image: s.image,
    })),
    {
      key: "models",
      href: "/models",
      number: "05",
      title: tModels("title"),
      tagline: tModels("eyebrow"),
      description: tModels("body"),
      // Models has no service entry; its first portfolio shot keeps the card on-subject.
      image: getPhotosByCategory("model")[0].src,
    },
  ].sort((a, b) => a.number.localeCompare(b.number));

  const header = (
    <div className="mb-16 grid gap-10 md:mb-20 lg:grid-cols-12 lg:items-end">
      <ScrubReveal className="lg:col-span-7">
        <p className="eyebrow mb-5 inline-flex items-center gap-2">
          <span aria-hidden className="spectrum-rule" />
          {t("servicesEyebrow")} · {serviceCount}
        </p>
        <h2 id="home-services-title" className="display-1 max-w-[14ch] text-balance">
          {t("servicesTitle")}
        </h2>
      </ScrubReveal>
      <ScrubReveal variant="slide-start" className="lg:col-span-4 lg:col-start-9">
        <p className="text-[var(--color-muted)]" style={{ fontSize: "var(--step-1)" }}>
          {t("servicesBody")}
        </p>
        <Link href="/services" className="btn btn-ink btn-sm mt-6">
          {tCommon("allServices")}
          <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
        </Link>
      </ScrubReveal>
    </div>
  );

  return (
    <section aria-labelledby="home-services-title" className="relative">
      <ServicesDeck tones={cards.map((c) => serviceTone(c.key))} header={header}>
        {cards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className={cn(
              "tone-card group grid h-[clamp(460px,72svh,520px)] grid-rows-[8.5rem_minmax(0,1fr)] rounded-[var(--radius-xl)] md:h-[clamp(420px,62svh,560px)] md:grid-cols-12 md:grid-rows-1",
              toneClass(serviceTone(card.key)),
            )}
          >
            {/* Photo: end side on desktop, where the tone's bloom glows around it */}
            <div className="relative m-2 overflow-hidden rounded-[calc(var(--radius-xl)-8px)] md:order-last md:col-span-5 md:m-3 md:rounded-[calc(var(--radius-xl)-12px)]">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover transition-transform duration-300 ease-brand group-hover:scale-[1.04]"
              />
              <span aria-hidden className="absolute inset-0 bg-linear-to-t from-tone-deep/45 to-transparent to-60%" />
              <span
                aria-hidden
                className="absolute end-3 top-3 grid size-11 place-items-center rounded-full bg-[var(--tone-on)] text-[var(--tone-on-ink)] md:end-4 md:top-4"
              >
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
              </span>
            </div>

            <div className="flex min-h-0 flex-col p-6 pt-4 md:col-span-7 md:p-10 lg:p-12">
              <span className="font-mono text-sm tabular-nums text-tone-ink-soft">{card.number}</span>
              <h3
                className="mt-auto font-serif tracking-tight text-balance text-tone-ink"
                style={{ fontSize: "var(--step-4)", lineHeight: 1.05 }}
              >
                {card.title}
              </h3>
              <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-tone-ink-soft">
                {card.tagline}
              </p>
              <p className="mt-4 line-clamp-4 max-w-[60ch] text-sm leading-relaxed text-tone-ink-soft md:line-clamp-none md:text-base">
                {emphasize(card.description, CARD_KEYWORDS[card.key])}
              </p>
            </div>
          </Link>
        ))}
      </ServicesDeck>
    </section>
  );
}
