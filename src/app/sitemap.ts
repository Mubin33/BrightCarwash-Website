import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { fetchNewsList } from '@/services/news.api';

// Retry on the next request if the news API is temporarily unavailable.
export const dynamic = 'force-dynamic';

const staticRoutes = [
  '/',
  '/about-us',
  '/booking',
  '/buy-membership',
  '/manage-membership',
  '/faq',
  '/gallery',
  '/gift-cards',
  '/news',
  '/privacy-policy',
  '/services',
  '/terms-conditions',
  '/wash-with-a-purpose',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    changeFrequency: route === '/' || route === '/news' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/news' ? 0.8 : 0.6,
  }));

  try {
    let page: number | null = 1;
    const visited = new Set<number>();
    const urls = new Set(entries.map((entry) => entry.url));
    while (page !== null && !visited.has(page)) {
      visited.add(page);
      const { articles, meta } = await fetchNewsList(page, 100);
      for (const article of articles) {
        const url = new URL(`/news/${encodeURIComponent(article.slug)}`, SITE_URL).toString();
        if (urls.has(url)) continue;
        urls.add(url);
        entries.push({ url, changeFrequency: 'weekly', priority: 0.7 });
      }
      page = meta.next_page;
    }
  } catch {
    console.warn('News sitemap is incomplete because the news API request failed.');
  }

  return entries;
}
