"use client";

import { useEffect, useState } from "react";

type Item = { id: string; heading: string };
type Props = { items: Item[]; title: string };

export function TocSidebar({ items, title }: Props) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 1] },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={title} className="lg:sticky lg:top-28">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {title}
      </p>
      <ol className="mt-6 space-y-3 border-l hairline">
        {items.map((it, i) => {
          const isActive = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`block border-l-2 pl-4 text-sm transition-colors ${
                  isActive
                    ? "border-l-[var(--color-fg)] text-[var(--color-ink)]"
                    : "border-l-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                <span className="mr-2 font-mono text-[0.65rem] uppercase tracking-[0.18em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {it.heading}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
