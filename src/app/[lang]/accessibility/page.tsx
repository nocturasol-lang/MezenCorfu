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
  return { title: dict.metadata.accessibilityTitle, description: dict.metadata.accessibilityDescription };
}

export default async function AccessibilityPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navigation lang={lang} dict={dict} />
      <main id="main">
        <PageHeader title={dict.accessibility.title} />

        <section className="pb-[clamp(5rem,10vw,10rem)] px-6 md:px-10 lg:px-16">
          <div className="max-w-[750px] mx-auto">
            <p className="text-center text-[0.8rem] uppercase tracking-[0.15em] text-[var(--color-text-muted)] opacity-60 mb-16 reveal">
              {dict.accessibility.lastUpdated}
            </p>

            <div className="space-y-12 lg:space-y-16">
              {dict.accessibility.sections.map((section: { heading: string; content: string }, index: number) => (
                <div key={index} className="reveal">
                  <div className="w-6 h-px bg-[var(--color-accent)] mb-5" />
                  <h2 className="font-[family-name:var(--font-cormorant)] text-[1.1rem] lg:text-[1.35rem] font-light uppercase tracking-[0.15em] text-[var(--color-accent)] mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-[0.9rem] lg:text-[0.95rem] text-[var(--color-text-muted)] leading-[1.85] lg:leading-[2]">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-8 h-px bg-[var(--color-accent)] mx-auto mt-16 lg:mt-20" />
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
      <BackToTop ariaLabel={dict.common.backToTop} />
      <ScrollReveal />
    </>
  );
}
