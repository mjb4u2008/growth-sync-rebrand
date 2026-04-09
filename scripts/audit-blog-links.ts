import React, { type ReactNode } from 'react';
import { blogPosts } from '../src/data/blogPosts';
import { getMarketContextLinks, getRelatedPosts, hasPostSpecificMarketContext } from '../src/utils/blogLinks';

type AuditIssue = {
  level: 'error' | 'warning';
  message: string;
};

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

const claimHeavyPattern = /\b(\$[\d,.]+|\d+%|202[4-9]|billion|million|thousand)\b/i;

let errorCount = 0;
let warningCount = 0;

for (const post of blogPosts) {
  const contentText = extractText(post.content).replace(/\s+/g, ' ').trim();
  const contentLinks = collectLinks(post.content);
  const externalContentLinks = contentLinks.filter((href) => href.startsWith('http'));
  const internalContentLinks = contentLinks.filter((href) => href.startsWith('/'));
  const relatedPosts = getRelatedPosts(blogPosts, post, 3);
  const marketContextLinks = getMarketContextLinks(post, 2);
  const hasCuratedMarketContext = hasPostSpecificMarketContext(post.id);
  const issues: AuditIssue[] = [];

  if (relatedPosts.length < 2) {
    issues.push({
      level: 'error',
      message: 'Less than 2 related internal links were generated for this post.',
    });
  }

  if (marketContextLinks.length < 1) {
    issues.push({
      level: 'error',
      message: 'No external market-context links were generated for this post.',
    });
  }

  if (claimHeavyPattern.test(contentText) && externalContentLinks.length === 0 && !hasCuratedMarketContext) {
    issues.push({
      level: 'warning',
      message: 'Claim-heavy post has no in-body external source links. Consider a manual citation pass.',
    });
  }

  const status = issues.some((issue) => issue.level === 'error') ? 'FAIL' : issues.length > 0 ? 'WARN' : 'PASS';

  console.log(`${status}  ${post.id}  ${post.title}`);
  console.log(`      related:${relatedPosts.length}  market:${marketContextLinks.length}  curated-market:${hasCuratedMarketContext ? 'yes' : 'no'}  content-external:${externalContentLinks.length}  content-internal:${internalContentLinks.length}`);

  for (const issue of issues) {
    console.log(`      ${issue.level.toUpperCase()}: ${issue.message}`);
    if (issue.level === 'error') {
      errorCount += 1;
    } else {
      warningCount += 1;
    }
  }
}

console.log('');
console.log(`Audit complete. ${errorCount} errors, ${warningCount} warnings across ${blogPosts.length} posts.`);

process.exit(errorCount > 0 ? 1 : 0);
