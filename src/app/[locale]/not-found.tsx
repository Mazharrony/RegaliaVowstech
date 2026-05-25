import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-start justify-center gap-10 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
        404
      </p>
      <h1 className="display-1 max-w-3xl text-balance">{t("title")}</h1>
      <p className="max-w-xl text-lg text-[var(--color-muted)] md:text-xl">
        {t("body")}
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bg)] transition-colors hover:bg-[var(--color-accent)]"
      >
        ← {t("back")}
      </Link>
    </section>
  );
}
