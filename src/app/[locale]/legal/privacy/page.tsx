import { setRequestLocale, getTranslations } from "next-intl/server";

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

  return (
    <article className="container-x py-20 md:py-32">
      <p className="eyebrow mb-8">Legal</p>
      <h1 className="display-1 max-w-3xl text-balance">Privacy.</h1>
      <div className="prose-editorial mt-16 max-w-3xl space-y-6 text-[var(--color-muted)] md:text-lg">
        <p>
          This is a placeholder privacy notice for Regalia Vows Tech. We
          collect only the information needed to respond to enquiries and to
          deliver the work we are engaged to perform, and we do not sell or
          share personal data with third parties for marketing.
        </p>
        <p>
          For questions about your data or to request deletion, write to{" "}
          <a className="underline" href="mailto:hello@regaliavowstech.com">
            hello@regaliavowstech.com
          </a>
          .
        </p>
        <p className="text-xs">Last updated: replace before launch.</p>
      </div>
    </article>
  );
}
