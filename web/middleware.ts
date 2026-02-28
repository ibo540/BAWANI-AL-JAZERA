import { NextResponse } from 'next/server';

// Inlined for Edge runtime compatibility (must match lib/i18n/config.ts)
const LOCALES = ['en', 'ar', 'zh', 'tr'] as const;
const DEFAULT_LOCALE = 'en';

// Use Web API Request (not NextRequest) to avoid pulling in next/server request code
// that uses __dirname (ua-parser-js) and breaks in Vercel Edge Runtime.
export function middleware(request: Request) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname || '/';
    const hasLocale = LOCALES.some((loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`);

    if (hasLocale) return NextResponse.next();

    const newPath = pathname === '/' ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
    const redirectUrl = new URL(newPath, request.url);
    return NextResponse.redirect(redirectUrl);
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
