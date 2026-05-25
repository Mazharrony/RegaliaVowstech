import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/home/Hero";
import { ClientsMarquee } from "@/components/sections/home/ClientsMarquee";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { AboutTeaser } from "@/components/sections/home/AboutTeaser";
import { SelectedWork } from "@/components/sections/home/SelectedWork";
import { Metrics } from "@/components/sections/home/Metrics";
import { ProcessStrip } from "@/components/sections/home/ProcessStrip";
import { LatestInsights } from "@/components/sections/home/LatestInsights";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { CTASection } from "@/components/sections/home/CTASection";

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
      <ClientsMarquee />
      <AboutTeaser />
      <ServicesGrid />
      <SelectedWork />
      <Metrics />
      <ProcessStrip />
      <LatestInsights />
      <Testimonials />
      <CTASection />
    </>
  );
}
