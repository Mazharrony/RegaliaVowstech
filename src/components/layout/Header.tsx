"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { cn, easings } from "@/lib/utils";
import { company } from "@/content/company";

const navItems = [
  { href: "/services", key: "services" },
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/process", key: "process" },
  { href: "/insights", key: "insights" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "bg-[var(--color-bg)]/90 backdrop-blur-xl border-b hairline"
            : "bg-transparent"
        )}
      >
        <div className="container-wide flex h-16 items-center justify-between md:h-[72px]">
          <Link
            href="/"
            className="group relative inline-flex items-baseline gap-0.5 font-serif text-[1.15rem] tracking-tight md:text-[1.35rem]"
            onClick={() => setOpen(false)}
          >
            <span>Regalia</span>
            <span className="text-[var(--color-accent)] transition-transform duration-700 group-hover:scale-150">.</span>
            <span className="ms-2 hidden font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[var(--color-muted)] md:inline">
              Vows · Tech
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex items-baseline gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink)]"
              >
                <span className="text-[var(--color-muted-soft)] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="link-wipe">{t(item.key)}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <LocaleSwitcher />
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full border border-[var(--color-ink)] px-5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] md:inline-flex"
            >
              {tCommon("startProject")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? tCommon("close") : tCommon("menu")}
              aria-expanded={open}
            >
              <span className="sr-only">{open ? tCommon("close") : tCommon("menu")}</span>
              <span
                className={cn(
                  "absolute h-px w-6 bg-[var(--color-ink)] transition-transform duration-500",
                  open ? "rotate-45" : "-translate-y-1.5"
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-6 bg-[var(--color-ink)] transition-transform duration-500",
                  open ? "-rotate-45" : "translate-y-1.5"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: easings.out }}
            className="fixed inset-0 z-40 flex flex-col bg-[var(--color-bg)] pt-[72px] lg:hidden"
          >
            <nav className="container-x flex flex-col gap-0 pt-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: easings.out }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between gap-4 border-b hairline py-5"
                  >
                    <span className="font-serif text-4xl tracking-tight">
                      {t(item.key)}
                    </span>
                    <span className="font-mono text-xs text-[var(--color-muted)]">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="container-x mt-auto pb-10 pt-10">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mb-8 inline-flex w-full items-center justify-between rounded-full bg-[var(--color-ink)] px-6 py-4 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-bg)]"
              >
                {tCommon("startProject")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                {company.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-wipe text-[var(--color-ink-soft)]"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                {tCommon("based")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
