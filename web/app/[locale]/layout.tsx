import { Montserrat, Cairo } from 'next/font/google';
import { SetLocaleAttributes } from '@/components/layout/SetLocaleAttributes';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { locales, type Locale } from '@/lib/i18n/config';
import './layout.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

const cairo = Cairo({
  variable: '--font-arabic',
  subsets: ['arabic', 'latin'],
  display: 'swap',
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale =
    locale === 'ar' ? 'ar' : locale === 'zh' ? 'zh' : locale === 'tr' ? 'tr' : 'en';
  let dict: import('@/lib/i18n/types').Dict;
  try {
    dict = (await getDictionary(validLocale)) as import('@/lib/i18n/types').Dict;
  } catch {
    dict = {
      nav: { home: 'Home', about: 'About', services: 'Services', projects: 'Projects', news: 'News', contact: 'Contact' },
      home: {}, about: {}, services: {}, projects: {}, contact: {}, news: {},
    } as import('@/lib/i18n/types').Dict;
  }

  return (
    <>
      <SetLocaleAttributes locale={validLocale} />
      <div
        className={`${montserrat.variable} ${cairo.variable} font-sans min-h-screen flex flex-col bg-background text-foreground`}
        dir={validLocale === 'ar' ? 'rtl' : 'ltr'}
      >
        <Header locale={validLocale} dict={dict} />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer locale={validLocale} dict={dict} />
      </div>
    </>
  );
}
