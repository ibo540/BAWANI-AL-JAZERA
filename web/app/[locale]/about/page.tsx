import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';
import { AboutContent } from '@/components/sections/AboutContent';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale: Locale =
    locale === 'ar' ? 'ar' : locale === 'zh' ? 'zh' : locale === 'tr' ? 'tr' : 'en';
  const dict = await getDictionary(validLocale);
  const about = dict.about as Record<string, string>;

  return <AboutContent about={about} />;
}
