import { COURSES } from '@/lib/constants';

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export interface SitemapConfig {
  baseUrl: string;
  staticPages: SitemapEntry[];
  dynamicPages?: SitemapEntry[];
}

export const generateSitemap = (config: SitemapConfig): string => {
  const { baseUrl, staticPages, dynamicPages = [] } = config;
  const allPages = [...staticPages, ...dynamicPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
};

export const getDefaultSitemapConfig = (): SitemapConfig => {
  const currentDate = new Date().toISOString();
  
  return {
    baseUrl: 'https://codexaclasses.com',
    staticPages: [
      {
        url: '/',
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '1.0'
      },
      {
        url: '/courses',
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.9'
      },
      {
        url: '/about',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.8'
      },
      {
        url: '/contact',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.8'
      },
      {
        url: '/super10',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.7'
      },
      {
        url: '/certificate',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.6'
      },
      {
        url: '/login',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.5'
      }
    ],
    dynamicPages: COURSES.map(course => ({
      url: `/courses/${course.name.toLowerCase().replace(/\s+/g, '-')}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    }))
  };
};
