# Paid Ads Readiness Build Guide

Date: 2026-06-05
Branch: `codex/paid-ads-readiness`

## Intent

Prepare the GrowthSync marketing site for a controlled paid-search pilot, with Google Ads as the first channel and Meta as a later channel, without enabling spend or mutating ad-platform accounts.

## Assumptions

- Primary destination: `https://growthsync.com/book-a-call`
- Legacy CTA destination: `https://growthsync.com/get-started`, which resolves to the same book-a-call route in `src/blog/router.tsx`.
- Primary conversion: successful `/api/leads` capture from the book-a-call form.
- The current thread has no dedicated Google Ads or Meta Ads MCP/CLI exposed, so platform mutations require browser/account access or a separate connected platform tool.
- User approved a $50/day starter budget on 2026-06-05 and asked for Google + Meta pixels to be connected.

## Non-Goals

- No Google Ads or Meta account creation.
- No billing, advertiser verification, OAuth app, or developer token setup.
- No live spend.
- No customer-list uploads.
- No unsupported performance, review, guarantee, or accreditation claims.

## Micro-PR Ledger

### 1. Paid Click Attribution Capture

Status: complete.

Definition of Done:

- Capture `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `gbraid`, `wbraid`, `fbclid`, and `msclkid` from landing URLs.
- Persist attribution in browser storage long enough for the SPA form flow, even when a paid click lands on the homepage or blog before the visitor clicks through to `/book-a-call`.
- Attach attribution to `/api/leads` submissions from `BookACall`.
- Avoid storing arbitrary query params or secrets.

Files:

- `src/utils/attribution.ts`
- `src/App.tsx`
- `src/pages/BookACall.tsx`

Verify:

- `npm run lint`
- Browser test: open `/book-a-call?utm_source=google&utm_medium=cpc&utm_campaign=gs-search-alpha&utm_content=conversation-ai&utm_term=social%20commerce%20ai&gclid=test-gclid`, submit the form, and inspect the `/api/leads` request payload.

Evidence:

- 2026-06-05: `npm run lint` passed.
- 2026-06-05: headless Chrome CDP E2E landed on `/?utm_source=google&utm_medium=cpc&utm_campaign=gs-search-alpha&utm_content=home-hero&utm_term=social%20commerce%20ai&gclid=test-gclid-123&gbraid=test-gbraid-456`, clicked through to `/book-a-call`, submitted the intake form, and confirmed the `/api/leads` request payload included the expected UTM fields plus `gclid` and `gbraid`.
- 2026-06-05: headless Chrome CDP storage-failure smoke test forced `localStorage.setItem` to throw and confirmed the current SPA session still submitted attribution through the in-memory fallback without runtime exceptions.
- 2026-06-05: headless Chrome CDP stale-storage smoke test confirmed a fresh paid click submitted `fresh-campaign`/`fresh-gclid` even when an older readable `localStorage` value existed and the fresh write was blocked.

### 2. Server-Side Attribution Storage

Status: complete.

Definition of Done:

- Accept optional attribution payload in `api/leads.ts`.
- Sanitize attribution fields with strict allow-listed keys and length limits.
- Store attribution under `metadata.attribution` in Supabase lead rows.
- Include concise attribution fields in webhook/email notifications without exposing raw secrets or arbitrary params.

Files:

- `api/leads.ts`

Verify:

- `npm run lint`
- Direct handler smoke test posts a lead with attribution and receives `{ ok: true }` when capture destinations are configured.

Evidence:

- 2026-06-05: direct `api/leads.ts` smoke test with a local mock webhook returned `ok: true`, included `source=google | medium=cpc | campaign=gs-search-alpha | gclid=present`, and dropped a non-allow-listed `ignored_param`.

### 3. Paid Media Docs And Manifest

Status: complete.

Definition of Done:

- Add a local paid-media manifest with Google Search pilot structure, UTMs, draft copy, keyword themes, negatives, conversion event, missing platform/account decisions, and kill rules.
- Update env/docs to list optional Google/Meta tag IDs as configuration placeholders only.
- Update privacy copy to reflect paid-ad measurement when those tags are enabled.
- Fix legal footer links so paid visitors can reach the canonical `/terms` route.

Files:

- `docs/paid-media/growthsync-paid-search-manifest-2026-06-05.md`
- `docs/lead-capture-env.md`
- `.env.example`
- `src/pages/Privacy.tsx`
- `src/lib/data.ts`
- `src/components/Footer.tsx`

Verify:

- `npm run lint`
- Manual readback of docs confirms no secrets, no live spend approval, and no unsupported claims.

Evidence:

- 2026-06-05: `docs/paid-media/growthsync-paid-search-manifest-2026-06-05.md` added as a local draft only with `CONTROLLED_PAID_PILOT: NO PASS` until account access, conversion action, budget, geos, and written launch approval are confirmed.

### 4. End-To-End Verification And Review

Status: complete.

Definition of Done:

- Run raw static gates: `npm run lint`, `npm run blog:check`, `npm run build`.
- Run local browser E2E for `/book-a-call` with Google UTM/click IDs and confirm request payload carries attribution.
- Independent review pass returns no active P1 and no undocumented P2 findings.
- Any open launch blockers are clearly labeled in the final paid-ads status report.

Files:

- No expected source changes beyond fixes found during verification.

Verify:

- `npm run lint`
- `npm run blog:check`
- `npm run build`
- Browser E2E payload inspection

Evidence:

- 2026-06-05: `npm run lint` passed.
- 2026-06-05: `npm run blog:check` passed for 39 blog posts.
- 2026-06-05: `npm run build` passed; Vite reported the existing large chunk warning.
- 2026-06-05: `git diff --check` passed.
- 2026-06-05: independent review found two P2 issues: blocked `localStorage` could throw during attribution capture, and privacy copy did not disclose the 90-day first-party browser storage. Both were fixed before final verification and sent through a fresh review pass.
- 2026-06-05: review refresh found two storage edge-case P2s: stale readable attribution could beat fresh memory attribution, and blocked `sessionStorage` could prevent success navigation after a captured lead. Both were fixed, with focused browser checks passing afterward.

### 5. Browser Pixel And Conversion Tags

Status: complete.

Definition of Done:

- Load Google tag only when `VITE_GOOGLE_TAG_ID` or `VITE_GOOGLE_ADS_CONVERSION_ID` is configured.
- Fire Google page views on SPA route changes.
- Fire Google Ads lead conversion only after `/api/leads` returns `ok`.
- Load Meta Pixel only when `VITE_META_PIXEL_ID` is configured.
- Fire Meta `PageView` on SPA route changes and `Lead` only after successful lead capture.
- Do not include raw PII, customer lists, or account secrets in browser tag payloads.
- Update privacy/docs/env examples to disclose and configure browser measurement tags.

Files:

- `src/utils/marketingTags.ts`
- `src/App.tsx`
- `src/pages/BookACall.tsx`
- `.env.example`
- `docs/lead-capture-env.md`
- `docs/paid-media/growthsync-paid-search-manifest-2026-06-05.md`
- `src/pages/Privacy.tsx`

Verify:

- `npm run lint`
- `npm run blog:check`
- `npm run build`
- Browser E2E with env IDs confirms Google and Meta scripts/events are requested only after config exists.
- Browser E2E without env IDs confirms no Google/Meta script requests fire.

Evidence:

- 2026-06-05: `npm run lint`, `npm run blog:check`, `npm run build`, and `git diff --check` passed after adding browser tags.
- 2026-06-05: browser/CDP tag smoke with fake IDs confirmed Google and Meta script requests only when public tag env vars were configured; test harness blocked external Google/Meta requests from reaching the network.
- 2026-06-05: browser/CDP conversion smoke confirmed Google Ads `conversion` fired with `send_to` only after `/api/leads` returned `ok`, and Meta `Lead` fired only after the same successful lead capture.
- 2026-06-05: no-env in-app browser smoke on `http://localhost:3000/?utm_source=google&utm_medium=cpc&utm_campaign=no-env-smoke&gclid=no-env-gclid` confirmed no `growthsync-google-tag` script, no `growthsync-meta-pixel` script, no `dataLayer`, no `gtag`, and no `fbq`.
- 2026-06-05: independent audit found two P2s after tag setup: page views could include arbitrary query params in ad-platform measurement URLs, and fast double-submit could duplicate lead/conversion events. Fixed by stripping non-allow-listed query params before page-view measurement and by adding a synchronous submit guard plus disabled submit CTA.
- 2026-06-05: in-app browser sanitizer smoke loaded `/blog?email=bad@example.com&phone=555&utm_source=google&utm_medium=cpc&utm_campaign=sanitize-smoke&gclid=safe-gclid&tab=tech-corner` and confirmed the live URL was rewritten without `email` or `phone` while preserving `utm_*`, `gclid`, and `tab`.
- 2026-06-05: Google Ads account display name was corrected to `GrowthSync`; Google conversion action `Book a call lead` was created with tag `AW-18183231509` and label `lvkdCKawyrkcEJWwuN5D`; Vercel Google tag env vars were added for production, preview, and development.
- 2026-06-05: Google Ads billing readback found no linked payment profile and no billing setup, so Google cannot show ads yet even though conversion setup exists.

## Launch Approval Required Later

Before enabling spend or creating platform drafts through Google/Meta, collect:

- Google Ads account/customer ID and confirmed login.
- Google Ads billing setup and linked payment profile readback.
- Meta ad account, Page, Instagram identity, and Pixel/dataset IDs if Meta is included.
- Daily/total budget cap and dates.
- Target geographies and exclusions.
- Approved keyword list, negative list, ad copy, landing page, and CTA.
- Conversion action name and whether enhanced conversions/offline conversion upload is approved.
- Kill rules and owner for the first 24 hours.
- Written approval with allowed mutation: `create paused drafts` or `enable approved campaign`.
