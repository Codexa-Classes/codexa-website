# SEO Utilities

This directory contains utilities for generating SEO-related files like `robots.txt` and `sitemap.xml` using Next.js App Router features.

## Files

### `robots.ts`
- **`generateRobotsTxt(config: RobotsConfig): string`** - Generates robots.txt content based on configuration
- **`getDefaultRobotsConfig(): RobotsConfig`** - Returns default configuration for Codexa Classes
- **`RobotsConfig`** - Interface for robots.txt configuration

### `sitemap.ts`
- **`generateSitemap(config: SitemapConfig): string`** - Generates XML sitemap based on configuration
- **`getDefaultSitemapConfig(): SitemapConfig`** - Returns default configuration for Codexa Classes
- **`SitemapEntry`** - Interface for individual sitemap entries
- **`SitemapConfig`** - Interface for sitemap configuration

## Usage

### Robots.txt
```typescript
import { generateRobotsTxt, getDefaultRobotsConfig } from '@/lib/utils/robots';

const config = getDefaultRobotsConfig();
const robotsTxt = generateRobotsTxt(config);
```

### Sitemap
```typescript
import { generateSitemap, getDefaultSitemapConfig } from '@/lib/utils/sitemap';

const config = getDefaultSitemapConfig();
const sitemap = generateSitemap(config);
```

## Configuration

Both utilities use configuration objects that can be customized:

- **Base URL**: Your website's domain
- **Static Pages**: List of important pages with metadata
- **Dynamic Pages**: Automatically generated from your data (courses, etc.)
- **User Agents**: Specific rules for different crawlers
- **Crawl Delay**: Rate limiting for crawlers

## Next.js Integration

These utilities are designed to work with Next.js App Router:

- `app/robots.txt/route.ts` - Generates robots.txt dynamically
- `app/sitemap.xml/route.ts` - Generates sitemap.xml dynamically

## Benefits

1. **Dynamic Content**: Automatically includes new courses and content
2. **SEO Optimized**: Proper XML structure with all required namespaces
3. **Configurable**: Easy to modify for different environments
4. **Type Safe**: Full TypeScript support
5. **Caching**: Proper cache headers for performance
6. **Bot Protection**: Blocks AI training bots while allowing search engines
