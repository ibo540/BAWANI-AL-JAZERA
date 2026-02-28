import Parser from 'rss-parser';

export type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  snippet: string;
  source?: string;
};

const RSS_URL =
  'https://news.google.com/rss/search?q=construction+Saudi+Arabia&hl=en-US&gl=US&ceid=US:en';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (compatible; BAWANI-News/1.0; +https://bawanialjazera.com)',
  },
});

export async function fetchConstructionNewsKSA(): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(RSS_URL);
    const items: NewsItem[] = (feed.items ?? []).slice(0, 30).map((item) => ({
      title: item.title ?? '',
      link: item.link ?? item.guid ?? '#',
      pubDate: item.pubDate ?? item.isoDate ?? '',
      snippet: item.contentSnippet ?? item.content?.replace(/<[^>]+>/g, '').slice(0, 200) ?? '',
      source: item.creator ?? undefined,
    }));
    return items;
  } catch (e) {
    console.error('Failed to fetch construction news:', e);
    return [];
  }
}
