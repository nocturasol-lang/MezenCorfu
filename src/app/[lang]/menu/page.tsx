import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import StickyPageTitle from "@/components/StickyPageTitle";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.metadata.menuTitle, description: dict.metadata.menuDescription };
}

export default async function MenuPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navigation lang={lang} dict={dict} alwaysSolid />
      <main id="main">
        {/* Spacer for fixed nav */}
        <div className="pt-[72px] lg:pt-[80px]" />

        <StickyPageTitle title={dict.menu.title} alwaysVisible />

        <section className="py-[clamp(2.5rem,5vw,4rem)] px-6 md:px-10 lg:px-16">
          <div className="max-w-[500px] md:max-w-[800px] lg:max-w-[1000px] mx-auto">
            {dict.menu.courses.map(
              (
                course: {
                  category: string;
                  subtitle?: string;
                  dishes: { name: string; description: string }[];
                },
                index: number
              ) => (
                <section
                  key={course.category}
                  id={`course-${index}`}
                  className="scroll-mt-[200px] py-8 lg:py-10 first:pt-0"
                >
                  {/* Bordered card with poetic subtitle as legend */}
                  <fieldset className="border border-[var(--color-border)] px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 reveal">
                    <legend className="px-4 mx-auto">
                      <span className="font-[family-name:var(--font-cormorant)] text-[0.8rem] lg:text-[0.9rem] uppercase tracking-[0.3em] text-[var(--color-accent)]">
                        {course.subtitle || course.category}
                      </span>
                    </legend>

                    {/* Dishes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-20 gap-y-8 lg:gap-y-10">
                      {course.dishes.map(
                        (dish: { name: string; description: string }) => (
                          <div key={dish.name} className="group">
                            <div className="flex items-baseline gap-3">
                              <h3 className="font-[family-name:var(--font-cormorant)] text-[1.15rem] md:text-[1.25rem] lg:text-[1.35rem] font-normal tracking-[0.04em] whitespace-nowrap">
                                {dish.name}
                              </h3>
                              <div className="flex-1 border-b border-dotted border-[var(--color-border)] mb-1.5 opacity-40 group-hover:opacity-70 transition-opacity duration-300 hidden md:block" />
                            </div>
                            <p className="text-[0.82rem] lg:text-[0.88rem] text-[var(--color-text-muted)] leading-[1.7] mt-1.5 max-w-[420px]">
                              {dish.description}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </fieldset>
                </section>
              )
            )}

            {/* Seasonal note */}
            <div className="pt-10 lg:pt-14 border-t border-[var(--color-border)] text-center reveal">
              <p className="text-[0.75rem] lg:text-[0.8rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)] opacity-60">
                {dict.menu.subtitle}
              </p>
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
