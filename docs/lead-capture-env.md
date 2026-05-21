# Book a Call Lead Capture Env

`/book-a-call` posts to `api/leads.ts`. The API validates on the server and succeeds only when at least one capture destination works.

Database capture:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_PUBLISHABLE_KEY` or `SUPABASE_ANON_KEY` as a fallback when the
  `book_call_leads_insert_only` RLS policy from
  `supabase/migrations/20260521000000_growthsync_book_call_leads.sql` is applied.

Notification capture:

- `GROWTHSYNC_LEAD_WEBHOOK_URL` or `LEAD_WEBHOOK_URL` or `SLACK_WEBHOOK_URL`
- `RESEND_API_KEY`
- `LEAD_NOTIFICATION_EMAIL`
- `LEAD_NOTIFICATION_FROM`

If Supabase is missing, webhook or Resend capture can still succeed. Never expose
`SUPABASE_SERVICE_ROLE_KEY` to client code. Publishable/anon keys are not service
keys, but keep them server-side for this API so every public lead request still
passes through `api/leads.ts` validation.

Supabase project used for verification on May 21, 2026:

- Project name: `mjb4u2008's Project`
- Project ref: `rskmykeqrrddkmqcbxyu`
- Note: this project was not empty. It already had Founder OS tables and rows,
  so GrowthSync lead capture was added as an isolated `public.book_call_leads`
  table without modifying existing Founder OS tables.

Vercel environment status on May 21, 2026:

- `SUPABASE_URL` added to production, preview, and development for project `newsite`.
- `SUPABASE_PUBLISHABLE_KEY` added to production, preview, and development for project `newsite`.
- `SLACK_WEBHOOK_URL` already existed in production.
- No deploy was run after changing environment variables.

Verification:

- Direct handler test inserted `codex-supabase-1779358472662@example.com`.
- Browser form test inserted `codex-browser-1779359771025@example.com` and routed to `/book-a-call/success`.
- Both rows were verified in `public.book_call_leads`.
- Public REST reads with the publishable key returned no rows because no select policy is exposed.
