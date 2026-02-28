import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { ServiceIcon } from '@/components/ui/ServiceIcon';

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale: Locale = locale === 'ar' ? 'ar' : 'en';
  const dict = await getDictionary(validLocale);
  const services = dict.services as Record<string, string>;

  const items = [
    { id: 'residential' as const, title: services.residential, desc: services.residentialDesc },
    { id: 'commercial' as const, title: services.commercial, desc: services.commercialDesc },
    { id: 'infrastructure' as const, title: services.infrastructure, desc: services.infrastructureDesc },
    { id: 'renovation' as const, title: services.renovation, desc: services.renovationDesc },
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle subtitle={services.subtitle} title={services.title} className="mb-8" />
        <p className="text-muted text-center max-w-2xl mx-auto mb-16">{services.intro}</p>
        <div className="grid gap-8 md:grid-cols-2">
          {items.map((item, i) => (
            <Card key={item.id} delay={i * 0.08}>
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-turquoise/10 text-turquoise">
                <ServiceIcon name={item.id} />
              </span>
              <h3 id={item.id} className="text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted text-sm">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
