import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { blogPosts } from '../src/data/blogPosts';

type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  priority: string;
};

const SITE_URL = 'https://growthsync.com';
const OUTPUT_PATH = join(process.cwd(), 'public', 'sitemap.xml');

const latestBlogDate = blogPosts[0]?.dateISO.slice(0, 10) ?? new Date().toISOString().slice(0, 10);

const staticPages: SitemapEntry[] = [
  { loc: `${SITE_URL}/`, lastmod: latestBlogDate, changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE_URL}/blog`, lastmod: latestBlogDate, changefreq: 'weekly', priority: '0.8' },
  { loc: `${SITE_URL}/demo`, lastmod: '2026-03-26', changefreq: 'monthly', priority: '0.9' },
  { loc: `${SITE_URL}/careers`, lastmod: '2026-03-26', changefreq: 'weekly', priority: '0.6' },
  { loc: `${SITE_URL}/privacy`, lastmod: '2026-03-23', changefreq: 'yearly', priority: '0.3' },
  { loc: `${SITE_URL}/terms-of-service`, lastmod: '2026-03-23', changefreq: 'yearly', priority: '0.3' },
];

const blogPages: SitemapEntry[] = blogPosts.map((post, index) => ({
  loc: `${SITE_URL}/blog/${post.id}`,
  lastmod: post.dateISO.slice(0, 10),
  changefreq: 'monthly',
  priority: index < 7 ? '0.7' : '0.6',
}));

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const renderEntry = (entry: SitemapEntry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages.slice(0, 2), ...blogPages, ...staticPages.slice(2)].map(renderEntry).join('\n')}
</urlset>
`;

writeFileSync(OUTPUT_PATH, xml);
console.log(`Updated sitemap with ${blogPages.length} blog posts: ${OUTPUT_PATH}`);
