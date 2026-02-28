'use client';

import { useEffect } from 'react';
import type { Locale } from '@/lib/i18n/config';

export function SetLocaleAttributes({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);
  return null;
}
