---
name: blog-publisher
description: Use when the user wants to add, publish, format, or update a GrowthSync blog post in the live Y2K/Aqua signals.psheet blog. Triggers on phrases like "here's today's blog", "publish this post", "use the blog skill", "add this blog to the site", "write or post this article", or "generate the blog image". Handles author assignment for Michael, Rod, or Tanner, GrowthSync blog formatting, title and excerpt cleanup, source links, related slug links, /get-started or /book-a-call CTA links, Y2K Aqua Gemini hero image generation, sitemap updates, and final validation before commit.
metadata:
  version: 2.0.0
---

# GrowthSync Blog Publisher

This skill is the chain of command for publishing GrowthSync blog posts in the current live Y2K/Aqua blog.

## Live Reality Check

The live blog at `https://www.growthsync.com/blog` is the style arbiter. If local files conflict, inspect the live page and loaded bundle before editing. The current live design is the `signals.psheet` desktop/spreadsheet shell under `src/blog/*`, not the older standalone `src/pages/Blog.tsx` or `src/pages/BlogPost.tsx` pages.

## Read Order

1. Read [references/process.md](references/process.md) first.
2. Read [references/current-blog-architecture.md](references/current-blog-architecture.md) if you have not already inspected the current refactor in this turn.
3. Read [references/writing-style.md](references/writing-style.md).
4. Read [references/linking-playbook.md](references/linking-playbook.md).
5. Read [references/post-template.md](references/post-template.md) while editing `src/data/blogPosts.tsx`.
6. Read [references/image-workflow.md](references/image-workflow.md) before generating or revising hero art.
7. Read [references/retro-link-refresh-prompt.md](references/retro-link-refresh-prompt.md) when the task is to go back through older posts and apply the current link rules.

## Trigger Phrases

Use this workflow when the user says things like:

- "Here's today's blog"
- "Add this blog to the site"
- "Use the blog writing tool"
- "Publish this post"
- "Post this under Rod"
- "Generate the blog image"
- "Go through our old blogs"
- "Retro link the blog"
- "Ralph Wiggum this"

## Non-Negotiables

- Treat the full workflow as the default. Publish means format the article, add the image, add the links, update the sitemap, and verify the result.
- Ask only for missing information that is truly blocking. Usually that means the article body, the author choice if unclear, or a must-have fact the user wants preserved.
- Obey GrowthSync writing rules. No em dashes. No generic SEO filler. Keep the post sharp, opinionated, and readable.
- Use `ContentLink` links inside `src/data/blogPosts.tsx`.
- Every new sales-oriented post should end with a clear GrowthSync tie-back and a `/get-started` link. Use `/book-a-call` when the copy specifically says to book a call.
- New internal blog links should use slug URLs like `/blog/social-commerce-shared-language`, not numeric legacy URLs.
- Do not revive clay/morphism image language for blog heroes. Blog images use the current Y2K/Aqua operating-system style.
- When claims are recent, numeric, or newsy, browse and verify sources before publishing.

## Files This Skill Owns

- `src/data/blogPosts.tsx`
- `src/blog/BlogApp.tsx`
- `src/blog/data.tsx`
- `src/blog/types.ts`
- `src/blog/utils.ts`
- `src/blog/components/*`
- `src/styles/blog.css`
- `scripts/generate-blog-images.ts`
- `public/blog/*`
- `public/sitemap.xml`

## Required Commands

- `npm run blog:images -- <slug>`
- `npm run sitemap`
- `npm run blog:check`
- `npm run blog:link-audit`
- `npm run lint`
- `npm run build`

## Finish Line

Do not call the post done until:

- the new entry is at the top of `blogPosts`
- the image exists in `public/blog/`
- the sources and internal links are in place
- the sitemap includes the new post
- validation, lint, and build all pass
