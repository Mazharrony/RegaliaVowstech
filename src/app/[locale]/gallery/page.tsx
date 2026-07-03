import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { photos } from "@/content/gallery";
import { CorporateGallery } from "@/components/sections/CorporateGallery";
import { Reveal } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/gallery`,
      languages: { en: "/en/gallery", ar: "/ar/gallery", "x-default": "/en/gallery" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/gallery`,
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      images: [{ url: "/media/Corporate/coreporate81.JPEG", width: 1200, height: 800, alt: "Corporate photography gallery — Regalia Vows Tech Dubai" }],
    },
    twitter: {
      title,
      description,
      images: ["/media/Corporate/coreporate81.JPEG"],
    },
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");

  return (
    <main className="pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="container-x">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <Reveal>
            <p className="eyebrow mb-4">{t("eyebrow")}</p>
            <h1 className="display-2 text-balance">{t("headline")}</h1>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
              {t("subhead")}
            </p>
          </Reveal>
        </div>

        {/* Gallery */}
        <CorporateGallery photos={photos} />
      </div>
    </main>
  );
}
