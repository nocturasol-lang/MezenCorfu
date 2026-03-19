import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StickyPageTitle from "@/components/StickyPageTitle";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import PhotoFrame from "@/components/PhotoFrame";
import GalleryScroller from "@/components/GalleryScroller";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navigation lang={lang} dict={dict} />
      <main id="main">
        <Hero dict={dict} />
        <StickyPageTitle title="MeZen" />

        {/* ==================== PHILOSOPHY TEASER ==================== */}
        <section className="py-[clamp(5rem,10vw,10rem)] px-6 md:px-10 lg:px-16">
          <div className="max-w-[650px] lg:max-w-[700px] mx-auto text-center reveal">
            <div className="w-8 lg:w-12 h-px bg-[var(--color-accent)] mx-auto mb-6 lg:mb-10" />
            <blockquote className="font-[family-name:var(--font-cormorant)] text-[clamp(1.1rem,2.5vw,1.5rem)] font-light italic leading-[1.8] lg:leading-[2] text-[var(--color-text-muted)] mb-8 lg:mb-10">
              &ldquo;{dict.home.philosophyQuote}&rdquo;
            </blockquote>
            <Link
              href={`/${lang}/about`}
              className="inline-block px-6 py-[7px] border border-white/20 rounded-none text-[11px] md:text-[12px] font-semibold uppercase tracking-[2px] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent)] transition-all duration-300"
            >
              {dict.common.ourPhilosophy}
            </Link>
          </div>
        </section>

        {/* ==================== ACCOLADES STRIP ==================== */}
        <section className="py-[clamp(2.5rem,5vw,4rem)] px-6 md:px-10 lg:px-16 bg-[var(--color-bg-surface)] border-y border-[var(--color-border)]">
          <div className="max-w-[900px] mx-auto text-center reveal">
            <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-6">
              <div className="flex items-center gap-2 text-[var(--color-accent)]">
                <span className="text-[1.1rem]">★</span>
                <span className="text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">{dict.accolades.rating}</span>
              </div>
              <span className="hidden md:inline text-[var(--color-border)]">|</span>
              <span className="text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">{dict.accolades.reviews}</span>
              <span className="hidden md:inline text-[var(--color-border)]">|</span>
              <span className="text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">{dict.accolades.topChoice}</span>
            </div>
          </div>
        </section>

        {/* ==================== MENU TEASER ==================== */}
        <section className="py-[clamp(5rem,10vw,10rem)] px-6 md:px-10 lg:px-16">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            <PhotoFrame
              src="/images/dish-signature.jpg"
              alt="Whole grilled sea bass on a wooden board with roasted potatoes"
              className="reveal"
            />
            <div className="reveal text-center lg:text-left">
              <div className="w-8 h-px bg-[var(--color-accent)] mx-auto lg:mx-0 mb-6" />
              <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.4rem,3vw,2.2rem)] font-light uppercase tracking-[0.2em] mb-5">
                {dict.home.menuTitle}
              </h2>
              <p className="text-[0.92rem] lg:text-[1.05rem] text-[var(--color-text-muted)] leading-[1.8] mb-4 max-w-[450px] mx-auto lg:mx-0">
                {dict.home.menuDesc}
              </p>
              <p className="text-[0.8rem] text-[var(--color-text-muted)]/60 italic mb-7">
                {dict.home.menuSeasons}
              </p>
              <Link
                href={`/${lang}/menu`}
                className="inline-block px-6 py-[7px] border border-white/20 rounded-none text-[11px] md:text-[12px] font-semibold uppercase tracking-[2px] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent)] transition-all duration-300"
              >
                {dict.common.viewMenu}
              </Link>
            </div>
          </div>
        </section>

        {/* ==================== GALLERY TEASER ==================== */}
        <section className="py-[clamp(5rem,10vw,8rem)] px-6 md:px-10 lg:px-16 bg-[var(--color-bg-surface)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10 reveal">
              <div className="w-8 lg:w-12 h-px bg-[var(--color-accent)] mx-auto mb-6" />
              <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.4rem,3vw,2.2rem)] font-light uppercase tracking-[0.2em]">
                {dict.home.galleryTitle}
              </h2>
            </div>
            <GalleryScroller lang={lang} allPhotosLabel={dict.common.allPhotos} titles={dict.gallery.items} />
          </div>
        </section>

        {/* ==================== PRIVATE DINING TEASER ==================== */}
        <section className="py-[clamp(5rem,10vw,10rem)] px-6 md:px-10 lg:px-16">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            <div className="reveal text-center lg:text-left order-2 lg:order-1">
              <div className="w-8 h-px bg-[var(--color-accent)] mx-auto lg:mx-0 mb-6" />
              <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.4rem,3vw,2.2rem)] font-light uppercase tracking-[0.2em] mb-5">
                {dict.home.privateDiningTitle}
              </h2>
              <p className="text-[0.92rem] lg:text-[1.05rem] text-[var(--color-text-muted)] leading-[1.8] mb-7 max-w-[450px] mx-auto lg:mx-0">
                {dict.home.privateDiningDesc}
              </p>
              <Link
                href={`/${lang}/private-dining`}
                className="inline-block px-6 py-[7px] border border-white/20 rounded-none text-[11px] md:text-[12px] font-semibold uppercase tracking-[2px] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent)] transition-all duration-300"
              >
                {dict.common.learnMore}
              </Link>
            </div>
            <PhotoFrame
              src="/images/private-dining.jpg"
              alt="Private dining space with stone walls and red banquette"
              position="center 70%"
              className="reveal order-1 lg:order-2"
            />
          </div>
        </section>

        {/* ==================== CONTACT STRIP ==================== */}
        <section className="py-[clamp(4rem,8vw,7rem)] px-6 md:px-10 lg:px-16 bg-[var(--color-bg-surface)] border-t border-[var(--color-border)]">
          <div className="max-w-[800px] mx-auto text-center reveal">
            <div className="w-8 h-px bg-[var(--color-accent)] mx-auto mb-6" />
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.4rem,3vw,2rem)] font-light uppercase tracking-[0.2em] mb-5">
              {dict.home.reservationsTitle}
            </h2>
            <p className="text-[0.9rem] text-[var(--color-text-muted)] mb-8">
              {dict.home.reservationsDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+306975960329"
                className="inline-flex items-center gap-3 px-6 py-3 border border-[var(--color-accent)]/40 rounded-none text-[var(--color-accent)] text-[12px] font-semibold uppercase tracking-[2px] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                {dict.common.phone}
              </a>
              <Link
                href={`/${lang}/contact`}
                className="inline-block px-6 py-[7px] border border-white/20 rounded-none text-[11px] md:text-[12px] font-semibold uppercase tracking-[2px] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent)] transition-all duration-300"
              >
                {dict.common.contact}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
      <BackToTop ariaLabel={dict.common.backToTop} />
      <ScrollReveal />
    </>
  );
}
