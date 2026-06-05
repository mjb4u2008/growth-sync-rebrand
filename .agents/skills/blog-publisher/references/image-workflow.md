# Image Workflow

GrowthSync blog hero images use the live Y2K/Aqua social-commerce operating-system style.

## Source of Truth

Read these before generating the image:

- `scripts/generate-blog-images.ts`
- `docs/blog-image-sample-review.md` if you need historical notes on accepted Y2K samples

## Rules

- Every post gets its own image slug in `scripts/generate-blog-images.ts`
- The scene should express the article's core idea, not a generic tech concept
- Do not repeat the same silhouette from a recent post
- Match the current brand materials: cream paper, subtle pinstripe texture, Aqua glass, tangerine status lights, retro desktop chrome, blank spreadsheets, blank CRM cards, abstract comments and DMs
- No clay characters, mascot figures, old morphism compositions, or generic SaaS dashboards
- No photorealistic people
- No text baked into the image
- No logos, app icons, platform marks, play buttons, readable labels, pseudo-text, numbers, currency symbols, `@` symbols, or micro-writing

## Command

After you add or update the slug spec, dry-run the prompt if you need to inspect it:

```bash
npm run blog:images -- --dry-run <slug>
```

Then generate:

```bash
npm run blog:images -- <slug>
```

This uses `GEMINI_API_KEY` from `.env.local` through `scripts/generate-blog-images.ts`.

## Quality Bar

Before accepting the image:

- compare it against the most recent featured blog cards
- compare it against the live `/blog` grid/reader if visual context is uncertain
- make sure it does not feel like a remix of another post
- make sure the concept is readable at card size
- regenerate or refine the scene if the idea is muddy
