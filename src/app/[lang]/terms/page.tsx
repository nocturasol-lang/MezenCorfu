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
  return { title: dict.metadata.termsTitle, description: dict.metadata.termsDescription };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navigation lang={lang} dict={dict} />
      <main id="main">
        <PageHeader title={dict.terms.title} />

        <section className="pb-[clamp(5rem,10vw,10rem)] px-6 md:px-10 lg:px-16">
          <div className="max-w-[750px] mx-auto">
            <p className="reveal text-center text-[0.8rem] text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-12 lg:mb-16">
              {dict.terms.lastUpdated}
            </p>

            <div className="space-y-10 lg:space-y-14">
              {dict.terms.sections.map((section: { heading: string; content: string }, index: number) => (
                <div key={index} className="reveal">
                  <h2 className="font-[family-name:var(--font-cormorant)] text-[1.15rem] lg:text-[1.4rem] font-light uppercase tracking-[0.18em] text-[var(--color-accent)] mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-[0.9rem] lg:text-[0.95rem] text-[var(--color-text-muted)] leading-[1.9] whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              ))}
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
