import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/home/CTASection";

const gallery = [
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=70",
  "https://images.unsplash.com/photo-1506634572416-48cdfe530110?auto=format&fit=crop&w=900&q=70",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=70",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=70",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "models" });
  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function ModelsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("models");
  const items = t.raw("items") as { name: string; description: string }[];

  return (
    <>
      <section className="container-x pb-12 pt-20 md:pb-24 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-8">{t("eyebrow")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display-1 max-w-5xl text-balance">{t("title")}</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-3xl text-[var(--color-muted)] md:text-lg">{t("body")}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-4">
          {gallery.map((src, i) => (
            <Reveal key={src} delay={0.25 + i * 0.06}>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-xl)] border hairline">
                <Image
                  src={src}
                  alt={t("title")}
                  fill
                  priority={i < 2}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t hairline">
        <div className="container-x py-20 md:py-28">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.04}>
                <div className="group flex h-full flex-col rounded-[var(--radius-xl)] border surface-card p-7 transition-colors md:p-8">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-4 font-serif text-xl tracking-tight md:text-2xl">{item.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
