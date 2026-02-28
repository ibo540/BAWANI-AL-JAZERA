export const locales = ['en', 'ar', 'zh', 'tr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  zh: '中文',
  tr: 'Türkçe',
};
