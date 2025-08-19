import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://codexaclasses.com/sitemap.xml

# Crawl-delay (optional)
Crawl-delay: 1

# Disallow admin and dashboard areas
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/
Disallow: /_next/

# Allow important pages
Allow: /
Allow: /courses
Allow: /about
Allow: /contact
Allow: /super10
Allow: /certificate`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
