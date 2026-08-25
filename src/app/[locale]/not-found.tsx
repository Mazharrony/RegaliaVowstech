import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Destination = { label: string; href: string; description: string };

export default function NotFound() {
  const t = useTranslations("notFound");
  const destinations = t.raw("destinations") as Destination[];
  return (
    <>
      <section className="container-x flex min-h-[60vh] flex-col items-start justify-center gap-10 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
          404
        </p>
        <h1 className="display-1 max-w-3xl text-balance">{t("title")}</h1>
        <p className="max-w-xl text-lg text-[var(--color-muted)] md:text-xl">
          {t("body")}
        </p>
        <Link
          href="/"
          className="btn btn-solid btn-lg"
        >
          ← {t("back")}
        </Link>
      </section>

      <section className="border-t hairline bg-[var(--color-bg-alt)]">
        <div className="container-x py-16 md:py-24">
          <p className="eyebrow mb-8 inline-flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-px w-6 bg-[var(--color-accent)]"
            />
            {t("destinationsEyebrow")}
          </p>
          <ul className="grid gap-px bg-[var(--color-line)] md:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="group flex h-full items-start justify-between gap-4 bg-[var(--color-bg)] p-6 transition-colors hover:bg-[var(--color-bg-alt)] md:p-8"
                >
                  <div>
                    <p className="font-serif text-xl md:text-2xl">{d.label}</p>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                      {d.description}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
