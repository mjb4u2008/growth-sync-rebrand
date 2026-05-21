import React, { type ReactNode } from 'react';
import { BLOG_POSTS } from '../src/blog/data';
import { getRelatedPosts } from '../src/blog/utils';

type AuditIssue = {
  level: 'error' | 'warning';
  message: string;
};

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

const claimHeavyPattern = /\b(\$[\d,.]+|\d+%|202[4-9]|billion|million|thousand)\b/i;

let errorCount = 0;
let warningCount = 0;

for (const post of BLOG_POSTS) {
  const contentText = extractText(post.content).replace(/\s+/g, ' ').trim();
  const contentLinks = collectLinks(post.content);
  const externalContentLinks = contentLinks.filter((href) => href.startsWith('http'));
  const internalContentLinks = contentLinks.filter((href) => href.startsWith('/'));
  const relatedPosts = getRelatedPosts(post.slug, 3);
  const issues: AuditIssue[] = [];

  if (relatedPosts.length < Math.min(2, BLOG_POSTS.length - 1)) {
    issues.push({ level: 'error', message: 'Less than 2 related internal links were generated for this post.' });
  }

  if (contentLinks.some((href) => /^\/blog\/\d+\/?$/.test(href))) {
    issues.push({ level: 'error', message: 'Content still links to numeric blog URLs.' });
  }

  if (claimHeavyPattern.test(contentText) && externalContentLinks.length === 0) {
    issues.push({
      level: 'warning',
      message: 'Claim-heavy post has no in-body external source links. Consider a manual citation pass.',
    });
  }

  const status = issues.some((issue) => issue.level === 'error') ? 'FAIL' : issues.length > 0 ? 'WARN' : 'PASS';

  console.log(`${status}  ${post.slug}  ${post.title}`);
  console.log(`      related:${relatedPosts.length}  content-external:${externalContentLinks.length}  content-internal:${internalContentLinks.length}`);

  for (const issue of issues) {
    console.log(`      ${issue.level.toUpperCase()}: ${issue.message}`);
    if (issue.level === 'error') errorCount += 1;
    else warningCount += 1;
  }
}

console.log('');
console.log(`Audit complete. ${errorCount} errors, ${warningCount} warnings across ${BLOG_POSTS.length} posts.`);

process.exit(errorCount > 0 ? 1 : 0);
