import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { CTASection } from '@/components/sections/CTASection';
import SaudiProjectsMapClient from '@/components/SaudiProjectsMapClient';

const defaultHero = {
  title: 'Building the Future',
  subtitle: 'BAWANI AL-JAZERA',
  description: 'Excellence in construction. From concept to completion, we deliver lasting quality and innovation.',
  cta: 'Get in Touch',
  ctaSecondary: 'Our Projects',
};
const defaultServices = {
  title: 'Our Services', subtitle: 'What We Offer',
  residential: 'Residential', residentialDesc: 'Homes and residential complexes built to the highest standards.',
  commercial: 'Commercial', commercialDesc: 'Office buildings, retail spaces, and commercial developments.',
  infrastructure: 'Infrastructure', infrastructureDesc: 'Roads, utilities, and large-scale civil works.',
};
const defaultWhyUs = {
  title: 'Why Choose Us', subtitle: 'Excellence in Every Project',
  quality: 'Quality First', qualityDesc: 'We never compromise on materials or craftsmanship.',
  experience: 'Proven Experience', experienceDesc: 'Years of successful projects and satisfied clients.',
  innovation: 'Innovation', innovationDesc: 'Modern methods and sustainable practices.',
};
const defaultCta = { title: 'Ready to Start Your Project?', description: "Contact us today for a consultation.", button: 'Contact Us' };

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale: Locale =
    locale === 'ar' ? 'ar' : locale === 'zh' ? 'zh' : locale === 'tr' ? 'tr' : 'en';
  let dict: Record<string, unknown> = {};
  try {
    dict = await getDictionary(validLocale);
  } catch (_) {}
  const home = (dict?.home ?? {}) as Record<string, unknown>;
  const hero = (home.hero ?? defaultHero) as Parameters<typeof HeroSection>[0]['dict'];
  const services = (home.services ?? defaultServices) as Parameters<typeof ServicesSection>[0]['dict'];
  const whyUs = (home.whyUs ?? defaultWhyUs) as Parameters<typeof WhyUsSection>[0]['dict'];
  const cta = (home.cta ?? defaultCta) as Parameters<typeof CTASection>[0]['dict'];
  const mapDict = (home.map ?? {}) as Record<string, string>;
  const partnersDict = (home.partners ?? {}) as Record<string, string>;
  const projectsDict = (dict?.projects ?? {}) as Record<string, unknown>;
  const projectEntries = projectsDict?.entries as Record<
    string,
    { owner?: string; city?: string; district?: string; description?: string }
  > | undefined;

  return (
    <>
      <HeroSection dict={hero} locale={validLocale} />
      <ServicesSection dict={services} locale={validLocale} />
      <SaudiProjectsMapClient locale={validLocale} mapDict={mapDict} projectEntries={projectEntries} />
      <WhyUsSection dict={whyUs} />
      <PartnersSection dict={partnersDict} />
      <CTASection dict={cta} locale={validLocale} />
    </>
  );
}
