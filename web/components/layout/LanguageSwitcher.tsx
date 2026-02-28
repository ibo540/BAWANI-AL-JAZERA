'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const basePath = pathname?.replace(/^\/(en|ar|zh|tr)(\/|$)/, '$2') || '';

  return (
    <div className="flex items-center gap-1">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={`/${loc}${basePath === '/' ? '' : basePath}`}
          className={`px-2 py-1 text-sm font-medium rounded transition-colors duration-200 ${
            currentLocale === loc
              ? 'text-turquoise border-b-2 border-turquoise'
              : 'text-muted hover:text-foreground'
          }`}
        >
          {loc === 'en' ? 'EN' : loc === 'ar' ? 'AR' : loc === 'zh' ? 'ZH' : 'TR'}
        </Link>
      ))}
    </div>
  );
}
