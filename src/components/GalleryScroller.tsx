"use client";

import { useRef } from "react";
import Link from "next/link";
import { GALLERY_IMAGES } from "@/data/gallery-images";
import PhotoFrame from "@/components/PhotoFrame";

export default function GalleryScroller({
  lang,
  allPhotosLabel,
  titles,
}: {
  lang: string;
  allPhotosLabel: string;
  titles: string[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector("a") as HTMLElement;
    const distance = card ? card.offsetWidth + 16 : 300;
    scrollRef.current.scrollBy({ left: dir * distance, behavior: "smooth" });
  };

  return (
    <div className="reveal">
      {/* Arrows + scrollable strip */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Left arrow */}
        <button
          onClick={() => scroll(-1)}
          className="flex-shrink-0 w-[40px] h-[40px] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-all duration-300"
          aria-label="Scroll left"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Scrollable strip */}
        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory flex-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <Link
              key={img.src}
              href={`/${lang}/gallery`}
              className="group relative flex-shrink-0 w-[220px] md:w-[270px] lg:w-[310px] snap-start"
            >
              <PhotoFrame src={img.src} alt={img.alt} aspect="aspect-[3/4]" />

              {/* Dish title — hover only */}
              <div className="absolute bottom-0 left-0 right-0 z-10 pt-20 pb-5 px-5 md:pt-24 md:pb-6 md:px-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                <span className="font-[family-name:var(--font-cormorant)] text-[1.15rem] md:text-[1.3rem] lg:text-[1.4rem] font-semibold uppercase tracking-[0.15em] text-white [text-shadow:_0_1px_3px_rgba(0,0,0,0.9),_0_4px_12px_rgba(0,0,0,0.7)]">
                  {titles[i] || ""}
                </span>
              </div>

              {/* Cyan line — grows from center */}
              <div className="h-[2px] mt-2 bg-[var(--color-accent)] origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </Link>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll(1)}
          className="flex-shrink-0 w-[40px] h-[40px] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-all duration-300"
          aria-label="Scroll right"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Centered view all button */}
      <div className="text-center mt-8">
        <Link
          href={`/${lang}/gallery`}
          className="inline-block px-6 py-[7px] border border-white/20 rounded-none text-[11px] md:text-[12px] font-semibold uppercase tracking-[2px] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent)] transition-all duration-300"
        >
          {allPhotosLabel}
        </Link>
      </div>
    </div>
  );
}
