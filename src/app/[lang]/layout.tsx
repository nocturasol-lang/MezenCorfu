import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "../globals.css";
import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import StickyBookButton from "@/components/StickyBookButton";
import CookieConsent from "@/components/CookieConsent";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export async function generateStaticParams() {
  return [{ lang: "el" }, { lang: "en" }, { lang: "de" }, { lang: "it" }, { lang: "fr" }, { lang: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: dict.metadata.homeTitle,
    description: dict.metadata.homeDescription,
    keywords: [
      "MeZen",
      "Corfu restaurant",
      "fine dining Corfu",
      "modern Greek cuisine",
      "gastronomy Corfu",
      "εστιατόριο Κέρκυρα",
    ],
    openGraph: {
      title: dict.metadata.homeTitle,
      description: dict.metadata.homeDescription,
      locale: lang === "el" ? "el_GR" : "en_US",
      type: "website",
      siteName: "MeZen Restaurant",
      url: `https://darkorange-pig-624013.hostingersite.com/${lang}`,
      images: [
        {
          url: "https://darkorange-pig-624013.hostingersite.com/images/hero.jpg",
          width: 1200,
          height: 630,
          alt: "MeZen Restaurant — Corfu",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.homeTitle,
      description: dict.metadata.homeDescription,
      images: ["https://darkorange-pig-624013.hostingersite.com/images/hero.jpg"],
    },
    alternates: {
      canonical: `https://darkorange-pig-624013.hostingersite.com/${lang}`,
      languages: {
        el: "/el",
        en: "/en",
        de: "/de",
        fr: "/fr",
        it: "/it",
        ru: "/ru",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "MeZen Restaurant",
              image: ["https://darkorange-pig-624013.hostingersite.com/images/hero.jpg"],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Sofokleous Dousmani 38",
                addressLocality: "Corfu",
                postalCode: "491 00",
                addressCountry: "GR",
              },
              telephone: "+306975960329",
              servesCuisine: "Modern Greek",
              priceRange: "€€€",
              url: "https://darkorange-pig-624013.hostingersite.com",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "11:00",
                closes: "00:30",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.6",
                reviewCount: "500",
                bestRating: "5",
              },
            }),
          }}
        />
      </head>
      <body>
        {children}
        <StickyBookButton ariaLabel={dict.common.bookByPhone} />
        <CookieConsent lang={lang} />
      </body>
    </html>
  );
}
