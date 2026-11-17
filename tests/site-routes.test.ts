import test from 'node:test';
import assert from 'node:assert/strict';
import { pathToRoute } from '../src/blog/router';
import { LOGIN_URL } from '../src/pages/config';

test('growth landing page is independent of the minimal home and supports campaign URLs', () => {
  for (const path of ['/grow', '/grow/', '/grow?utm_source=outbound&utm_campaign=demo', '/grow/?utm_source=email']) {
    assert.deepEqual(pathToRoute(path), { kind: 'grow' });
  }
  assert.deepEqual(pathToRoute('/'), { kind: 'home' });
  assert.deepEqual(pathToRoute('/grow/missing'), { kind: 'not-found', pathname: '/grow/missing' });
});

test('current account entry uses the existing HTTPS app origin and keeps session routing with the app', () => {
  const login = new URL(LOGIN_URL);
  assert.equal(login.origin, 'https://app.growthsync.com');
  assert.equal(login.pathname, '/');
  assert.equal(login.search, '');
});

test('adding grow does not intercept journal or existing demo routes', () => {
  assert.deepEqual(pathToRoute('/blog/built-around-the-business'), { kind: 'blog-post', slug: 'built-around-the-business' });
  assert.deepEqual(pathToRoute('/blog?category=Perspectives'), { kind: 'blog-index', search: 'category=Perspectives' });
  assert.deepEqual(pathToRoute('/book-a-call'), { kind: 'book-a-call' });
  assert.deepEqual(pathToRoute('/get-started'), { kind: 'book-a-call' });
});
