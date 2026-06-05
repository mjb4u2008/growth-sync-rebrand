# Process

This is the publishing sequence for every new GrowthSync blog post.

## Inputs

Try to get these from the user or infer them from the draft:

- article body or strong outline
- author, `Michael` or `Rod`
- category, if it is not obvious from the draft
- any must-keep source links, stats, or phrases

If the author is not clear, ask. Everything else should usually be handled by the workflow.

## Publishing Sequence

1. Check the live `https://www.growthsync.com/blog` page or bundle when the repo shape is unclear. The live blog should look like the `signals.psheet` Y2K/Aqua shell.
2. Read the latest posts in `src/data/blogPosts.tsx` and the adapter in `src/blog/data.tsx` to match current structure, slug rules, tab mapping, tone, and tag patterns.
3. If the article contains recent claims, verify them with current sources before publishing.
4. Choose the title, excerpt, category, tags, image slug, and final public slug route.
5. Add the new post object to the top of `src/data/blogPosts.tsx`. Newest goes first so it becomes the fresh row automatically.
6. Add or update the Y2K/Aqua image spec in `scripts/generate-blog-images.ts`.
7. Dry-run the image prompt when helpful: `npm run blog:images -- --dry-run <slug>`.
8. Generate the hero image with `npm run blog:images -- <slug>`.
9. Run `npm run sitemap` so the new post is indexed cleanly.
10. Run `npm run blog:check`. Use `npm run blog:check -- --id <id>` if you need to target a specific post.
11. Run `npm run blog:link-audit`.
12. Run `npm run lint`.
13. Run `npm run build`.

## What "Published" Means

The blog post is not finished if any of these are missing:

- title and excerpt fit the site
- article body is converted into GrowthSync's JSX format
- sources box is present when needed
- related internal link is present
- `/get-started` or `/book-a-call` CTA link is present
- hero image exists and fits the article instead of repeating another composition
- slug route works in the `src/blog` reader shell
- sitemap is updated

## Author Default

Default to:

- `Rod` for social commerce commentary, creator economy, platform shifts, brand strategy, and culture-adjacent market reads
- `Michael` for company posts, founder notes, product, infrastructure, AI systems, and strategy from the operator side
- `Tanner` for engineering notes, operations-heavy product stories, and founding engineer updates

If the user names the author, obey that.
