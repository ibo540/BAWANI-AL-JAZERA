import type { Locale } from './config';

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  ar: () => import('./dictionaries/ar.json').then((m) => m.default),
  zh: () => import('./dictionaries/zh.json').then((m) => m.default),
  tr: () => import('./dictionaries/tr.json').then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]?.() ?? dictionaries.en();
}
