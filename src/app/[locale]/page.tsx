import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/home/Hero";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { AboutTeaser } from "@/components/sections/home/AboutTeaser";
import { Metrics } from "@/components/sections/home/Metrics";
import { GalleryTeaser } from "@/components/sections/home/GalleryTeaser";
import { ProcessStrip } from "@/components/sections/home/ProcessStrip";
import { CTASection } from "@/components/sections/home/CTASection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      locale: locale === "ar" ? "ar_AE" : "en_AE",
    },
    twitter: { title, description },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ServicesGrid />
      <AboutTeaser />
      <Metrics />
      <GalleryTeaser />
      <ProcessStrip />
      <CTASection />
    </>
  );
}
