"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { GALLERY_IMAGES } from "@/data/gallery-images";
import PhotoFrame from "@/components/PhotoFrame";

interface GalleryProps {
  dict: {
    items: string[];
    closeLightbox: string;
    previousImage: string;
    nextImage: string;
    viewLabel: string;
  };
}

export default function Gallery({ dict }: GalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lightbox === null) return;
      const next = lightbox + dir;
      setLightbox(next < 0 ? GALLERY_IMAGES.length - 1 : next >= GALLERY_IMAGES.length ? 0 : next);
    },
    [lightbox]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, navigate]);

  return (
    <section className="pb-[clamp(5rem,10vw,10rem)] px-6 md:px-10 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 reveal">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setLightbox(i)}
              className="relative overflow-hidden group cursor-pointer bg-[var(--color-bg-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
              aria-label={`${dict.viewLabel}: ${img.alt}`}
            >
              <PhotoFrame
                src={img.src}
                alt={img.alt}
                aspect="aspect-[1/1]"
              />
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div
            className="relative w-[90vw] h-[70vh] md:w-[80vw] md:h-[75vh] lg:w-[70vw] lg:h-[80vh] max-w-[1100px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY_IMAGES[lightbox].src}
              alt={GALLERY_IMAGES[lightbox].alt}
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
              className="object-contain"
              quality={85}
            />

            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 lg:top-5 lg:right-5 w-11 h-11 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
              aria-label={dict.closeLightbox}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="2" y1="2" x2="18" y2="18" />
                <line x1="18" y1="2" x2="2" y2="18" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-2 lg:left-5 top-1/2 -translate-y-1/2 w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-2xl lg:text-3xl"
              aria-label={dict.previousImage}
            >
              ‹
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-2 lg:right-5 top-1/2 -translate-y-1/2 w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-2xl lg:text-3xl"
              aria-label={dict.nextImage}
            >
              ›
            </button>

            <div className="absolute bottom-3 lg:bottom-5 left-1/2 -translate-x-1/2 text-[0.65rem] text-[var(--color-text-muted)] tracking-[0.15em] uppercase">
              {lightbox + 1} / {GALLERY_IMAGES.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
