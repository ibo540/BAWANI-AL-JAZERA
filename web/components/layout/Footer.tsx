'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n/config';
import type { Dict } from '@/lib/i18n/types';

const navKeys = ['home', 'about', 'services', 'projects', 'news', 'contact'] as const;

export function Footer({ locale, dict }: { locale: Locale; dict?: Dict }) {
  const nav = dict?.nav ?? { home: 'Home', about: 'About', services: 'Services', projects: 'Projects', news: 'News', contact: 'Contact' };
  const footer = dict?.footer as { tagline?: string; links?: string; contact?: string; rights?: string } | undefined;

  const navLinks = navKeys.map((key) => ({
    href: `/${locale}/${key === 'home' ? '' : key}`,
    label: nav[key as keyof typeof nav] as string,
  }));

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-slate/50 bg-slate/30"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Image
              src="/vertical-logo.svg"
              alt="BAWANI AL-JAZERA"
              width={80}
              height={94}
              className="h-16 w-auto object-contain object-left brightness-0 invert sm:h-20"
            />
            <p className="mt-3 text-sm text-muted">{footer?.tagline ?? 'Building the future with excellence.'}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{footer?.links ?? 'Quick Links'}</h3>
            <ul className="mt-3 space-y-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted hover:text-turquoise transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{footer?.contact ?? 'Contact'}</h3>
            <Link
              href={`/${locale}/contact`}
              className="mt-3 inline-block text-sm text-muted hover:text-turquoise transition-colors"
            >
              {nav.contact}
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-slate/50 pt-8 text-center text-sm text-muted">
          © {new Date().getFullYear()} BAWANI AL-JAZERA. {footer?.rights ?? 'All rights reserved.'}
        </div>
      </div>
    </motion.footer>
  );
}
