---
name: blog-publisher
description: Use when the user wants to add, publish, format, or update a GrowthSync blog post. Triggers on phrases like "here's today's blog", "publish this post", "use the blog skill", "add this blog to the site", "write or post this article", or "generate the blog image". Handles author assignment for Michael or Rod, GrowthSync blog formatting, title and excerpt cleanup, source links, related links, /demo CTA links, Gemini-based hero image generation, sitemap updates, and final validation before commit.
metadata:
  version: 1.0.0
---

# GrowthSync Blog Publisher

This skill is the chain of command for publishing GrowthSync blog posts.

## Read Order

1. Read [references/process.md](references/process.md) first.
2. Read [references/writing-style.md](references/writing-style.md).
3. Read [references/linking-playbook.md](references/linking-playbook.md).
4. Read [references/post-template.md](references/post-template.md) while editing `src/data/blogPosts.tsx`.
5. Read [references/image-workflow.md](references/image-workflow.md) before generating or revising hero art.
6. Read [references/retro-link-refresh-prompt.md](references/retro-link-refresh-prompt.md) when the task is to go back through older posts and apply the new link rules.

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
- Every new sales-oriented post should end with a clear GrowthSync tie-back and a `/demo` link.
- When claims are recent, numeric, or newsy, browse and verify sources before publishing.

## Files This Skill Owns

- `src/data/blogPosts.tsx`
- `src/pages/BlogPost.tsx`
- `src/pages/Blog.tsx`
- `scripts/generate-blog-images.ts`
- `blog-image-theme.md`
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
