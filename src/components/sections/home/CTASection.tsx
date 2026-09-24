"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ScrollText } from "@/components/motion/ScrollText";
import { company } from "@/content/company";
import { cn } from "@/lib/utils";

/** Blurred light-tone blobs (they only lighten the orange, so ink stays ≥ 6.5:1); each parallaxes at its own speed. */
const BLOBS = [
  { tone: "tone-blush", speed: 0.45, className: "-start-40 top-[8%] h-[min(34rem,90vw)] w-[min(34rem,90vw)] opacity-55" },
  { tone: "tone-lilac", speed: -0.3, className: "-end-32 bottom-[-12%] h-[min(30rem,80vw)] w-[min(30rem,80vw)] opacity-60" },
  { tone: "tone-citrus", speed: 0.8, className: "end-[12%] -top-16 h-[min(16rem,50vw)] w-[min(16rem,50vw)] opacity-50" },
] as const;

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
    <section className="slab relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {BLOBS.map((b) => (
          <Parallax key={b.tone} speed={b.speed} className={cn("absolute", b.className)} innerClassName="h-full w-full">
            <div className={cn(b.tone, "h-full w-full rounded-full bg-tone-base blur-[90px]")} />
          </Parallax>
        ))}
      </div>

      <div className="container-wide relative section-pad-lg">
        <Reveal>
          <p className="eyebrow mb-6 inline-flex items-center gap-2">
            <span aria-hidden className="spectrum-rule" />
            {t("ctaEyebrow")}
          </p>
        </Reveal>

        <ScrollText
          as="h2"
          text={t("ctaTitle")}
          className="mega max-w-[16ch] text-balance text-ink"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.2} className="lg:col-span-5">
            <p className="text-ink/85" style={{ fontSize: "var(--step-1)" }}>
              {t("ctaBody")}
            </p>
          </Reveal>

          <Reveal delay={0.3} className="lg:col-span-7 lg:flex lg:justify-end">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="btn btn-solid btn-lg"
              >
                {tCommon("startProject")}
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
              <button
                type="button"
                onClick={copyEmail}
                className="btn btn-outline btn-lg"
              >
                <span className="truncate">{company.email}</span>
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-ink" />
                ) : (
                  <Copy className="h-3.5 w-3.5 opacity-70" />
                )}
              </button>
              {/* The icon swap is silent to screen readers; announce the copy */}
              <span className="sr-only" aria-live="polite">
                {copied ? tCommon("emailCopied") : ""}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
