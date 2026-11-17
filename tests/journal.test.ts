import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import React, { type ReactNode } from 'react';
import { BLOG_POSTS } from '../src/blog/data';
import { getAllPosts, getHeadingsFromPost, getPostBySlug, getRelatedPosts } from '../src/blog/utils';
import { JOURNAL_REDIRECTS } from '../src/blog/journal/legacyRedirects';

function textOf(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(' ');
  return React.isValidElement<{ children?: ReactNode }>(node) ? textOf(node.props.children) : '';
}

test('the focused journal has nine substantial, distinct essays', () => {
  assert.equal(BLOG_POSTS.length, 9);
  assert.equal(new Set(BLOG_POSTS.map(post => post.slug)).size, 9);
  assert.equal(BLOG_POSTS.filter(post => post.category === 'Case studies').length, 3);
  for (const post of BLOG_POSTS) {
    const words = textOf(post.content).trim().split(/\s+/).length;
    assert.ok(words >= 750, `${post.slug} is substantial (${words} words)`);
    const headings = getHeadingsFromPost(post);
    assert.ok(headings.length >= 4, `${post.slug} has a developed argument`);
    assert.equal(new Set(headings.map(h => h.id)).size, headings.length);
    assert.ok(post.excerpt.length >= 80 && post.excerpt.length <= 180);
  }
});

test('all 39 old slugs and 39 numeric URLs resolve and permanently redirect', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  assert.equal(Object.keys(JOURNAL_REDIRECTS).length, 78);
  for (const [old, current] of Object.entries(JOURNAL_REDIRECTS)) {
    const target = getPostBySlug(old);
    assert.equal(target?.slug, current, old);
    assert.notEqual(old, current);
    assert.equal(JOURNAL_REDIRECTS[current], undefined, 'No redirect chain');
    assert.ok(config.redirects.some((r: { source: string; destination: string; permanent: boolean }) =>
      r.source === `/blog/${old}` && r.destination === `/blog/${current}` && r.permanent));
    assert.ok(getRelatedPosts(old).every(post => post.slug !== current), 'Related articles omit current article');
  }
});

test('new company essays do not impersonate team members', () => {
  assert.ok(BLOG_POSTS.every(post => post.author.name === 'GrowthSync'));
  const tanner = getPostBySlug('why-tanner-joined-growthsync');
  assert.match(tanner?.editorialNote || '', /May 16, 2026/);
  assert.match(tanner?.editorialNote || '', /Adapted by GrowthSync/);
});

test('publishing the next essay preserves existing IDs, publication dates, and revision dates', () => {
  const existingPosts = [
    { slug: 'a-new-foundation-for-business', id: 1001, dateISO: '2025-10-23' },
    { slug: 'what-jpmorgans-technology-budget-is-building', id: 1002, dateISO: '2026-06-18' },
    { slug: 'walmart-company-context-operating-capability', id: 1003, dateISO: '2026-09-17' },
    { slug: 'capacity-is-not-a-business-capability', id: 1004, dateISO: '2026-10-30' },
    { slug: 'the-model-is-not-the-operating-system', id: 1005, dateISO: '2026-08-13' },
    { slug: 'your-companys-memory-should-belong-to-your-company', id: 1006, dateISO: '2025-12-11' },
    { slug: 'from-buying-software-to-building-capability', id: 1007, dateISO: '2026-02-12' },
    { slug: 'why-tanner-joined-growthsync', id: 1008, dateISO: '2026-03-02' },
  ];
  for (const existing of existingPosts) {
    const post = getPostBySlug(existing.slug);
    assert.equal(post?.id, existing.id, `${existing.slug} keeps its ID`);
    assert.equal(post?.dateISO, existing.dateISO, `${existing.slug} keeps its publication date`);
    assert.equal(post?.updatedDateISO, '2026-11-01', `${existing.slug} keeps its revision date`);
  }
  const nextPost = getPostBySlug('built-around-the-business');
  assert.equal(nextPost?.id, 1009);
  assert.equal(nextPost?.dateISO, '2026-11-17');
  assert.equal(nextPost?.updatedDateISO, '2026-11-17');
  const posts = getAllPosts();
  assert.equal(posts[0].slug, 'built-around-the-business');
  assert.equal(posts[0].dateISO, '2026-11-17');
  assert.equal(posts.at(-1)?.dateISO, '2025-10-23');
  assert.equal(new Set(posts.map(post => post.dateISO)).size, 9);
  assert.equal(new Set(posts.map(post => post.id)).size, 9);
  for (const post of posts) {
    assert.ok(Date.parse(post.dateISO) <= Date.parse(post.updatedDateISO!));
    assert.ok(post.title.length <= 40, 'Titles stay concise');
  }
});

test('editorial covers ship locally with descriptions and bounded payloads', () => {
  const covers = BLOG_POSTS.filter(post => post.cover);
  assert.equal(covers.length, 5);
  for (const post of covers) {
    assert.equal(post.image, post.cover!.src, 'Social image matches the visible artwork');
    assert.ok(post.cover!.alt.length > 30, 'Artwork has a useful description');
    const asset = new URL(`../public${post.cover!.src}`, import.meta.url);
    assert.ok(statSync(asset).size > 1000, 'Cover exists as a real local asset');
    assert.ok(statSync(asset).size < 400_000, 'Cover stays within the image payload budget');
  }
});
