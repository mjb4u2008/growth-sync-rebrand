# Blog Publisher Aqua Skill Build Guide

## Scope

- Keep one GrowthSync blog skill, updated for the live Y2K/Aqua blog on `https://www.growthsync.com/blog`.
- Document the refactored blog architecture: legacy post data feeds the `src/blog` signals.psheet app.
- Remove stale clay, morphism, `blog-image-theme.md`, `/demo`, and old `src/pages/Blog*.tsx` guidance from the skill.
- Preserve the existing publishing workflow: post data, image spec, sitemap, blog checks, link audit, lint, and build.

## Ledger

- [x] Confirm the live page matches this checkout's `src/blog` app.
  - DoD: live bundle contains `signals.psheet` and current blog slugs.
  - Verify: `curl -L --compressed -s https://www.growthsync.com/blog` and inspect the loaded JS asset.
  - Evidence: live HTML loads `/assets/index-IKKnVT42.js`; that bundle contains `signals.psheet`, `/blog/:slug` routing, and current posts including `Why I Joined GrowthSync`.
- [x] Update `.agents/skills/blog-publisher` for the live Y2K/Aqua workflow.
  - DoD: skill references `src/blog/*`, `src/data/blogPosts.tsx`, `scripts/generate-blog-images.ts`, and current CTA paths.
  - Verify: `rg -n "Signal Worlds|blog-image-theme|/demo|src/pages/Blog" .agents/skills/blog-publisher`, then confirm any matches are explicit guardrails against stale workflow use.
  - Evidence: stale terms now appear only as guardrails; the skill points to `src/blog/*`, `src/data/blogPosts.tsx`, `scripts/generate-blog-images.ts`, `/get-started`, and `/book-a-call`.
- [NEEDS-VERIFICATION] Validate the repo still passes blog and app checks after the skill-only change.
  - DoD: required validation commands pass or failures are documented.
  - Verify: `npm run blog:check`, `npm run blog:link-audit`, `npm run lint`, `npm run build`.
  - Evidence: `npm run blog:check` passed for 38 posts; `npm run blog:link-audit` passed with 0 errors and 0 warnings; `npm run build` passed. `npm run lint` failed in untouched TSX files with existing `key` prop and `React` namespace type errors, so the full gate is not green.

## Non-Goals

- Do not publish a new blog post in this change.
- Do not refactor blog runtime code.
- Do not regenerate blog images.
