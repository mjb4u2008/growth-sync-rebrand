import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import React, { type ReactNode } from 'react';
import { blogPosts } from '../src/data/blogPosts';

type ValidationIssue = {
  level: 'error' | 'warning';
  message: string;
};

const args = process.argv.slice(2);
const requestedIdIndex = args.indexOf('--id');
const requestedId = requestedIdIndex >= 0 ? Number(args[requestedIdIndex + 1]) : undefined;

const targetPost = Number.isFinite(requestedId)
  ? blogPosts.find((post) => post.id === requestedId)
  : blogPosts[0];

if (!targetPost) {
  console.error('Could not find the requested blog post.');
  process.exit(1);
}

const extractText = (node: ReactNode): string => {
  if (node == null || typeof node === 'boolean') {
    return '';
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join(' ');
  }
  if (React.isValidElement(node)) {
    return extractText(node.props.children);
  }
  return '';
};

const collectHeadings = (node: ReactNode, headings: string[] = []): string[] => {
  if (node == null || typeof node === 'boolean' || typeof node === 'string' || typeof node === 'number') {
    return headings;
  }
  if (Array.isArray(node)) {
    node.forEach((child) => collectHeadings(child, headings));
    return headings;
  }
  if (React.isValidElement(node)) {
    if (typeof node.type === 'string' && /^h[1-6]$/.test(node.type)) {
      headings.push(extractText(node.props.children).trim());
    }
    collectHeadings(node.props.children, headings);
  }
  return headings;
};

const collectLinks = (node: ReactNode, links: string[] = []): string[] => {
  if (node == null || typeof node === 'boolean' || typeof node === 'string' || typeof node === 'number') {
    return links;
  }
  if (Array.isArray(node)) {
    node.forEach((child) => collectLinks(child, links));
    return links;
  }
  if (React.isValidElement(node)) {
    if (typeof node.props.href === 'string') {
      links.push(node.props.href);
    }
    collectLinks(node.props.children, links);
  }
  return links;
};

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();
const contentText = normalizeWhitespace(extractText(targetPost.content));
const headings = collectHeadings(targetPost.content);
const links = collectLinks(targetPost.content);
const externalLinks = links.filter((href) => href.startsWith('http'));
const internalLinks = links.filter((href) => href.startsWith('/'));
const imagePath = targetPost.image.startsWith('/') ? targetPost.image.slice(1) : targetPost.image;
const imageFile = join(process.cwd(), 'public', imagePath.replace(/^blog\//, 'blog/'));
const imageSlug = targetPost.image.split('/').pop()?.replace(/\.png$/, '') ?? '';
const imageSpecSource = readFileSync(join(process.cwd(), 'scripts', 'generate-blog-images.ts'), 'utf8');
const sitemapSource = readFileSync(join(process.cwd(), 'public', 'sitemap.xml'), 'utf8');
const imageSource = (targetPost as { imageSource?: string }).imageSource;
const usesSuppliedImage = imageSource === 'supplied-photo';

const issues: ValidationIssue[] = [];

if (!blogPosts[0] || blogPosts[0].id !== targetPost.id) {
  issues.push({
    level: 'warning',
    message: `Post ${targetPost.id} is not the first entry in src/data/blogPosts.tsx. New posts should be added to the top so they become featured automatically.`,
  });
}

if (!['Michael Broughton', 'Rod Henley', 'Tanner'].includes(targetPost.author.name)) {
  issues.push({
    level: 'error',
    message: `Author must resolve to Michael Broughton, Rod Henley, or Tanner. Found "${targetPost.author.name}".`,
  });
}

if (!targetPost.title || (targetPost.category !== 'Company' && targetPost.title.length < 30)) {
  issues.push({
    level: 'error',
    message: 'Title looks too short. GrowthSync titles should make a sharp point and carry a clear takeaway.',
  });
}

if (!targetPost.excerpt || targetPost.excerpt.length < 90) {
  issues.push({
    level: 'error',
    message: 'Excerpt looks too thin. Add a tighter 1-2 sentence summary with a concrete angle.',
  });
}

if (!targetPost.readTime || !/^\d+\smin read$/.test(targetPost.readTime)) {
  issues.push({
    level: 'error',
    message: `readTime should match "6 min read" style. Found "${targetPost.readTime}".`,
  });
}

if ((targetPost.tags?.length ?? 0) < 3) {
  issues.push({
    level: 'warning',
    message: 'Add at least 3 tags so the post matches the rest of the catalog.',
  });
}

if (/[—–]/.test(targetPost.title) || /[—–]/.test(targetPost.excerpt) || /[—–]/.test(contentText)) {
  issues.push({
    level: 'error',
    message: 'Found an em dash or en dash. GrowthSync blog copy should avoid dash-heavy punctuation.',
  });
}

if (!headings.includes('Sources')) {
  issues.push({
    level: 'error',
    message: 'Missing a Sources section. New posts should end with linked sources when they make current or numeric claims.',
  });
}

if (externalLinks.length < 2) {
  issues.push({
    level: 'warning',
    message: 'Add at least 2 outbound source links or credibility links.',
  });
}

if (!internalLinks.some((href) => href.startsWith('/blog/'))) {
  issues.push({
    level: 'warning',
    message: 'Add at least 1 internal related-post link to keep readers moving through the blog.',
  });
}

if (!internalLinks.includes('/get-started')) {
  issues.push({
    level: 'error',
    message: 'Missing the /get-started CTA link. Every new sales-oriented post should give the reader a clean path to start.',
  });
}

if (!contentText.includes('GrowthSync')) {
  issues.push({
    level: 'warning',
    message: 'The body never mentions GrowthSync. Add a clear tie-back section so the article feeds the product story.',
  });
}

if (!existsSync(imageFile)) {
  issues.push({
    level: 'error',
    message: `Missing hero image file at ${imageFile}.`,
  });
}

if (imageSlug && !usesSuppliedImage && !imageSpecSource.includes(`slug: '${imageSlug}'`)) {
  issues.push({
    level: 'error',
    message: `No image spec found for slug "${imageSlug}" in scripts/generate-blog-images.ts.`,
  });
}

if (!sitemapSource.includes(`<loc>https://growthsync.com/blog/${targetPost.id}</loc>`)) {
  issues.push({
    level: 'error',
    message: `Sitemap is missing https://growthsync.com/blog/${targetPost.id}. Run npm run sitemap after publishing.`,
  });
}

console.log(`Checking blog post ${targetPost.id}: ${targetPost.title}`);
console.log(`Author: ${targetPost.author.name}`);
console.log(`Category: ${targetPost.category}`);
console.log(`External links: ${externalLinks.length}`);
console.log(`Internal links: ${internalLinks.length}`);
console.log(`Image: ${targetPost.image}`);
console.log('');

if (issues.length === 0) {
  console.log('Blog validation passed.');
  process.exit(0);
}

for (const issue of issues) {
  const prefix = issue.level === 'error' ? 'ERROR' : 'WARN';
  console.log(`${prefix}: ${issue.message}`);
}

const hasErrors = issues.some((issue) => issue.level === 'error');
process.exit(hasErrors ? 1 : 0);
