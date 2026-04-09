# Image Workflow

GrowthSync blog hero images use the Signal Worlds system.

## Source of Truth

Read these before generating the image:

- `blog-image-theme.md`
- `scripts/generate-blog-images.ts`

## Rules

- Every post gets its own image slug in `scripts/generate-blog-images.ts`
- The scene should express the article's core idea, not a generic tech concept
- Do not repeat the same silhouette from a recent post
- No photorealism
- No text baked into the image
- No fake people

## Command

After you add or update the slug spec, run:

```bash
npm run blog:images -- <slug>
```

This uses `GEMINI_API_KEY` from `.env.local` through `scripts/generate-blog-images.ts`.

## Quality Bar

Before accepting the image:

- compare it against the most recent featured blog cards
- make sure it does not feel like a remix of another post
- make sure the concept is readable at card size
- regenerate or refine the scene if the idea is muddy
