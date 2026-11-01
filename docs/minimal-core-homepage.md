# Minimal GrowthSync website

## Direction

A bright, quiet homepage with one original interactive sculpture and one brand inquiry action. Company positioning is AI infrastructure for businesses. Core is the first product; commerce is the initial market, not the company identity. No metrics, customer logos, funding claims or fake activity.

Mike confirmed he loves the homepage's simplicity and asked that the blog match it. The journal now uses a dated list and one-column reader, with all existing writing and article URLs preserved.

## Implementation

- Home: restrained Hanken Grotesk type, neutral canvas, black/orange particle sculpture, one short statement and native inquiry dialog.
- Sculpture: 30 fps canvas; deterministic particle seeds, DPR cap; pointer tilt, drag/arrow-key rotation and click/Enter reshape. Motion pauses while hidden, offscreen, dialog open, paused or reduced-motion is preferred. Touch can drag horizontally or tap; vertical page scrolling remains available.
- Journal: all 39 posts, All/Market studies/Tech corner filters, case-insensitive local search, meaningful empty state, natural document scrolling. Articles preserve original React content, headings, source links, related writing and numeric aliases. Direct section hashes work after lazy loading.
- Chrome: shared Home/Journal header and minimal legal footer; obsolete homepage section navigation is removed from public routes.
- Intake: required name, email, company, HTTP(S) website and optional context. Dedicated `brand-inquiry` source, server validation, schema-compatible storage, explicit website notifications, bounded upstream requests, disabled pending state and retained input after failure. Success requires `ok: true` and `captured: true`. Analytics failure cannot reverse a captured result. The confirmed inquiry then opens the verified Calendly introduction event, prefilled with name/email; a booking is confirmed only after a trusted iframe event.
- Supporting pages are loaded separately to keep the initial homepage JavaScript small. Old journal window styles are no longer loaded.

## Local verification

Run from this checkout:

```sh
npm ci
npm run deploy:check
npm run test:leads
npm run preview:fixture
```

`deploy:check` performs TypeScript, validates 39 posts and builds the production bundle. `test:leads` mocks every upstream request. `preview:fixture` serves the built site at http://127.0.0.1:3100 with an isolated in-memory capture stub. It only accepts `@example.com` test addresses; it never contacts real destinations or loads .env files. Its mode/receipt endpoints are local test controls, not part of the production bundle or serverless API.

For UI authoring, `npm run dev` serves Vite at port 3000. Vite alone does not host the production lead API.

## Release and rollback

Mike authorized migrating growthsync.com from Framer to this custom build on November 1, 2026. The intended hosting project is the existing RM Growth / newsite Vercel project linked to the growth-sync-rebrand repository. Stage with production environment values and `--skip-domain`, verify it, then promote and change only the website DNS records at Namecheap. Keep the Framer project intact for rollback and preserve email/API/subdomain records.

The live Framer legal documents have been carried over, with the privacy notice updated for actual inquiry fields, storage/notifications and attribution. `/legals/privacy-policy` and `/legals/terms-of-service` redirect to the corresponding preserved legal pages.

The active scheduling event is `https://calendly.com/mike-rmgrowth/intro-michael-broughton`, a 20-minute introduction verified through the existing account API. No test appointment needs to be created for release validation.

## Motion and headline studies

Mike requested more active alternatives to the orange/black woven loop and new headline wordplay, while preserving the approved homepage. A local-only `/concepts` studio runs under `npm run dev` on port 3000. It compares the original with Ribbon, Orbit and Tide and offers six headline choices. Controls can be hidden to inspect a combination in the actual homepage layout. The studio route and its controls are excluded from production builds. Orbit has since been selected for the main homepage; the other choices remain available in the local studio.

## Selected direction — November 1

Mike selected **Orbit + “The shape of what’s next.”** The main homepage now defaults to this combination, including browser/social titles. The original woven form and the other studies remain selectable in the local studio. This selection updates the review candidate; it does not authorize deployment.
