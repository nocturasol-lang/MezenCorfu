export const locales = ["el", "en", "de", "it", "fr", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "el";
