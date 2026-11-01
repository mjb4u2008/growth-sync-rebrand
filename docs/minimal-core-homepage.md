# Minimal GrowthSync website

## Direction

A bright, quiet homepage with one original interactive sculpture and one brand inquiry action. Company positioning is AI infrastructure for businesses. Core is the first product; commerce is the initial market, not the company identity. No metrics, customer logos, funding claims or fake activity.

Mike confirmed he loves the homepage's simplicity and asked that the blog match it. The journal now uses a dated list and one-column reader, with all existing writing and article URLs preserved.

## Implementation

- Home: restrained Hanken Grotesk type, neutral canvas, tangerine filament, one short statement and native inquiry dialog.
- Sculpture: 30 fps canvas; cached topology, DPR cap; pointer tilt, drag/arrow-key rotation and click/Enter reshape. Motion pauses while hidden, offscreen, dialog open, paused or reduced-motion is preferred. Touch can drag horizontally or tap; vertical page scrolling remains available.
- Journal: all 39 posts, All/Market studies/Tech corner filters, case-insensitive local search, meaningful empty state, natural document scrolling. Articles preserve original React content, headings, source links, related writing and numeric aliases. Direct section hashes work after lazy loading.
- Chrome: shared Home/Journal header and minimal legal footer; obsolete homepage section navigation is removed from public routes.
- Intake: required name, email, company, HTTP(S) website and optional context. Dedicated `brand-inquiry` source, server validation, schema-compatible storage, explicit website notifications, bounded upstream requests, disabled pending state and retained input after failure. Success requires `ok: true` and `captured: true`. Analytics failure cannot reverse a captured result.
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

## Release boundary

This is a replacement candidate from the React repository, not the currently deployed website. Current growthsync.com is served by Framer; an exact production source/project link has not been established. No deployment or DNS changes are authorized.

Before release, choose and verify the deployment project/platform; confirm the actual lead destination/account and delivery; review existing legal drafts (their effective dates remain TBD). Confirm the legacy entry points and actual hosting rewrite behavior on an authorized staging deployment. The current site remains available until Mike authorizes replacement.
