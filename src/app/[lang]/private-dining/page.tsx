import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import StickyPageTitle from "@/components/StickyPageTitle";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import PhotoFrame from "@/components/PhotoFrame";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.metadata.privateDiningTitle, description: dict.metadata.privateDiningDescription };
}

export default async function PrivateDiningPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navigation lang={lang} dict={dict} />
      <main id="main">
        <PageHeader title={dict.privateDining.title} subtitle={dict.privateDining.subtitle} />
        <StickyPageTitle title={dict.privateDining.title} />

        <section className="pb-[clamp(5rem,10vw,10rem)] px-6 md:px-10 lg:px-16">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <PhotoFrame
              src="/images/interior.jpg"
              alt="Intimate dining corner with stone walls and vintage radio"
              aspect="aspect-[16/10] lg:aspect-[4/5]"
              className="reveal"
            />

            <div className="reveal text-center lg:text-left">
              <div className="w-8 h-px bg-[var(--color-accent)] mx-auto lg:mx-0 mb-6 lg:mb-8" />

              <p className="text-[0.92rem] lg:text-[1.05rem] text-[var(--color-text-muted)] leading-[1.8] lg:leading-[1.9] mb-5">
                {dict.privateDining.text1}
              </p>

              <p className="text-[0.92rem] lg:text-[1.05rem] text-[var(--color-text-muted)] leading-[1.8] lg:leading-[1.9] mb-5">
                {dict.privateDining.text2}
              </p>

              <ul className="space-y-3 mb-8 text-center lg:text-left">
                {dict.privateDining.features.map((item: string) => (
                  <li key={item} className="text-[0.85rem] text-[var(--color-text-muted)] flex items-center gap-3 justify-center lg:justify-start">
                    <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="tel:+306975960329"
                className="inline-flex items-center gap-3 px-6 py-3 border border-[var(--color-accent)]/40 rounded-none text-[var(--color-accent)] text-[12px] font-semibold uppercase tracking-[2px] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                {dict.common.contactUs}
              </a>
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
