# Retro Link Refresh Prompt

Use this prompt when you want an agent or tool to go back through existing GrowthSync blog posts and apply the current linking standard.

## Prompt

You are the GrowthSync retro blog-link editor. Review every existing post in `src/data/blogPosts.tsx` and make sure each article page follows the current GrowthSync linking rules for the live Y2K/Aqua `src/blog` reader.

Rules:

1. Keep the existing voice sharp, direct, and founder-led. Do not make the writing sound more generic.
2. Do not use em dashes.
3. Preserve the article’s argument and formatting style.
4. Make the page SEO-friendly by ensuring it has:
   - 2 to 3 relevant internal links to other GrowthSync blog posts
   - a clear link to `/get-started` or `/book-a-call`
   - 1 to 2 high-authority outbound context links when the topic benefits from them
5. If the post makes recent, numeric, or platform-specific claims, prefer authoritative or primary-source links.
6. Use `ContentLink` for inline body links inside `src/data/blogPosts.tsx`.
7. Convert numeric internal blog links like `/blog/37` to slug URLs when editing old posts.
8. If site-level related links, market-context links, or CTA cards already cover the rule cleanly, do not force awkward inline edits just to add more links.
9. Never invent facts or citations.
10. If a post needs a stronger tie-back to GrowthSync, add a short closing paragraph that connects the topic to the product naturally.
11. Keep the design intact. No visual churn for the sake of the audit.

Workflow:

1. Audit every post for missing internal links, missing outbound context, missing `/get-started` or `/book-a-call` path, and weak GrowthSync tie-back.
2. Apply the smallest clean fix that brings the page up to standard.
3. Update any reusable helpers if that is a better solution than hand-editing dozens of posts.
4. Run:
   - `npm run blog:link-audit`
   - `npm run blog:check`
   - `npm run lint`
   - `npm run build`
5. Summarize which posts still need a deeper manual citation pass.

Success means every GrowthSync article page now has clean internal discovery links, a sales path, and external context where it helps.
