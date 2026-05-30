"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { company } from "@/content/company";

export function CTASection() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(company.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <section className="slab-dark relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 rounded-full md:block"
        style={{
          background: "radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 35%, transparent), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container-wide relative section-pad-lg">
        <Reveal>
          <p className="eyebrow mb-6 inline-flex items-center gap-2">
            <span className="inline-block h-px w-8 bg-[var(--color-accent)]" />
            {t("ctaEyebrow")}
          </p>
        </Reveal>

        <MaskReveal>
          <h2 className="mega max-w-[16ch] text-balance text-[var(--color-bg)]">
            {t("ctaTitle")}
          </h2>
        </MaskReveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.2} className="lg:col-span-5">
            <p className="text-[var(--color-muted-dark)]" style={{ fontSize: "var(--step-1)" }}>
              {t("ctaBody")}
            </p>
          </Reveal>

          <Reveal delay={0.3} className="lg:col-span-7 lg:flex lg:justify-end">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="btn-ios btn-ios-primary btn-ios-lg"
              >
                {tCommon("startProject")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={copyEmail}
                className="btn-ios btn-ios-ghost btn-ios-lg"
              >
                <span className="truncate">{company.email}</span>
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                ) : (
                  <Copy className="h-3.5 w-3.5 opacity-70" />
                )}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
