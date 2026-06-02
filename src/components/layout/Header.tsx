"use client";

import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { cn, easings } from "@/lib/utils";
import { company } from "@/content/company";

type NavKey =
  | "services"
  | "work"
  | "about"
  | "insights"
  | "process"
  | "contact"
  | "more";

type NavItem = { href: string; key: NavKey };

const PRIMARY: NavItem[] = [
  { href: "/services", key: "services" },
  { href: "/work", key: "work" },
  { href: "/process", key: "process" },
  { href: "/insights", key: "insights" },
];

const MORE: NavItem[] = [
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
];

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group inline-flex items-baseline font-serif text-[1.15rem] font-semibold tracking-[-0.02em] md:text-[1.2rem]"
      aria-label="Regalia Vows Tech — Home"
    >
      <span>Regalia</span>
      <span className="text-[var(--color-accent)] transition-transform duration-700 group-hover:scale-150">
        .
      </span>
    </Link>
  );
}

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-full px-3 py-1.5 text-[0.88rem] font-medium tracking-[-0.01em] transition-colors",
        active
          ? "bg-[color-mix(in_srgb,var(--color-ink)_8%,transparent)] text-[var(--color-ink)]"
          : "text-[var(--color-ink-soft)] hover:bg-[color-mix(in_srgb,var(--color-ink)_5%,transparent)] hover:text-[var(--color-ink)]"
      )}
    >
      <span>{label}</span>
    </Link>
  );
}

function MoreMenu({
  pathname,
  label,
  eyebrow,
  items,
}: {
  pathname: string;
  label: string;
  eyebrow: string;
  items: { href: string; label: string; desc: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  useEffect(() => () => clearClose(), []);

  const hasActive = items.some((m) => pathname.startsWith(m.href));

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        clearClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onFocus={clearClose}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[0.88rem] font-medium tracking-[-0.01em] transition-colors",
          hasActive || open
            ? "bg-[color-mix(in_srgb,var(--color-ink)_8%,transparent)] text-[var(--color-ink)]"
            : "text-[var(--color-ink-soft)] hover:bg-[color-mix(in_srgb,var(--color-ink)_5%,transparent)] hover:text-[var(--color-ink)]"
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: easings.apple }}
            style={{ transformOrigin: "top right" }}
            className="glass-strong absolute end-0 mt-3 w-[320px] overflow-hidden rounded-[var(--radius-xl)] p-2"
          >
            <p className="px-3 pb-2 pt-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              {eyebrow}
            </p>
            <ul className="flex flex-col gap-0.5">
              {items.map((m) => {
                const active = pathname.startsWith(m.href);
                return (
                  <li key={m.href}>
                    <Link
                      href={m.href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group/item flex items-start gap-3 rounded-[var(--radius-md)] px-3 py-3 transition-colors",
                        active
                          ? "bg-[color-mix(in_srgb,var(--color-ink)_8%,transparent)]"
                          : "hover:bg-[color-mix(in_srgb,var(--color-ink)_5%,transparent)]"
                      )}
                    >
                      <span className="flex-1">
                        <span
                          className={cn(
                            "block text-[1rem] font-semibold leading-tight tracking-[-0.015em]",
                            "text-[var(--color-ink)]"
                          )}
                        >
                          {m.label}
                        </span>
                        <span className="mt-1 block text-[0.82rem] leading-snug text-[var(--color-muted)]">
                          {m.desc}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="mt-1 h-4 w-4 shrink-0 text-[var(--color-muted)] transition-all duration-300 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-[var(--color-ink)] rtl:group-hover/item:-translate-x-0.5"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Close overlay on route change
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  // Focus trap + Escape inside overlay
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !overlayRef.current) return;
      const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const headerSolid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          headerSolid ? "pt-2 md:pt-3" : "pt-2 md:pt-3"
        )}
      >
        <div
          className={cn(
            "container-wide flex items-center justify-between rounded-[var(--radius-pill)] transition-all duration-500",
            "mx-auto h-14 px-4 md:h-[60px] md:px-5",
            headerSolid
              ? "glass"
              : "border border-transparent bg-transparent"
          )}
          style={{ maxWidth: "min(1200px, calc(100% - 1.5rem))" }}
        >
          {/* Left: brand + desktop nav */}
          <div className="flex items-center gap-3 md:gap-5">
            <Brand onClick={() => setOpen(false)} />
            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 md:flex"
            >
              {PRIMARY.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={t(item.key)}
                  active={isActive(item.href)}
                />
              ))}
              <MoreMenu
                pathname={pathname}
                label={t("more")}
                eyebrow={t("moreEyebrow")}
                items={MORE.map((m) => ({
                  href: m.href,
                  label: t(m.key),
                  desc: t(`${m.key}Desc` as "aboutDesc" | "contactDesc"),
                }))}
              />
            </nav>
          </div>

          {/* Right: locale + CTA + burger */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:block">
              <LocaleSwitcher />
            </div>
            <Link
              href="/contact"
              className="btn-ios btn-ios-primary btn-ios-sm hidden md:inline-flex"
            >
              <span>{tCommon("startProject")}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              ref={burgerRef}
              type="button"
              className="relative -me-2 inline-flex h-10 w-10 items-center justify-center md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? tCommon("close") : tCommon("menu")}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <span className="sr-only">
                {open ? tCommon("close") : tCommon("menu")}
              </span>
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
            id="mobile-nav"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label={tCommon("menu")}
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: easings.appleEntrance }}
            className="glass-strong fixed inset-0 z-40 flex flex-col bg-[var(--color-bg)] pt-16 md:hidden"
          >
            <div className="container-x flex flex-1 flex-col overflow-y-auto pb-10 pt-6">
              <nav aria-label="Primary mobile" className="flex flex-col">
                {PRIMARY.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.08 + i * 0.05,
                      duration: 0.55,
                      ease: easings.out,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-baseline justify-between gap-4 border-b hairline py-5"
                    >
                      <span className="font-serif text-4xl tracking-tight">
                        {t(item.key)}
                      </span>
                      <span className="font-mono text-xs text-[var(--color-muted)] tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {MORE.length > 0 && (
                <div className="mt-10">
                  <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-[var(--color-muted)]">
                    {t("moreEyebrow")}
                  </p>
                  <nav aria-label="Secondary mobile" className="flex flex-col">
                    {MORE.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="group/m flex items-start justify-between gap-4 border-b hairline py-4"
                      >
                        <span className="flex-1">
                          <span className="block font-serif text-2xl tracking-tight">
                            {t(item.key)}
                          </span>
                          <span className="mt-1 block text-sm text-[var(--color-muted)]">
                            {t(
                              `${item.key}Desc` as
                                | "aboutDesc"
                                | "contactDesc"
                            )}
                          </span>
                        </span>
                        <ArrowUpRight className="mt-1.5 h-4 w-4 shrink-0 text-[var(--color-muted)] transition-all duration-300 group-hover/m:-translate-y-0.5 group-hover/m:translate-x-0.5 group-hover/m:text-[var(--color-ink)] rtl:group-hover/m:-translate-x-0.5" />
                      </Link>
                    ))}
                  </nav>
                </div>
              )}

              <div className="mt-auto pt-10">
                <div className="mb-6">
                  <LocaleSwitcher />
                </div>

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


