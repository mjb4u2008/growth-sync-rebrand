import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import React, { type ReactNode } from 'react';
import { BLOG_POSTS } from '../src/blog/data';
import { getHeadingsFromPost, getPostBySlug, getRelatedPosts } from '../src/blog/utils';
import { JOURNAL_REDIRECTS } from '../src/blog/journal/legacyRedirects';

function textOf(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(' ');
  return React.isValidElement<{ children?: ReactNode }>(node) ? textOf(node.props.children) : '';
}

test('the focused journal has eight substantial, distinct essays', () => {
  assert.equal(BLOG_POSTS.length, 8);
  assert.equal(new Set(BLOG_POSTS.map(post => post.slug)).size, 8);
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
