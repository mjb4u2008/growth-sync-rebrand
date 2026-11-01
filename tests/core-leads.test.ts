import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/leads.ts';

const notificationVariables = [
  'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_PUBLISHABLE_KEY', 'SUPABASE_ANON_KEY',
  'GROWTHSYNC_LEAD_WEBHOOK_URL', 'LEAD_WEBHOOK_URL', 'SLACK_WEBHOOK_URL', 'RESEND_API_KEY',
  'LEAD_NOTIFICATION_EMAIL', 'LEAD_NOTIFICATION_FROM',
];
const inquiry = {
  name: 'Website Test', company: 'Example Brand', email: 'website-test@example.com',
  website: 'https://example.com', notes: 'Testing a useful workflow', source: 'brand-inquiry',
};
const allDestinations = {
  SUPABASE_URL: 'https://database.example.test', SUPABASE_SERVICE_ROLE_KEY: 'isolated-test-key',
  GROWTHSYNC_LEAD_WEBHOOK_URL: 'https://webhook.example.test', RESEND_API_KEY: 'isolated-test-key',
  LEAD_NOTIFICATION_EMAIL: 'notification@example.test', LEAD_NOTIFICATION_FROM: 'sender@example.test',
};
type Outbound = { url: string; body: Record<string, any>; signal: AbortSignal | null | undefined };
type RunOptions = {
  upstreamStatus?: number;
  method?: string;
  env?: Record<string, string>;
  respond?: (call: Outbound) => Response | Promise<Response>;
};

/** Every upstream is intercepted, including when the local shell has real credentials. */
async function run(body: unknown, options: RunOptions = {}) {
  const oldFetch = globalThis.fetch;
  const oldEnv = Object.fromEntries(notificationVariables.map(key => [key, process.env[key]]));
  notificationVariables.forEach(key => { delete process.env[key]; });
  Object.assign(process.env, options.env || {});
  const outbound: Outbound[] = [];
  globalThis.fetch = async (url, init) => {
    const call = { url: String(url), body: JSON.parse(String(init?.body)), signal: init?.signal };
    outbound.push(call);
    return options.respond ? options.respond(call) : new Response('{}', { status: options.upstreamStatus ?? 200 });
  };
  let status = 0;
  let result: any;
  const headers: Record<string, string> = {};
  const response = {
    setHeader(key: string, value: string) { headers[key] = value; },
    status(value: number) { status = value; return this; },
    json(value: unknown) { result = value; },
  };
  try {
    await handler({ method: options.method || 'POST', body, headers: { 'user-agent': 'isolated-test' } }, response);
    return { status, result, outbound, headers };
  } finally {
    globalThis.fetch = oldFetch;
    notificationVariables.forEach(key => {
      if (oldEnv[key] === undefined) delete process.env[key]; else process.env[key] = oldEnv[key];
    });
  }
}

test('brand inquiry reaches the existing capture destination with explicit website and context', async () => {
  const result = await run(inquiry);
  assert.equal(result.status, 200);
  assert.equal(result.result.ok, true);
  assert.equal(result.result.captured, true);
  assert.equal(result.result.destinations.formspree, true);
  assert.equal(result.outbound.length, 1);
  assert.equal(result.outbound[0].url, 'https://formspree.io/f/mkodogar');
  assert.equal(result.outbound[0].body.company, inquiry.company);
  assert.equal(result.outbound[0].body.website, inquiry.website);
  assert.equal(result.outbound[0].body.phone, undefined);
  assert.equal(result.outbound[0].body.source, 'brand-inquiry');
  assert.equal(result.outbound[0].body.notes, inquiry.notes);
});

test('brand website survives webhook, email and schema-compatible database capture', async () => {
  const result = await run(inquiry, { env: allDestinations });
  assert.equal(result.outbound.length, 4);
  const webhook = result.outbound.find(call => call.url === allDestinations.GROWTHSYNC_LEAD_WEBHOOK_URL)!;
  assert.equal(webhook.body.website, inquiry.website);
  const database = result.outbound.find(call => call.url.includes('/rest/v1/'))!;
  assert.equal(database.body.social_handles, inquiry.website);
  assert.equal(database.body.metadata.website, inquiry.website);
  assert.equal(database.body.source, 'brand-inquiry');
  const email = result.outbound.find(call => call.url === 'https://api.resend.com/emails')!;
  assert.match(email.body.text, /New GrowthSync brand inquiry/);
  assert.match(email.body.text, /Website: https:\/\/example.com/);
  assert.equal(result.result.captured, true);
});

