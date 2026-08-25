"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { GalleryCategory, Photo } from "@/content/gallery";
import { galleryCategories } from "@/content/gallery";
import { cn } from "@/lib/utils";

interface Props {
  photos: Photo[];
  limit?: number;
}

const PHOTOS_PER_PAGE = 12;

export function CorporateGallery({ photos: allPhotos, limit }: Props) {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const isRtl = locale === "ar";

  // Category filter — only used when not in teaser/limit mode
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | null>(null);

  // Derive which categories are present in the supplied photos and their counts
  const categoryCounts = useMemo(() => {
    const counts = allPhotos.reduce<Partial<Record<GalleryCategory, number>>>((acc, p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1;
      return acc;
    }, {});
    return counts;
  }, [allPhotos]);

  // The categories to show in the filter, in declared order, only those present
  const visibleCategories = useMemo(
    () => galleryCategories.filter((c) => (categoryCounts[c] ?? 0) > 0),
    [categoryCounts],
  );

  // Filtered then optionally limited set
  const photos = useMemo(() => {
    const base = activeCategory
      ? allPhotos.filter((p) => p.category === activeCategory)
      : allPhotos;
    return limit ? base.slice(0, limit) : base;
  }, [allPhotos, activeCategory, limit]);

  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(photos.length / PHOTOS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PHOTOS_PER_PAGE;
  const pagePhotos = photos.slice(pageStart, pageStart + PHOTOS_PER_PAGE);

  // Reset to page 1 when category changes
  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = useCallback((idx: number) => setLightboxIndex(idx), []);
  const close = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + pagePhotos.length) % pagePhotos.length
    );
  }, [pagePhotos.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % pagePhotos.length));
  }, [pagePhotos.length]);

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);


  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIndex, close, prev, next]);

  // Lock body scroll & focus close button
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      // Delay focus so the element is visible first
      const id = setTimeout(() => closeRef.current?.focus(), 50);
      return () => {
        clearTimeout(id);
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [lightboxIndex]);

  const currentPhoto = lightboxIndex !== null ? pagePhotos[lightboxIndex] : null;
  const paginationLabel = t("paginationLabel");

  return (
    <>
      {/* Category filter — hidden in teaser/limit mode and when only one category present */}
      {!limit && visibleCategories.length > 1 && (
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:mb-10">
          <p className="eyebrow inline-flex items-center gap-2">
            <span aria-hidden className="inline-block h-px w-6 bg-[var(--color-accent)]" />
            {t("filterEyebrow")}
          </p>
          <ul className="flex flex-wrap gap-2">
            <li>
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                aria-pressed={activeCategory === null}
                className={
                  activeCategory === null
                    ? "inline-flex h-8 items-center rounded-full bg-[var(--color-ink)] px-3.5 text-[0.75rem] font-semibold tracking-[-0.005em] text-[var(--color-bg)]"
                    : "inline-flex h-8 items-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface-muted)] px-3.5 text-[0.75rem] font-medium tracking-[-0.005em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                }
              >
                {t("filterAll")} · {allPhotos.length}
              </button>
            </li>
            {visibleCategories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(active ? null : cat)}
                    aria-pressed={active}
                    className={
                      active
                        ? "inline-flex h-8 items-center rounded-full bg-[var(--color-ink)] px-3.5 text-[0.75rem] font-semibold tracking-[-0.005em] text-[var(--color-bg)]"
                        : "inline-flex h-8 items-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface-muted)] px-3.5 text-[0.75rem] font-medium tracking-[-0.005em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                    }
                  >
                    {t(`category.${cat}`)} · {categoryCounts[cat]}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Masonry grid */}
      <div
        className="columns-2 gap-3 sm:columns-3 lg:columns-4"
        style={{ columnFill: "balance" }}
      >
        {pagePhotos.map((photo, idx) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => open(idx)}
            className="group mb-3 block w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-lg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            aria-label={photo.alt}
          >
            <div className="photo photo-plain relative w-full overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={400}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading={pageStart + idx < 8 ? "eager" : "lazy"}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Pagination */}
      {photos.length > PHOTOS_PER_PAGE && (
        <nav aria-label={paginationLabel} className="mt-10 flex flex-col items-center gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            {t("paginationSummary", {
              current: currentPage,
              total: totalPages,
              count: photos.length,
            })}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={currentPage === 1}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-line)] px-4 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-ink)_4%,transparent)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isRtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              {t("paginationPrev")}
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((value) => {
              const active = value === currentPage;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPage(value)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-[var(--color-ink)] text-[var(--color-bg)]"
                      : "border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[color-mix(in_srgb,var(--color-ink)_4%,transparent)]"
                  )}
                >
                  {value}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-line)] px-4 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-ink)_4%,transparent)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("paginationNext")}
              {isRtl ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      )}

      {/* Lightbox */}
      {currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentPhoto.alt}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          {/* Counter */}
          <p className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.18em] text-white/60">
            {lightboxIndex! + 1} / {photos.length}
          </p>

          {/* Close */}
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={t("lightboxClose")}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label={t("lightboxPrev")}
            className="absolute start-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:start-6"
          >
            {isRtl ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
          </button>

          {/* Image */}
          <div
            className="relative mx-16 max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={currentPhoto.id}
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              width={1200}
              height={900}
              sizes="90vw"
              className="max-h-[90vh] w-auto max-w-[90vw] rounded-[var(--radius-lg)] object-contain shadow-2xl"
              priority
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label={t("lightboxNext")}
            className="absolute end-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:end-6"
          >
            {isRtl ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
          </button>
        </div>
      )}
    </>
  );
}
