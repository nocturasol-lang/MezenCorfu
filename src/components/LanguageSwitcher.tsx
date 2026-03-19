"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

const LANGUAGES: { code: string; label: string }[] = [
  { code: "el", label: "Ελληνικά" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "fr", label: "Français" },
  { code: "ru", label: "Русский" },
];

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const otherLanguages = LANGUAGES.filter((l) => l.code !== locale);

  const switchLocale = (targetLocale: string) => {
    document.cookie = `NEXT_LOCALE=${targetLocale};path=/;max-age=31536000;SameSite=Lax`;
    const newPath = pathname.replace(`/${locale}`, `/${targetLocale}`);
    setOpen(false);
    router.push(newPath);
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, handleClickOutside]);

  // Arc geometry: sweeps from 10 o'clock to 6 o'clock (avoids header text overlap)
  // Start at 30° (slightly left-down) → end at 90° (directly below)
  const arcRadius = 120;
  const startAngle = 20; // degrees from top-left
  const endAngle = 100;  // slightly past directly below

  const getArcPosition = (index: number, count: number) => {
    const t = count === 1 ? 0.5 : index / (count - 1);
    const deg = startAngle + t * (endAngle - startAngle);
    const rad = (deg * Math.PI) / 180;
    return {
      x: -Math.cos(rad) * arcRadius,
      y: Math.sin(rad) * arcRadius,
    };
  };

  return (
    <div ref={containerRef} className="relative z-[102]">
      {/* Trigger circle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-[34px] h-[34px] rounded-full border border-white/20 flex items-center justify-center text-[10px] font-semibold uppercase tracking-[1.5px] text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
        style={{
          transform: open ? "scale(0.92)" : "scale(1)",
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        aria-label="Change language"
        aria-expanded={open}
      >
        {locale.toUpperCase()}
      </button>

      {/* Arc options */}
      {otherLanguages.map((lang, i) => {
        const pos = getArcPosition(i, otherLanguages.length);

        return (
          <button
            key={lang.code}
            onClick={() => switchLocale(lang.code)}
            className="absolute group flex items-center justify-center"
            style={{
              left: "50%",
              top: "50%",
              width: 34,
              height: 34,
              marginLeft: -17,
              marginTop: -17,
              transform: open
                ? `translate(${pos.x}px, ${pos.y}px) scale(1)`
                : "translate(0, 0) scale(0.3)",
              opacity: open ? 1 : 0,
              transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 70}ms, opacity 0.3s ease ${open ? i * 70 : 0}ms`,
              pointerEvents: open ? "auto" : "none",
            }}
            aria-label={`Switch to ${lang.label}`}
          >
            {/* Circle with code */}
            <span
              className="w-[36px] h-[36px] rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-[10px] font-semibold uppercase tracking-[1.5px] text-white/90 backdrop-blur-md transition-all duration-300 group-hover:scale-[1.15] group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-bg)]"
            >
              {lang.code.toUpperCase()}
            </span>

            {/* Full name tooltip — appears on hover */}
            <span
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-[var(--color-bg-overlay)]/95 border border-white/10 rounded text-[9px] font-medium tracking-[1px] text-white/70 whitespace-nowrap opacity-0 scale-90 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:scale-100"
            >
              {lang.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
