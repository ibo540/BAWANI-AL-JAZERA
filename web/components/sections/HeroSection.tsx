'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { AnimatedText, AnimatedFadeUp } from '@/components/AnimatedHeroText';

const heroFallback = <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-charcoal to-background" />;

const CityBackground = dynamic(() => import('@/components/CityBackground'), {
  ssr: false,
  loading: () => heroFallback,
});

type HeroDict = {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaSecondary: string;
};

export function HeroSection({ dict, locale }: { dict: HeroDict; locale: string }) {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden w-full">
      <ErrorBoundary fallback={heroFallback}>
        <div className="absolute inset-0 w-full h-full">
          <CityBackground />
        </div>
      </ErrorBoundary>
      <div className="absolute inset-0 hero-overlay-main hero-overlay-noise z-10" aria-hidden />
      <div className="absolute bottom-0 left-0 right-0 h-[28vh] min-h-[140px] hero-overlay-bottom pointer-events-none z-10" aria-hidden />
      <div className="relative z-20 mx-auto max-w-7xl w-full px-4 py-20 sm:py-24 sm:px-6 lg:px-8 text-center box-border">
        <AnimatedFadeUp delay={0.1}>
          <span className="text-turquoise font-bold text-xl sm:text-2xl md:text-3xl uppercase tracking-wider mb-3 block">
            {dict.subtitle}
          </span>
        </AnimatedFadeUp>
        <AnimatedText
          text={dict.title}
          as="h1"
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4"
          delay={0.2}
          stagger={0.1}
          duration={0.85}
        />
        <AnimatedText
          text={dict.description}
          as="p"
          className="text-lg text-muted max-w-2xl mx-auto mb-10"
          delay={0.5}
          stagger={0.04}
          duration={0.6}
        />
        <AnimatedFadeUp delay={0.85}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto px-1">
            <Button href={`/${locale}/contact`} variant="primary" className="w-full sm:w-auto">
              {dict.cta}
            </Button>
            <Button href={`/${locale}/projects`} variant="secondary" className="w-full sm:w-auto">
              {dict.ctaSecondary}
            </Button>
          </div>
        </AnimatedFadeUp>
      </div>
    </section>
  );
}
