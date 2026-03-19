"use client";

interface PhotoFrameProps {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
  position?: string;
}

export default function PhotoFrame({
  src,
  alt,
  aspect = "aspect-[4/3]",
  className = "",
  priority = false,
  position = "center",
}: PhotoFrameProps) {
  return (
    <div
      className={`group relative ${aspect} bg-[var(--color-bg-surface)] overflow-hidden ${className}`}
    >
      {/* Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover brightness-[0.85] contrast-[1.1] saturate-[0.85] transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ objectPosition: position }}
        loading={priority ? "eager" : "lazy"}
      />

      {/* Dark vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/70 via-black/20 to-[var(--color-bg)]/30 pointer-events-none" />

      {/* Brand overlay — centered, more visible */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-3 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
          {/* Top line */}
          <div className="w-[50px] md:w-[60px] h-px bg-white/70" />
          {/* Brand name */}
          <span className="font-[family-name:var(--font-cormorant)] text-[1.5rem] md:text-[1.8rem] lg:text-[2rem] font-light uppercase tracking-[0.4em] text-white/80 select-none [text-shadow:_0_0_24px_rgba(0,0,0,0.9),_0_2px_10px_rgba(0,0,0,1)]">
            MeZen
          </span>
          {/* Bottom line */}
          <div className="w-[50px] md:w-[60px] h-px bg-white/70" />
        </div>
      </div>

      {/* Inner border */}
      <div className="absolute inset-[8px] md:inset-[12px] border border-white/[0.06] pointer-events-none transition-all duration-700 group-hover:inset-[12px] md:group-hover:inset-[16px] group-hover:border-white/[0.1]" />
    </div>
  );
}