test('invalid or missing brand websites cannot reach a capture destination', async () => {
  for (const website of ['', 'example.com', 'ftp://example.com', 'javascript:alert(1)', 'https://', 'https://bad host']) {
    const result = await run({ ...inquiry, website });
    assert.equal(result.status, 400, website);
    assert.equal(result.result.ok, false);
    assert.equal(result.outbound.length, 0);
  }
  const result = await run({ ...inquiry, website: undefined, socialHandles: 'https://legacy.example.com' });
  assert.equal(result.status, 400, 'brand inquiries must provide the explicit website field');
  assert.equal(result.outbound.length, 0);
});

test('HTTP websites and trimmed identity fields are accepted', async () => {
  const result = await run({ ...inquiry, name: '  Website Test  ', email: ' TEST@example.com ', website: 'http://example.com' });
  assert.equal(result.status, 200);
  assert.equal(result.outbound[0].body.name, 'Website Test');
  assert.equal(result.outbound[0].body.email, 'test@example.com');
  assert.equal(result.outbound[0].body.website, 'http://example.com');
});

test('legacy book-a-call and summit requests retain their existing fields', async () => {
  for (const source of ['book-a-call', 'social-commerce-summit']) {
    const result = await run({ name: inquiry.name, company: inquiry.company, email: inquiry.email, socialHandles: '@example', source });
    assert.equal(result.status, 200);
    assert.equal(result.outbound[0].body.phone, '@example');
    assert.equal(result.outbound[0].body.website, undefined);
    assert.equal(result.outbound[0].body.source, source);
  }
  const defaultSource = await run({ name: inquiry.name, company: inquiry.company, email: inquiry.email, social: '@example' });
  assert.equal(defaultSource.status, 200);
  assert.equal(defaultSource.outbound[0].body.source, 'book-a-call');
});

test('partial destination failure still confirms the destination that captured the inquiry', async () => {
  const result = await run(inquiry, {
    env: { GROWTHSYNC_LEAD_WEBHOOK_URL: 'https://webhook.example.test' },
    respond: call => new Response('{}', { status: call.url.includes('webhook.example.test') ? 503 : 200 }),
  });
  assert.equal(result.status, 200);
  assert.equal(result.result.captured, true);
  assert.equal(result.result.destinations.webhook, false);
  assert.equal(result.result.destinations.formspree, true);
  assert.deepEqual(result.result.warnings, ['Webhook notification failed.']);
});

test('all unavailable capture destinations never return a success receipt', async () => {
  const result = await run(inquiry, { upstreamStatus: 503, env: allDestinations });
  assert.equal(result.status, 503);
  assert.equal(result.result.ok, false);
  assert.equal(result.result.captured, undefined);
  assert.equal(result.outbound.length, 4);
});

test('every upstream fetch receives a timeout signal of at most eight seconds', async () => {
  const originalTimeout = AbortSignal.timeout;
  const durations: number[] = [];
  AbortSignal.timeout = (duration: number) => {
    durations.push(duration);
    return originalTimeout(duration);
  };
  try {
    const result = await run(inquiry, { env: allDestinations });
    assert.equal(result.status, 200);
    assert.equal(durations.length, 4);
    assert.ok(durations.every(duration => duration > 0 && duration <= 8000));
    assert.ok(result.outbound.every(call => call.signal instanceof AbortSignal && !call.signal.aborted));
  } finally {
    AbortSignal.timeout = originalTimeout;
  }
});

test('invalid identity and malformed or non-object bodies cannot reach a capture destination', async () => {
  for (const body of [
    { ...inquiry, email: 'not-an-email' }, { ...inquiry, company: '' }, { ...inquiry, name: '   ' },
    '{broken-json', 'null', 'true', '42', '[]', '"string"', null, true, 42, [],
  ]) {
    const result = await run(body);
    assert.equal(result.status, 400, JSON.stringify(body));
    assert.equal(result.result.ok, false);
    assert.equal(result.outbound.length, 0);
  }
});

test('non-POST requests are rejected without side effects', async () => {
  const result = await run(inquiry, { method: 'GET' });
  assert.equal(result.status, 405);
  assert.equal(result.headers.Allow, 'POST');
  assert.equal(result.headers['Cache-Control'], 'no-store');
  assert.equal(result.outbound.length, 0);
});
