import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { company } from "@/content/company";

export function AboutTeaser() {
  const t = useTranslations("home");
  const tStats = useTranslations("stats");
  const tCommon = useTranslations("common");

  return (
    <section className="slab-dark relative overflow-hidden">
      {/* Subtle accent diagonals */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--color-accent) 0 1px, transparent 1px 64px)",
        }}
      />

      <div className="container-wide relative section-pad-lg">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6 inline-flex items-center gap-2">
                <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
                {t("aboutEyebrow")}
              </p>
            </Reveal>
            <MaskReveal>
              <h2 className="display-1 max-w-[18ch] text-balance text-[var(--color-bg)]">
                {t("aboutTitle")}
              </h2>
            </MaskReveal>
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-xl text-[var(--color-muted-dark)]" style={{ fontSize: "var(--step-1)" }}>
                {t("aboutBody")}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href="/about"
                className="btn-ios btn-ios-secondary mt-10"
              >
                {tCommon("learnMore")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:col-span-5 lg:gap-x-10">
            {(["years", "projects", "clients", "countries"] as const).map((k, i) => (
              <Reveal key={k} delay={0.1 * i}>
                <div className="border-t border-[var(--color-line-dark)] pt-5">
                  <p
                    className="font-serif text-[var(--color-bg)]"
                    style={{ fontSize: "var(--step-5)", lineHeight: 0.95 }}
                  >
                    {company.stats[k]}
                  </p>
                  <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted-dark)]">
                    {tStats(k)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
