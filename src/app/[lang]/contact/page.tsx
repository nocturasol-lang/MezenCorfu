import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import StickyPageTitle from "@/components/StickyPageTitle";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.metadata.contactTitle, description: dict.metadata.contactDescription };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navigation lang={lang} dict={dict} />
      <main id="main">
        <PageHeader title={dict.contact.title} subtitle={dict.contact.subtitle} />
        <StickyPageTitle title={dict.contact.title} />

        <section className="pb-[clamp(5rem,10vw,10rem)] px-6 md:px-10 lg:px-16">
          <div className="max-w-[1000px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
              <div className="reveal text-center lg:text-left">
                <div className="w-8 h-px bg-[var(--color-accent)] mx-auto lg:mx-0 mb-6" />
                <h2 className="font-[family-name:var(--font-cormorant)] text-[1.3rem] lg:text-[1.8rem] font-light uppercase tracking-[0.18em] mb-5">
                  {dict.contact.reservationsTitle}
                </h2>
                <p className="text-[0.92rem] lg:text-[1rem] text-[var(--color-text-muted)] leading-[1.8] mb-8 max-w-[400px] mx-auto lg:mx-0">
                  {dict.contact.reservationsText}
                </p>
                <a
                  href="tel:+306975960329"
                  className="inline-flex items-center gap-3 px-6 py-3 border border-[var(--color-accent)]/40 rounded-none text-[var(--color-accent)] text-[12px] font-semibold uppercase tracking-[2px] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  {dict.common.phone}
                </a>
              </div>

              <div className="reveal">
                <div className="space-y-8 text-center lg:text-left lg:border-l lg:border-[var(--color-border)] lg:pl-12 xl:pl-16">
                  <div>
                    <span className="block text-[var(--color-accent)] uppercase tracking-[0.15em] text-[0.7rem] mb-2">{dict.contact.hours}</span>
                    <p className="text-[0.9rem] text-[var(--color-text-muted)]">{dict.contact.hoursValue}</p>
                    <p className="text-[0.9rem] text-[var(--color-text-muted)]">{dict.contact.hoursTime}</p>
                  </div>
                  <div>
                    <span className="block text-[var(--color-accent)] uppercase tracking-[0.15em] text-[0.7rem] mb-2">{dict.contact.addressLabel}</span>
                    <a
                      href="https://www.google.com/maps/place/MeZen+Restaurant+Corfu/@39.6257488,19.9206866,17.6z/data=!4m6!3m5!1s0x135b5d4a421e454d:0x4a785bfe13eef45e!8m2!3d39.6256178!4d19.9226342!16s%2Fg%2F11sj7crwyx?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-[var(--color-accent)] transition-colors duration-300"
                    >
                      <p className="text-[0.9rem] text-[var(--color-text-muted)]">{dict.common.address}</p>
                      <p className="text-[0.9rem] text-[var(--color-text-muted)]">{dict.common.city}</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 aspect-[21/9] reveal overflow-hidden [filter:brightness(0.85)_contrast(1.1)_saturate(0.8)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d19.9226342!3d39.6256178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135b5d4a421e454d%3A0x4a785bfe13eef45e!2sMeZen%20Restaurant%20Corfu!5e1!3m2!1sel!2sgr!4v1773927443001!5m2!1sel!2sgr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MeZen Restaurant Corfu — Google Maps"
              />
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
