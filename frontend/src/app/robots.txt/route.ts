import { NextResponse } from 'next/server';
import { generateRobotsTxt, getDefaultRobotsConfig } from '@/lib/utils/robots';

export async function GET() {
  const config = getDefaultRobotsConfig();
  const robotsTxt = generateRobotsTxt(config);

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
