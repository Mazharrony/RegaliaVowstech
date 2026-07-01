"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Photo } from "@/content/gallery";

interface Props {
  photos: Photo[];
  limit?: number;
}

export function CorporateGallery({ photos: allPhotos, limit }: Props) {
  const t = useTranslations("gallery");
  const photos = limit ? allPhotos.slice(0, limit) : allPhotos;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = useCallback((idx: number) => setLightboxIndex(idx), []);
  const close = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, [photos.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

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

  const currentPhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <>
      {/* Masonry grid */}
      <div
        className="columns-2 gap-3 sm:columns-3 lg:columns-4"
        style={{ columnFill: "balance" }}
      >
        {photos.map((photo, idx) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => open(idx)}
            className="group mb-3 block w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-lg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            aria-label={photo.alt}
          >
            <div className="relative w-full overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={400}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading={idx < 8 ? "eager" : "lazy"}
              />
            </div>
          </button>
        ))}
      </div>

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
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label={t("lightboxPrev")}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
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
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label={t("lightboxNext")}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
