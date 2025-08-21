import { NextResponse } from 'next/server';
import { generateSitemap, getDefaultSitemapConfig } from '@/lib/utils/sitemap';

export async function GET() {
  const config = getDefaultSitemapConfig();
  const sitemap = generateSitemap(config);

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
