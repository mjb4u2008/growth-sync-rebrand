# Social Commerce Convergence Blog Build Guide

## Intent

Publish a source-backed GrowthSync blog post by Michael Broughton for June 5, 2026 at 5:00 a.m. ET titled "The Convergence Is Happening."

## Scope

- Add the new post at the top of `src/data/blogPosts.tsx`.
- Use current GrowthSync blog voice, JSX structure, source links, internal related links, and `/get-started` CTA.
- Add a distinct Y2K/Aqua hero image spec and generate the image.
- Regenerate the sitemap.
- Run the required blog validation, link audit, lint, and build checks.

## Non-Goals

- No changes to the blog shell, routing, layout, or visual system.
- No broad refactor of existing posts or legacy numeric links.
- No claim that Everlane's sale was caused by one factor alone.

## Checklist

- [x] Research current facts and source dates for ATT, CAC pressure, Everlane, TikTok Shop, Whatnot/eBay Live, and Meta Business Agent.
- [x] Add post `id: 39` with title, excerpt, author, category, tags, content, sources, and CTA.
- [x] Add `the-convergence-is-happening` image spec.
- [x] Generate `/public/blog/the-convergence-is-happening.png`.
- [x] Run `npm run sitemap`.
- [x] Run `npm run blog:check`.
- [x] Run `npm run blog:link-audit`.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.

## Verification Evidence

- Research evidence: Apple Newsroom, Apple Developer, L.E.K., Reuters via Investing.com, TikTok Newsroom, eBay Newsroom, Retail Dive/EMARKETER, Meta Newsroom, Greycroft.
- Image generation: `npm run blog:images -- --dry-run the-convergence-is-happening`; `npm run blog:images -- --overwrite the-convergence-is-happening`; inspected final image.
- Sitemap: `npm run sitemap` updated `public/sitemap.xml` with 39 blog posts.
- Blog check: `npm run blog:check` passed for 39 posts.
- Link audit: `npm run blog:link-audit` passed with 0 errors and 0 warnings across 39 posts.
- Lint: `npm run lint` passed after restoring declared missing React type packages with `npm install`.
- Build: `npm run build` passed; Vite emitted only the existing chunk-size warning.
- Browser E2E: Playwright loaded `http://localhost:3000/blog` and `http://localhost:3000/blog/the-convergence-is-happening`; verified top listing, slug render, CTA, sources, and hero image dimensions `1344x768`.
