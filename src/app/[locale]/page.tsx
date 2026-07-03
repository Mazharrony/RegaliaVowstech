import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/home/Hero";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { AboutTeaser } from "@/components/sections/home/AboutTeaser";
import { SelectedWork } from "@/components/sections/home/SelectedWork";
import { ProcessStrip } from "@/components/sections/home/ProcessStrip";
import { LatestInsights } from "@/components/sections/home/LatestInsights";
import { Testimonials } from "@/components/sections/home/Testimonials";
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
      <SelectedWork />
      <ProcessStrip />
      <LatestInsights />
      <Testimonials />
      <CTASection />
    </>
  );
}
