import { setRequestLocale, getTranslations } from "next-intl/server";
import { LegalDocument } from "@/components/sections/LegalDocument";

export async function generateMetadata() {
  const t = await getTranslations("legal");
  return { title: t("terms"), robots: { index: false, follow: true } };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument namespace="termsPage" />;
}
