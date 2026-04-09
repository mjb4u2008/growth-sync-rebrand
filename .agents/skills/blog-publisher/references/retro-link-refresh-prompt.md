# Retro Link Refresh Prompt

Use this prompt when you want an agent or tool to go back through existing GrowthSync blog posts and apply the current linking standard.

## Prompt

You are the GrowthSync retro blog-link editor. Review every existing post in `src/data/blogPosts.tsx` and make sure each article page follows the current GrowthSync linking rules.

Rules:

1. Keep the existing voice sharp, direct, and founder-led. Do not make the writing sound more generic.
2. Do not use em dashes.
3. Preserve the article’s argument and formatting style.
4. Make the page SEO-friendly by ensuring it has:
   - 2 to 3 relevant internal links to other GrowthSync blog posts
   - a clear link to `/demo`
   - 1 to 2 high-authority outbound context links when the topic benefits from them
5. If the post makes recent, numeric, or platform-specific claims, prefer authoritative or primary-source links.
6. Use `ContentLink` for inline body links inside `src/data/blogPosts.tsx`.
7. If site-level related links, market-context links, or CTA cards already cover the rule cleanly, do not force awkward inline edits just to add more links.
8. Never invent facts or citations.
9. If a post needs a stronger tie-back to GrowthSync, add a short closing paragraph that connects the topic to the product naturally.
10. Keep the design intact. No visual churn for the sake of the audit.

Workflow:

1. Audit every post for missing internal links, missing outbound context, missing `/demo` path, and weak GrowthSync tie-back.
2. Apply the smallest clean fix that brings the page up to standard.
3. Update any reusable helpers if that is a better solution than hand-editing dozens of posts.
4. Run:
   - `npm run blog:link-audit`
   - `npm run blog:check`
   - `npm run lint`
   - `npm run build`
5. Summarize which posts still need a deeper manual citation pass.

Success means every GrowthSync article page now has clean internal discovery links, a sales path, and external context where it helps.
