'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import type { Locale } from '@/lib/i18n/config';
import type { Dict } from '@/lib/i18n/types';

const navKeys = ['home', 'about', 'services', 'projects', 'news', 'contact'] as const;

export function Header({ locale, dict }: { locale: Locale; dict?: Dict }) {
  const [open, setOpen] = useState(false);
  const nav = dict?.nav ?? { home: 'Home', about: 'About', services: 'Services', projects: 'Projects', news: 'News', contact: 'Contact' };

  const navLinks = navKeys.map((key) => ({
    href: `/${locale}/${key === 'home' ? '' : key}`,
    label: nav[key as keyof typeof nav] as string,
  }));

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full border-b border-slate/50 bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 min-h-20 max-w-7xl items-center justify-between gap-4 pl-3 sm:pl-4 pr-4 sm:pr-6 lg:pr-8">
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center justify-center transition-opacity hover:opacity-90"
          aria-label="BAWANI AL-JAZERA Home"
        >
          <Image
            src="/logo-horizontal.svg"
            alt="BAWANI AL-JAZERA"
            width={260}
            height={64}
            className="h-14 sm:h-16 w-auto object-contain object-center"
            priority
          />
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-sm font-medium text-muted hover:text-foreground transition-colors after:absolute after:left-0 after:bottom-[-4px] after:h-0.5 after:w-0 after:bg-turquoise after:transition-all after:duration-200 hover:after:w-full rtl:after:left-auto rtl:after:right-0 rtl:hover:after:w-full"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <ThemeSwitcher />
          <LanguageSwitcher currentLocale={locale} />
          <button
            type="button"
            aria-label="Menu"
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen((o) => !o)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate/50 bg-background/95 backdrop-blur"
          >
            <nav className="flex flex-col px-4 py-4 gap-2">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="py-2 text-foreground hover:text-turquoise transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
