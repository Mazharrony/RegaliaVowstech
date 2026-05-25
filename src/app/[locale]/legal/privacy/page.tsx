import { setRequestLocale, getTranslations } from "next-intl/server";
import { LegalDocument } from "@/components/sections/LegalDocument";

export async function generateMetadata() {
  const t = await getTranslations("legal");
  return { title: t("privacy") };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument namespace="privacyPage" />;
}
