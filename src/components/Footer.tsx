import Link from "next/link";

interface FooterProps {
  lang: string;
  dict: {
    footer: {
      tagline: string; menuLink: string; galleryLink: string; aboutLink: string;
      contactTitle: string; hoursTitle: string; hoursValue: string; hoursTime: string;
      socialTitle: string; copyright: string; privacy: string; terms: string;
    };
    common: { address: string; city: string; phone: string };
  };
}

export default function Footer({ lang, dict }: FooterProps) {
  const f = dict.footer;

  return (
    <footer className="py-[clamp(3.5rem,6vw,6rem)] px-6 md:px-10 lg:px-16 border-t border-[var(--color-border)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-4 lg:gap-8 mb-12 lg:mb-16">
          <div className="md:col-span-2 lg:col-span-1">
            <Link href={`/${lang}`} className="font-[family-name:var(--font-cormorant)] text-[1.3rem] lg:text-[1.5rem] font-light uppercase tracking-[0.2em] mb-3 lg:mb-4 block hover:opacity-70 transition-opacity">
              MeZen
            </Link>
            <p className="text-[0.82rem] lg:text-[0.85rem] text-[var(--color-text-muted)] leading-[1.7] whitespace-pre-line">
              {f.tagline}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 justify-center md:justify-start">
              {[
                { label: f.menuLink, href: `/${lang}/menu` },
                { label: f.galleryLink, href: `/${lang}/gallery` },
                { label: f.aboutLink, href: `/${lang}/about` },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-[0.7rem] uppercase tracking-[0.1em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[0.7rem] lg:text-[0.75rem] uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 lg:mb-4">
              {f.contactTitle}
            </h4>
            <div className="space-y-1.5 text-[0.82rem] lg:text-[0.85rem] text-[var(--color-text-muted)]">
              <a
                href="https://www.google.com/maps/place/MeZen+Restaurant+Corfu/@39.6257488,19.9206866,17.6z/data=!4m6!3m5!1s0x135b5d4a421e454d:0x4a785bfe13eef45e!8m2!3d39.6256178!4d19.9226342!16s%2Fg%2F11sj7crwyx?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                <p>{dict.common.address}</p>
                <p>{dict.common.city}</p>
              </a>
              <p className="pt-1">
                <a href="tel:+306975960329" className="hover:text-[var(--color-accent)] transition-colors active:text-[var(--color-accent)]">
                  {dict.common.phone}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-[0.7rem] lg:text-[0.75rem] uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 lg:mb-4">
              {f.hoursTitle}
            </h4>
            <div className="space-y-1.5 text-[0.82rem] lg:text-[0.85rem] text-[var(--color-text-muted)]">
              <p>{f.hoursValue}</p>
              <p>{f.hoursTime}</p>
            </div>
          </div>

          <div>
            <h4 className="text-[0.7rem] lg:text-[0.75rem] uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 lg:mb-4">
              {f.socialTitle}
            </h4>
            <div className="flex gap-3 justify-center md:justify-start">
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 rounded-none" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 rounded-none" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 rounded-none" aria-label="TripAdvisor">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="14" r="2"/><circle cx="16" cy="14" r="2"/><path d="M12 4c-4 0-7.5 1.5-9 3l2 3m14-6c2 1.5 3 3 3 3l-2 3M6 14a6 6 0 0112 0"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-5 lg:pt-6 border-t border-[var(--color-border)] flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
          <p className="text-[0.7rem] lg:text-[0.72rem] text-[var(--color-text-muted)] tracking-[0.05em]">
            {f.copyright}
          </p>
          <div className="flex gap-5 lg:gap-6 text-[0.65rem] lg:text-[0.7rem] text-[var(--color-text-muted)] uppercase tracking-[0.1em]">
            <Link href={`/${lang}/privacy`} className="hover:text-[var(--color-text)] transition-colors">{f.privacy}</Link>
            <Link href={`/${lang}/terms`} className="hover:text-[var(--color-text)] transition-colors">{f.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
