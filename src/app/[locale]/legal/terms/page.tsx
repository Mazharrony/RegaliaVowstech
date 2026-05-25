import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("legal");
  return { title: t("terms") };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <article className="container-x py-20 md:py-32">
      <p className="eyebrow mb-8">Legal</p>
      <h1 className="display-1 max-w-3xl text-balance">Terms.</h1>
      <div className="prose-editorial mt-16 max-w-3xl space-y-6 text-[var(--color-muted)] md:text-lg">
        <p>
          This is a placeholder terms of use notice for the Regalia Vows Tech
          website. Engagements with the studio are governed by the specific
          contracts signed for each project.
        </p>
        <p>
          For any clarification, write to{" "}
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
