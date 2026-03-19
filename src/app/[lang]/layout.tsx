import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "../globals.css";
import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import StickyBookButton from "@/components/StickyBookButton";

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
    },
    alternates: {
      languages: {
        el: "/el",
        en: "/en",
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
              image: [],
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
              url: "",
            }),
          }}
        />
      </head>
      <body>
        {children}
        <StickyBookButton ariaLabel={dict.common.bookByPhone} />
      </body>
    </html>
  );
}
