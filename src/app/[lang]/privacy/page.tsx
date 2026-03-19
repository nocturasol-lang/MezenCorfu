import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.metadata.privacyTitle, description: dict.metadata.privacyDescription };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navigation lang={lang} dict={dict} />
      <main id="main">
        <PageHeader title={dict.privacy.title} />

        <section className="pb-[clamp(5rem,10vw,10rem)] px-6 md:px-10 lg:px-16">
          <div className="max-w-[750px] mx-auto">
            {/* Last Updated */}
            <p className="text-center text-[0.8rem] uppercase tracking-[0.12em] text-[var(--color-text-muted)] opacity-60 mb-16 lg:mb-20 reveal">
              Last updated: {dict.privacy.lastUpdated}
            </p>

            {/* Policy Sections */}
            {dict.privacy.sections.map((section: { heading: string; content: string }, index: number) => (
              <div key={index} className="mb-12 lg:mb-16 reveal">
                <h2 className="font-[family-name:var(--font-cormorant)] text-[1.1rem] lg:text-[1.3rem] font-light uppercase tracking-[0.15em] text-[var(--color-accent)] mb-4 lg:mb-5">
                  {section.heading}
                </h2>
                <p className="text-[0.9rem] lg:text-[0.95rem] text-[var(--color-text-muted)] leading-[1.85] lg:leading-[2] whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}

            <div className="w-8 lg:w-12 h-px bg-[var(--color-accent)] mx-auto mt-16" />
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
      <BackToTop ariaLabel={dict.common.backToTop} />
      <ScrollReveal />
    </>
  );
}
