import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { toneClass, toneCycle } from "@/lib/tones";

type Destination = { label: string; href: string; description: string };

export default function NotFound() {
  const t = useTranslations("notFound");
  const destinations = t.raw("destinations") as Destination[];
  return (
    <>
      <section className="container-x flex min-h-[60vh] flex-col items-start justify-center gap-10 py-20">
        <p className="spectrum-text font-serif text-[length:var(--step-5)] font-semibold leading-none tracking-tight">
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
          <span aria-hidden className="rtl:-scale-x-100">←</span>
          <span>{t("back")}</span>
        </Link>
      </section>

      <section className="border-t hairline bg-[var(--color-bg-alt)]">
        <div className="container-x py-16 md:py-24">
          <p className="eyebrow mb-8 inline-flex items-center gap-2">
            <span aria-hidden className="spectrum-rule" />
            {t("destinationsEyebrow")}
          </p>
          <ul className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {destinations.map((d, i) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className={cn(
                    "tone-card group flex h-full min-h-52 flex-col gap-10 rounded-[var(--radius-xl)] p-6 md:p-8",
                    toneClass(toneCycle(i)),
                  )}
                >
                  <ArrowUpRight className="h-6 w-6 shrink-0 self-end transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                  <div className="mt-auto">
                    <p className="font-serif text-[length:var(--step-3)] leading-tight tracking-tight">{d.label}</p>
                    <p className="mt-2 text-sm text-tone-ink-soft">{d.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
