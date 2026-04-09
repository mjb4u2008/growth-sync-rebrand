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

1. Read the latest posts in `src/data/blogPosts.tsx` to match current structure, tone, and tag patterns.
2. If the article contains recent claims, verify them with current sources before publishing.
3. Choose the title, excerpt, category, tags, and image slug.
4. Add the new post object to the top of `src/data/blogPosts.tsx`. Newest goes first so it becomes the featured post automatically.
5. Add or update the image spec in `scripts/generate-blog-images.ts`.
6. Generate the hero image with `npm run blog:images -- <slug>`.
7. Run `npm run sitemap` so the new post is indexed cleanly.
8. Run `npm run blog:check`. Use `npm run blog:check -- --id <id>` if you need to target a specific post.
9. Run `npm run lint`.
10. Run `npm run build`.

## What "Published" Means

The blog post is not finished if any of these are missing:

- title and excerpt fit the site
- article body is converted into GrowthSync's JSX format
- sources box is present when needed
- related internal link is present
- `/demo` CTA link is present
- hero image exists and fits the article instead of repeating another composition
- sitemap is updated

## Author Default

Default to:

- `Rod` for social commerce commentary, creator economy, platform shifts, brand strategy, and culture-adjacent market reads
- `Michael` for company posts, founder notes, product, infrastructure, AI systems, and strategy from the operator side

If the user names the author, obey that.
