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
  return { title: dict.metadata.aboutTitle, description: dict.metadata.aboutDescription };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navigation lang={lang} dict={dict} />
      <main id="main">
        <PageHeader title={dict.about.title} />
        <StickyPageTitle title={dict.about.title} />

        {/* ==================== PHILOSOPHY ==================== */}
        <section className="pb-[clamp(5rem,10vw,10rem)] px-6 md:px-10 lg:px-16">
          <div className="max-w-[650px] lg:max-w-[750px] mx-auto">
            <div className="text-center mb-16 lg:mb-24 reveal">
              <p className="text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.9] lg:leading-[2.1] text-[var(--color-text-muted)] mb-6 lg:mb-8">
                {dict.philosophy.text1}
              </p>
              <p className="text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.9] lg:leading-[2.1] text-[var(--color-text-muted)]">
                {dict.philosophy.text2}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 text-center reveal">
              {[
                { title: dict.philosophy.pillar1Title, text: dict.philosophy.pillar1Text },
                { title: dict.philosophy.pillar2Title, text: dict.philosophy.pillar2Text },
                { title: dict.philosophy.pillar3Title, text: dict.philosophy.pillar3Text },
              ].map((pillar) => (
                <div key={pillar.title}>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-[1.2rem] lg:text-[1.4rem] uppercase tracking-[0.15em] text-[var(--color-accent)] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-[0.85rem] text-[var(--color-text-muted)] leading-[1.7]">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-8 lg:w-12 h-px bg-[var(--color-accent)] mx-auto mt-16" />
          </div>
        </section>

        {/* ==================== ATMOSPHERIC PHOTO ==================== */}
        <section className="reveal">
          <PhotoFrame
            src="/images/about-atmospheric.jpg"
            alt="View through a stone window of MeZen's bustling terrace at night"
            aspect="aspect-[21/9]"
            position="center 60%"
          />
        </section>

        {/* ==================== ABOUT BLOCK 1 ==================== */}
        <section className="py-[clamp(5rem,10vw,10rem)] px-6 md:px-10 lg:px-16">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <PhotoFrame
              src="/images/about-terrace.jpg"
              alt="Daytime terrace with white tables set in Corfu's old town lane"
              aspect="aspect-[4/3] lg:aspect-[3/4]"
              className="reveal"
              position="center 70%"
            />
            <div className="reveal text-center lg:text-left">
              <h2 className="font-[family-name:var(--font-cormorant)] text-[1.5rem] lg:text-[2rem] font-light uppercase tracking-[0.15em] mb-4 lg:mb-6 text-[var(--color-accent)]">
                {dict.about.block1Title}
              </h2>
              <p className="text-[0.92rem] lg:text-[1.05rem] text-[var(--color-text-muted)] leading-[1.8] lg:leading-[1.9] mb-4 lg:mb-5">
                {dict.about.block1Text1}
              </p>
              <p className="text-[0.92rem] lg:text-[1.05rem] text-[var(--color-text-muted)] leading-[1.8] lg:leading-[1.9]">
                {dict.about.block1Text2}
              </p>
            </div>
          </div>
        </section>

        {/* ==================== FULL-BLEED PHOTO ==================== */}
        <section className="reveal">
          <PhotoFrame
            src="/images/about-dishes.jpg"
            alt="Whole grilled fish on a wooden board with roasted potatoes"
            aspect="aspect-[21/9]"
            position="center 55%"
          />
        </section>

        {/* ==================== ABOUT BLOCK 2 ==================== */}
        <section className="py-[clamp(5rem,10vw,10rem)] px-6 md:px-10 lg:px-16">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="reveal text-center lg:text-left order-2 lg:order-1">
              <h2 className="font-[family-name:var(--font-cormorant)] text-[1.5rem] lg:text-[2rem] font-light uppercase tracking-[0.15em] mb-4 lg:mb-6 text-[var(--color-accent)]">
                {dict.about.block2Title}
              </h2>
              <p className="text-[0.92rem] lg:text-[1.05rem] text-[var(--color-text-muted)] leading-[1.8] lg:leading-[1.9] mb-4 lg:mb-5">
                {dict.about.block2Text1}
              </p>
              <p className="text-[0.92rem] lg:text-[1.05rem] text-[var(--color-text-muted)] leading-[1.8] lg:leading-[1.9]">
                {dict.about.block2Text2}
              </p>
            </div>
            <PhotoFrame
              src="/images/about-spread.jpg"
              alt="Spread of Greek dishes — mussels, saganaki, fritters"
              aspect="aspect-[4/3] lg:aspect-[3/4]"
              className="reveal order-1 lg:order-2"
              position="center 40%"
            />
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
      <BackToTop ariaLabel={dict.common.backToTop} />
      <ScrollReveal />
    </>
  );
}
