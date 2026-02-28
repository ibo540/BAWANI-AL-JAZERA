import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { fetchConstructionNewsKSA } from '@/lib/news/fetch-construction-news';

/** Revalidate this page every 24 hours so construction news stays up to date. */
export const revalidate = 86400;

function formatNewsDate(isoOrRfc: string): string {
  try {
    const d = new Date(isoOrRfc);
    if (Number.isNaN(d.getTime())) return isoOrRfc;
    return d.toLocaleDateString(undefined, {
      dateStyle: 'medium',
      timeZone: 'UTC',
    });
  } catch {
    return isoOrRfc;
  }
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale =
    locale === 'ar' ? 'ar' : locale === 'zh' ? 'zh' : locale === 'tr' ? 'tr' : 'en';
  const dict = await getDictionary(validLocale);
  const newsDict = (dict.news ?? {}) as Record<string, string>;
  const title = newsDict.title ?? 'Construction News';
  const subtitle = newsDict.subtitle ?? 'Saudi Arabia';
  const intro = newsDict.intro ?? 'Latest construction and infrastructure news in the Kingdom of Saudi Arabia. Updated daily.';
  const lastUpdated = newsDict.lastUpdated ?? 'Last updated';
  const noNews = newsDict.noNews ?? 'No news items available at the moment. Please try again later.';
  const openLink = newsDict.openLink ?? 'Read more';

  const items = await fetchConstructionNewsKSA();

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          subtitle={subtitle}
          title={title}
          className="mb-4"
        />
        <p className="text-muted text-center max-w-2xl mx-auto mb-4">
          {intro}
        </p>
        <p className="text-muted text-center text-sm mb-12">
          {lastUpdated}: {new Date().toLocaleDateString(validLocale === 'ar' ? 'ar-SA' : 'en-US', { dateStyle: 'long' })}
        </p>

        {items.length === 0 ? (
          <p className="text-center text-muted py-12">{noNews}</p>
        ) : (
          <ul className="space-y-6">
            {items.map((item, i) => (
              <li
                key={`${item.link}-${i}`}
                className="border border-slate/30 rounded-xl p-5 bg-background/50 hover:border-turquoise/40 transition-colors"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-turquoise transition-colors mb-1">
                    {item.title}
                  </h3>
                  {item.pubDate && (
                    <time className="text-xs text-muted" dateTime={item.pubDate}>
                      {formatNewsDate(item.pubDate)}
                    </time>
                  )}
                  {item.snippet && (
                    <p className="text-sm text-muted mt-2 line-clamp-2">
                      {item.snippet}
                    </p>
                  )}
                  <span className="inline-block mt-2 text-sm text-turquoise font-medium">
                    {openLink} →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
