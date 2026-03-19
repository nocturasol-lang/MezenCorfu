"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavigationProps {
  lang: string;
  dict: {
    nav: { home: string; philosophy: string; menu: string; gallery: string; ourStory: string; privateDining: string; contact: string };
    common: { reserve: string; skipToContent: string; openMenu: string; closeMenu: string; addressShort: string; phone: string };
  };
  alwaysSolid?: boolean;
}

export default function Navigation({ lang, dict, alwaysSolid = false }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(alwaysSolid);
  const pathname = usePathname();
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (alwaysSolid) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysSolid]);

  const NAV_LINKS = [
    { label: dict.nav.home, href: `/${lang}` },
    { label: dict.nav.menu, href: `/${lang}/menu` },
    { label: dict.nav.gallery, href: `/${lang}/gallery` },
    { label: dict.nav.ourStory, href: `/${lang}/about` },
    { label: dict.nav.privateDining, href: `/${lang}/private-dining` },
    { label: dict.nav.contact, href: `/${lang}/contact` },
  ];

  // iOS-safe scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      // Focus first link after panel animates in
      setTimeout(() => firstLinkRef.current?.focus(), 500);
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [isOpen]);

  // Escape key closes panel
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  const closeMenu = () => {
    setIsOpen(false);
    hamburgerRef.current?.focus();
  };

  return (
    <>
      <a
        href="#main"
        className="absolute w-px h-px overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)] border-0 p-0 -m-px focus:static focus:w-auto focus:h-auto focus:overflow-visible focus:whitespace-normal focus:[clip:auto] focus:m-0 focus:z-[200] focus:bg-[var(--color-accent)] focus:text-[var(--color-bg)] focus:px-4 focus:py-2 focus:rounded-full"
      >
        {dict.common.skipToContent}
      </a>

      {/* ==================== HEADER BAR ==================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled || !isHome || isOpen
            ? "bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)]"
            : "mix-blend-difference"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-[82px] h-[64px] md:h-[72px] lg:h-[80px]">
          <Link
            href={`/${lang}`}
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="font-[family-name:var(--font-cormorant)] text-[1.3rem] md:text-[1.5rem] lg:text-[1.7rem] font-light uppercase tracking-[0.2em] text-white transition-opacity duration-300 hover:opacity-70"
          >
            MeZen
          </Link>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitcher locale={lang} />

            <a
              href="tel:+306975960329"
              className="hidden sm:inline-flex px-[14px] py-[6px] md:px-[18px] md:py-[7px] border border-white/25 rounded-none text-white text-[11px] md:text-[12px] font-semibold uppercase tracking-[2px] transition-all duration-300 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-[var(--color-bg)]"
            >
              {dict.common.reserve}
            </a>

            <button
              ref={hamburgerRef}
              onClick={() => setIsOpen(!isOpen)}
              className="w-[44px] h-[28px] flex flex-col justify-between items-stretch p-0 bg-transparent border-none cursor-pointer z-[101] relative"
              aria-label={isOpen ? dict.common.closeMenu : dict.common.openMenu}
              aria-expanded={isOpen}
            >
              <span className={`block w-full h-[2px] bg-white transition-all duration-500 origin-center ${isOpen ? "translate-y-[13px] rotate-45" : ""}`} />
              <span className={`block w-full h-[2px] bg-white transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block w-full h-[2px] bg-white transition-all duration-500 origin-center ${isOpen ? "-translate-y-[13px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ==================== DARK OVERLAY ==================== */}
      <div
        className={`fixed inset-0 z-[98] bg-black/60 backdrop-blur-xl transition-all duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none backdrop-blur-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ==================== SIDE PANEL ==================== */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[99] w-[min(380px,88vw)] lg:w-[420px] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "rgba(8, 11, 13, 0.92)",
          backdropFilter: "blur(40px) saturate(1.1)",
          WebkitBackdropFilter: "blur(40px) saturate(1.1)",
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Seam — quiet structural line */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-px bg-white/[0.08] origin-top transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-150 ${
            isOpen ? "scale-y-100" : "scale-y-0"
          }`}
        />

        {/* Nav links */}
        <nav className="flex flex-col gap-5 pt-[120px] pl-[40px] pr-[24px] flex-1">
          {NAV_LINKS.map((link, i) => {
            const isActive = link.href === `/${lang}`
              ? pathname === `/${lang}` || pathname === `/${lang}/`
              : pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={closeMenu}
                data-active={isActive ? "true" : undefined}
                className={`nav-side-link block font-[family-name:var(--font-cormorant)] text-[clamp(22px,4vw,30px)] font-light uppercase tracking-[0.12em] transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/50 hover:text-white"
                }`}
                style={{
                  transform: isOpen ? "translateX(0)" : "translateX(30px)",
                  opacity: isOpen ? 1 : 0,
                  transition: isOpen
                    ? `transform 0.5s cubic-bezier(0.22,1,0.36,1) ${200 + i * 50}ms, opacity 0.4s ease ${200 + i * 50}ms, color 0.3s ease`
                    : "transform 0.3s ease, opacity 0.2s ease, color 0.3s ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Reserve button — inline with nav links */}
          <a
            href="tel:+306975960329"
            onClick={closeMenu}
            className="nav-side-link inline-flex items-center gap-[10px] px-5 py-[10px] border border-white/15 rounded-none text-white/60 text-[12px] font-semibold uppercase tracking-[2px] transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent)] mt-3"
            style={{
              transform: isOpen ? "translateX(0)" : "translateX(30px)",
              opacity: isOpen ? 1 : 0,
              transition: isOpen
                ? `transform 0.5s cubic-bezier(0.22,1,0.36,1) ${200 + NAV_LINKS.length * 50}ms, opacity 0.4s ease ${200 + NAV_LINKS.length * 50}ms, background 0.3s ease, color 0.3s ease, border-color 0.3s ease`
                : "transform 0.3s ease, opacity 0.2s ease",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            {dict.common.reserve}
          </a>
        </nav>

        {/* Address */}
        <p
          className="pl-[40px] pb-8 text-[11px] text-white/25 tracking-[2px] uppercase"
          style={{
            opacity: isOpen ? 1 : 0,
            transition: isOpen ? "opacity 0.5s ease 600ms" : "opacity 0.2s ease",
          }}
        >
          {dict.common.addressShort}
        </p>
      </div>
    </>
  );
}
