import { existsSync } from 'node:fs';
import { join } from 'node:path';
import React, { type ReactNode } from 'react';
import { BLOG_POSTS } from '../src/blog/data';

type ValidationIssue = {
  level: 'error' | 'warning';
  message: string;
};

const args = process.argv.slice(2);
const requestedSlugIndex = args.indexOf('--slug');
const requestedIdIndex = args.indexOf('--id');
const requestedSlug = requestedSlugIndex >= 0 ? args[requestedSlugIndex + 1] : undefined;
const requestedId = requestedIdIndex >= 0 ? Number(args[requestedIdIndex + 1]) : undefined;

const targets = requestedSlug
  ? BLOG_POSTS.filter((post) => post.slug === requestedSlug)
  : Number.isFinite(requestedId)
    ? BLOG_POSTS.filter((post) => post.id === requestedId)
    : BLOG_POSTS;

if (targets.length === 0) {
  console.error('Could not find the requested blog post.');
  process.exit(1);
}

const extractText = (node: ReactNode): string => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join(' ');
  if (React.isValidElement(node)) return extractText((node.props as { children?: ReactNode }).children);
  return '';
};

const collectLinks = (node: ReactNode, links: string[] = []): string[] => {
  if (node == null || typeof node === 'boolean' || typeof node === 'string' || typeof node === 'number') return links;
  if (Array.isArray(node)) {
    node.forEach((child) => collectLinks(child, links));
    return links;
  }
  if (React.isValidElement(node)) {
    const props = node.props as { href?: string; children?: ReactNode };
    if (typeof props.href === 'string') links.push(props.href);
    collectLinks(props.children, links);
  }
  return links;
};

const slugCounts = new Map<string, number>();
for (const post of BLOG_POSTS) {
  slugCounts.set(post.slug, (slugCounts.get(post.slug) ?? 0) + 1);
}

const today = Date.now();
const issues: ValidationIssue[] = [];

for (const post of targets) {
  const contentText = extractText(post.content).replace(/\s+/g, ' ').trim();
  const links = collectLinks(post.content);
  const imagePath = post.image.startsWith('/') ? post.image.slice(1) : post.image;
  const imageFile = join(process.cwd(), 'public', imagePath);

  if (!post.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
    issues.push({ level: 'error', message: `${post.title}: invalid slug "${post.slug}".` });
  }

  if ((slugCounts.get(post.slug) ?? 0) > 1) {
    issues.push({ level: 'error', message: `${post.title}: duplicate slug "${post.slug}".` });
  }

  if (!post.title || post.title.length > 90) {
    issues.push({ level: 'warning', message: `${post.slug}: title is missing or longer than 90 characters.` });
  }

  if (!post.excerpt || post.excerpt.length < 80 || post.excerpt.length > 180) {
    issues.push({ level: 'warning', message: `${post.slug}: meta description should be 80-180 characters.` });
  }

  if (!post.imageAlt || post.imageAlt.length < 20) {
    issues.push({ level: 'error', message: `${post.slug}: missing useful imageAlt.` });
  }

  if (!existsSync(imageFile)) {
    issues.push({ level: 'error', message: `${post.slug}: missing hero image file at ${imageFile}.` });
  }

  if (!Number.isFinite(Date.parse(post.dateISO))) {
    issues.push({ level: 'error', message: `${post.slug}: dateISO is not parseable.` });
  } else if (Date.parse(post.dateISO) > today) {
    issues.push({ level: 'error', message: `${post.slug}: dateISO is future-dated.` });
  }

  if (!['Market Studies', 'Tech Corner'].includes(post.tab)) {
    issues.push({ level: 'error', message: `${post.slug}: invalid tab "${post.tab}".` });
  }

  if (!/^\/blog\/[a-z0-9-]+$/.test(`/blog/${post.slug}`)) {
    issues.push({ level: 'error', message: `${post.slug}: route is not slug-based.` });
  }

  if (links.some((href) => /^\/blog\/\d+\/?$/.test(href))) {
    issues.push({ level: 'error', message: `${post.slug}: content still contains numeric blog links.` });
  }

  if (!contentText.includes('GrowthSync')) {
    issues.push({ level: 'warning', message: `${post.slug}: body never mentions GrowthSync.` });
  }
}

console.log(`Checking ${targets.length} blog post${targets.length === 1 ? '' : 's'}...`);
console.log(`Catalog size: ${BLOG_POSTS.length}`);
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
