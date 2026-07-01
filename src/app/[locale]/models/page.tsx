import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/home/CTASection";

const gallery = [
  "https://i.ibb.co/qYZ92V6w/Model1.jpg",
  "https://i.ibb.co/k2y0jp0X/Model12.jpg",
  "https://i.ibb.co/n8KVC1t4/Model13.jpg",
  "https://i.ibb.co/7JPpXyD1/Model14.jpg",
  "https://i.ibb.co/BVrpPrWt/Model15.jpg",
  "https://i.ibb.co/fVpR0d5r/Model16.jpg",
  "https://i.ibb.co/Pv2SP5RY/Model17.jpg",
  "https://i.ibb.co/0VKsjbD8/Model18.jpg",
  "https://i.ibb.co/gbf1B8Lk/Model19.jpg",
  "https://i.ibb.co/hGYzkx8/Model20.jpg",
  "https://i.ibb.co/KpjfhPj1/Model21.jpg",
  "https://i.ibb.co/pvz2txYp/Model22.jpg",
  "https://i.ibb.co/VWvqqFpw/Model23.jpg",
  "https://i.ibb.co/fY2GJm33/Model24.jpg",
  "https://i.ibb.co/KcZp8RWd/Model25.jpg",
  "https://i.ibb.co/yn066QDv/Model26.jpg",
  "https://i.ibb.co/gbkyFJL0/Model27.jpg",
  "https://i.ibb.co/tRpmDHY/Model28.jpg",
  "https://i.ibb.co/LhszgXf9/Model29.jpg",
  "https://i.ibb.co/BHkrSjwd/Model31.jpg",
  "https://i.ibb.co/Z1tLQymN/Model32.jpg",
  "https://i.ibb.co/DDvgRJRm/Model34.jpg",
  "https://i.ibb.co/Q7MyC7p6/Model35.jpg",
  "https://i.ibb.co/ccM1x8cp/Model36.jpg",
  "https://i.ibb.co/F2bJ6nF/Model37.jpg",
  "https://i.ibb.co/4ZJHc9GR/Model38.jpg",
  "https://i.ibb.co/60qcdcs8/Model39.jpg",
  "https://i.ibb.co/wr8bwHYs/Model40.jpg",
  "https://i.ibb.co/Wv1ZQQTB/Model41.jpg",
  "https://i.ibb.co/23ScFBwB/Model42.jpg",
  "https://i.ibb.co/TBg6wXrz/Model43.jpg",
  "https://i.ibb.co/XrH0c30T/Model44.jpg",
  "https://i.ibb.co/7xmhM0s1/Model45.jpg",
  "https://i.ibb.co/8nHzDPhn/Model46.jpg",
  "https://i.ibb.co/qLh6cL7s/Model47.jpg",
  "https://i.ibb.co/zT7K4Cg6/Model48.jpg",
  "https://i.ibb.co/dsMyXqP5/Model49.jpg",
  "https://i.ibb.co/gbSFtgH7/Model50.jpg",
  "https://i.ibb.co/m5ThspK8/Model51.jpg",
  "https://i.ibb.co/Y4kBm25T/Model52.jpg",
  "https://i.ibb.co/MDnbgW30/Model53.jpg",
  "https://i.ibb.co/FbgdN5GR/Model54.jpg",
  "https://i.ibb.co/dsjxn8XG/Model55.jpg",
  "https://i.ibb.co/BKsdvZLJ/Model56.jpg",
  "https://i.ibb.co/yn60cP1b/Model57.jpg",
  "https://i.ibb.co/xK4x7zXr/Model58.jpg",
  "https://i.ibb.co/XxRP5z2z/Model59.jpg",
  "https://i.ibb.co/JjvyppXn/Model60.jpg",
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
            <Reveal key={src} delay={Math.min(0.25 + i * 0.03, 0.8)}>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-xl)] border hairline">
                <Image
                  src={src}
                  alt={t("title")}
                  fill
                  priority={i < 4}
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