import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Inlined for Edge runtime compatibility (must match lib/i18n/config.ts)
const LOCALES = ['en', 'ar', 'zh', 'tr'] as const;
const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasLocale = LOCALES.some((loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`);

  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
