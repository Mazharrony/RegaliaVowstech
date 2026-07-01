import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/home/CTASection";

const gallery = [
  "https://i.ibb.co/tPC2fMMH/sal-6.jpg",
  "https://i.ibb.co/BVn0B49D/sal-8.jpg",
  "https://i.ibb.co/84LtdqYB/sal-14.jpg",
  "https://i.ibb.co/Dgs7CD02/sal-21.jpg",
  "https://i.ibb.co/zWMtWGcL/sal-23.jpg",
  "https://i.ibb.co/GvfyVFXH/sal-9.jpg",
  "https://i.ibb.co/s87HF3t/sal-16.jpg",
  "https://i.ibb.co/HLHMxPML/sal-3.jpg",
  "https://i.ibb.co/B26hmnHD/sal-17.jpg",
  "https://i.ibb.co/jskMqg4/sal-20.jpg",
  "https://i.ibb.co/0RDSBWnB/1111.jpg",
  "https://i.ibb.co/5gjt7dR5/Enorsia-e-Comm-7-June-2176.jpg",
  "https://i.ibb.co/pjynCMD8/Enorsia-Villa-Set1-9-1.jpg",
  "https://i.ibb.co/gMh1T4My/Enorsia-Villa-Set1-16.jpg",
  "https://i.ibb.co/kVRtLyKy/ILCE-7-M31086.jpg",
  "https://i.ibb.co/kgnYkZQj/ILCE-7-M31099.jpg",
  "https://i.ibb.co/MxjnGWjz/ILCE-7-M31273.jpg",
  "https://i.ibb.co/9kbnNq7p/Enorsia-e-Comm-5-June-031.jpg",
  "https://i.ibb.co/KprP6Q1S/Enorsia-e-Comm-5-June-1001.jpg",
  "https://i.ibb.co/kg2p80bN/Enorsia-e-Comm-5-June-1056.jpg",
  "https://i.ibb.co/dSPyCgM/Enorsia-e-Comm-5-June-1217.jpg",
  "https://i.ibb.co/27Y78sjg/Enorsia-e-Comm-5-June-1333.jpg",
  "https://i.ibb.co/DHg6sLWQ/Enorsia-e-Comm-7-June-160.jpg",
  "https://i.ibb.co/4wGxvkPL/Enorsia-e-Comm-5-June-1425.jpg",
  "https://i.ibb.co/ycKj73yc/Enorsia-e-Comm-7-June-166.jpg",
  "https://i.ibb.co/27PGSw0Q/Enorsia-e-Comm-7-June-297.jpg",
  "https://i.ibb.co/hFqtYymz/Enorsia-e-Comm-7-June-690.jpg",
  "https://i.ibb.co/rRbtWwFc/Enorsia-e-Comm-7-June-1290.jpg",
  "https://i.ibb.co/zqcgK60/Enorsia-e-Comm-7-June-2095.jpg",
  "https://i.ibb.co/TDTh6gsn/Enorsia-Villa-Set1-2.jpg",
  "https://i.ibb.co/VkznkTp/Enorsia-Villa-Set1-2.jpg",
  "https://i.ibb.co/PvKWk1qv/Enorsia-Villa-Set1-2-1.jpg",
  "https://i.ibb.co/QFRfWYJb/Enorsia-Villa-Set1-6.jpg",
  "https://i.ibb.co/N27t49kV/Enorsia-Villa-Set1-11.jpg",
  "https://i.ibb.co/67sQyp7M/Enorsia-Villa-Set1-12.jpg",
  "https://i.ibb.co/PZpHwgqw/Enorsia-Villa-Set1-13.jpg",
  "https://i.ibb.co/JjmdvBdD/ghgg.jpg",
  "https://i.ibb.co/HLKtrmhq/ILCE-7-M31095.jpg",
  "https://i.ibb.co/zh3QHth4/ILCE-7-M31139.jpg",
  "https://i.ibb.co/tPYd6PkD/ILCE-7-M31165.jpg",
  "https://i.ibb.co/Ps1N1rmY/ILCE-7-M31224.jpg",
  "https://i.ibb.co/Pvk9wGVw/ILCE-7-M31224-1.jpg",
  "https://i.ibb.co/nNwgcgZf/Enorsia-e-Comm-5-June-1193.jpg",
  "https://i.ibb.co/s96kmvLJ/Enorsia-e-Comm-7-June-1462.jpg",
  "https://i.ibb.co/JRBRJNDk/Enorsia-e-Comm-7-June-1684.jpg",
  "https://i.ibb.co/0yKZHtY3/ILCE-7-M31110.jpg",
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
