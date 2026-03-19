import Image from "next/image";

interface HeroProps {
  dict: {
    hero: { tagline: string };
    common: { reserveTable: string; scroll: string };
  };
}

export default function Hero({ dict }: HeroProps) {
  return (
    <section className="relative w-full h-[100svh] min-h-[600px] lg:min-h-[700px] flex items-end justify-center overflow-hidden pb-[18vh] md:pb-[16vh] lg:pb-[14vh]">
      {/* Background image — slightly dimmed to reduce brightness competition */}
      <Image
        src="/images/hero.jpg"
        alt="MeZen Restaurant — outdoor dining in Corfu's old town at night"
        fill
        sizes="100vw"
        className="object-cover object-center brightness-[0.85]"
        priority
        quality={75}
      />

      {/* Overlay system — three layers for depth */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12 lg:px-8 max-w-[600px] md:max-w-[700px] lg:max-w-[900px] mx-auto">
        <div className="w-10 lg:w-16 h-px bg-[var(--color-accent)] mx-auto mb-6 lg:mb-10 animate-[fadeIn_0.8s_ease_0.2s_both]" />

        <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.8rem,10vw,3.5rem)] md:text-[clamp(3rem,6vw,4rem)] lg:text-[clamp(4rem,5vw,6rem)] font-light uppercase tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.25em] leading-[1.05] mb-4 lg:mb-6 animate-[fadeUp_1s_ease_0.4s_both] [text-shadow:_0_2px_16px_rgba(0,0,0,0.6)]">
          MeZen
        </h1>

        <p className="font-[family-name:var(--font-cormorant)] text-[1rem] md:text-[1.1rem] lg:text-[1.35rem] font-light tracking-[0.08em] lg:tracking-[0.12em] text-[var(--color-text)] mb-8 lg:mb-12 leading-[1.5] animate-[fadeUp_1s_ease_0.6s_both] [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
          {dict.hero.tagline}
        </p>

        <a
          href="tel:+306975960329"
          className="inline-block px-8 py-3.5 md:px-10 md:py-4 lg:px-12 lg:py-4 bg-black/30 backdrop-blur-sm border border-[var(--color-accent)] text-[var(--color-accent)] text-[0.75rem] lg:text-[0.8rem] uppercase tracking-[0.18em] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-500 animate-[fadeUp_1s_ease_0.8s_both] active:bg-[var(--color-accent)] active:text-[var(--color-bg)]"
        >
          {dict.common.reserveTable}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[fadeIn_1s_ease_1.2s_both]">
        <span className="text-[0.6rem] lg:text-[0.65rem] uppercase tracking-[0.25em] text-[var(--color-text-muted)] [text-shadow:_0_1px_4px_rgba(0,0,0,0.5)]">
          {dict.common.scroll}
        </span>
        <div className="w-px h-6 lg:h-10 bg-gradient-to-b from-[var(--color-accent)] to-transparent animate-[pulse_2s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
