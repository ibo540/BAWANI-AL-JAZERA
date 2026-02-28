'use client';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Building2, Landmark } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';

type ServicesDict = {
  title: string;
  subtitle: string;
  residential: string;
  residentialDesc: string;
  commercial: string;
  commercialDesc: string;
  infrastructure: string;
  infrastructureDesc: string;
};

const services = [
  { key: 'residential' as const, Icon: Home },
  { key: 'commercial' as const, Icon: Building2 },
  { key: 'infrastructure' as const, Icon: Landmark },
] as const;

export function ServicesSection({ dict, locale }: { dict: ServicesDict; locale: Locale }) {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle subtitle={dict.subtitle} title={dict.title} className="mb-16" />
        <div className="grid gap-8 md:grid-cols-3 grid-cols-1">
          {services.map(({ key, Icon }, i) => (
            <Link key={key} href={`/${locale}/services#${key}`} className="h-full">
              <Card delay={i * 0.1} className="h-full min-h-[280px] border-2 border-white flex flex-col">
                <div className="mb-4 relative h-12 w-12 overflow-hidden rounded-lg shrink-0">
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center rounded-lg bg-turquoise/10 text-turquoise"
                    animate={{ y: [0, -2, 0] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </motion.span>
                  <span
                    className="icon-shine-cool pointer-events-none absolute rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, transparent 35%, rgba(255,255,255,0.5) 50%, rgba(0,220,220,0.2) 55%, transparent 70%, transparent 100%)',
                      width: '140%',
                      height: '140%',
                      left: '-20%',
                      top: '-20%',
                    }}
                    aria-hidden
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{dict[key]}</h3>
                <p className="text-muted text-sm flex-1">{dict[`${key}Desc` as keyof ServicesDict]}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
