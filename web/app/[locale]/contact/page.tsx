import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactForm } from '@/components/sections/ContactForm';
import type { FormDict } from '@/components/sections/ContactForm';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale: Locale = locale === 'ar' ? 'ar' : 'en';
  const dict = await getDictionary(validLocale);
  const contact = dict.contact as Record<string, unknown>;
  const form = contact.form as Record<string, string>;
  const info = contact.info as Record<string, string>;

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle subtitle={String(contact.subtitle)} title={String(contact.title)} className="mb-12" />
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-xl border border-slate bg-slate/50 p-8">
            <h3 className="text-lg font-semibold text-foreground mb-6">{info.title}</h3>
            <dl className="space-y-4 text-muted">
              <div>
                <dt className="text-sm font-medium text-turquoise">{info.address}</dt>
                <dd>{info.addressValue}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-turquoise">{info.phone}</dt>
                <dd>+123 456 7890</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-turquoise">{info.email}</dt>
                <dd>info@bowani-aljazeera.com</dd>
              </div>
            </dl>
            <div className="mt-8 aspect-video rounded-lg bg-slate flex items-center justify-center text-muted">
              Map placeholder
            </div>
          </div>
          <ContactForm dict={form as FormDict} />
        </div>
      </div>
    </div>
  );
}
