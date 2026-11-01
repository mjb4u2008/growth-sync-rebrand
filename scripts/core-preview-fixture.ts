/** Local verification only. Does not load .env files or contact external services. */
import express from 'express';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

for (const name of ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_PUBLISHABLE_KEY', 'SUPABASE_ANON_KEY', 'GROWTHSYNC_LEAD_WEBHOOK_URL', 'LEAD_WEBHOOK_URL', 'SLACK_WEBHOOK_URL', 'RESEND_API_KEY']) {
  delete process.env[name];
}
const { default: handler } = await import('../api/leads.ts');
const app = express();
app.use(express.json());
let mode = 'success';
const receipts: unknown[] = [];
// The handler sees a real HTTP response from this in-process capture stub.
// No original fetch reference is retained: outbound network is impossible here.
globalThis.fetch = async (url, options) => {
  if (String(url) !== 'https://formspree.io/f/mkodogar') throw new Error('Unexpected capture destination');
  if (mode === 'slow') await new Promise(resolve => setTimeout(resolve, 4000));
  if (mode === 'failure') return new Response('{}', { status: 503 });
  receipts.push(JSON.parse(String(options?.body)));
  return new Response('{}', { status: 200 });
};
app.post('/_fixture/mode/:mode', (req, res) => {
  if (!['success', 'failure', 'slow', 'unconfirmed'].includes(String(req.params.mode))) return res.sendStatus(400);
  mode = String(req.params.mode);
  res.json({ mode });
});
app.get('/_fixture/receipts', (_req, res) => res.json({ mode, receipts }));
app.post('/api/leads', async (req, res) => {
  if (!String(req.body?.email || '').endsWith('@example.com')) {
    return res.status(400).json({ ok: false, error: 'Local fixture accepts example.com test addresses only.' });
  }
  if (mode === 'unconfirmed') return res.json({ ok: true });
  await handler(req, res);
});
app.use(express.static(path.resolve('dist'), { index: false }));
app.get('*', async (req, res) => {
  let html = await readFile(path.resolve('dist/index.html'), 'utf8');
  if (req.query.motion === 'reduce') {
    html = html.replace('<head>', `<head><script>
      const realMatchMedia = window.matchMedia.bind(window);
      window.matchMedia = query => query.includes('prefers-reduced-motion')
        ? Object.assign(new EventTarget(), { matches: true, media: query, onchange: null })
        : realMatchMedia(query);
    </script>`);
  }
  res.type('html').send(html);
});
app.listen(3100, '127.0.0.1', () => console.log('Isolated built-site preview: http://127.0.0.1:3100 (example.com test emails only)'));
