import { redirect } from 'next/server';
import { defaultLocale } from '@/lib/i18n/config';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
