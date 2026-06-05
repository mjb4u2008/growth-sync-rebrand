# Current Blog Architecture

The live blog is the Y2K/Aqua `signals.psheet` app. Treat this as the source of truth when publishing.

## Live Check

- Open or fetch `https://www.growthsync.com/blog`.
- Confirm the loaded bundle contains `signals.psheet`, `/blog/:slug` routing, and the current newest post.
- Use the live page as the visual authority if old files disagree with current code.

## Runtime Shape

- `src/App.tsx` routes `/blog` and `/blog/:slug` into `src/blog/BlogApp.tsx`.
- `src/blog/BlogApp.tsx` renders the spreadsheet index and in-window article reader.
- `src/styles/blog.css` owns the blog-specific Y2K/Aqua shell: cream paper, pinstripe background, desktop chrome, tangerine controls, Aqua glass accents, and internal scrolling.
- `src/blog/data.tsx` adapts legacy article data into the live blog model. It adds slug routes, tab metadata, signal type, image alt text, source/evidence sections, heading IDs, and numeric-link rewrites.
- `src/data/blogPosts.tsx` remains the content source. Add new posts here, then verify the adapter output through the live `src/blog` app.
- `src/pages/Blog.tsx` and `src/pages/BlogPost.tsx` are older surfaces. Do not edit them for normal blog publishing unless the codebase has clearly reactivated them.

## Publishing Implications

- Newest post goes at the top of `src/data/blogPosts.tsx`.
- Use the next numeric `id`, but final public URLs are slug URLs derived by `src/blog/data.tsx`, usually from the image slug.
- The public route should be `/blog/<image-slug-or-title-slug>`.
- Current tabs are `Market Studies` and `Tech Corner`; the adapter assigns them from author, category, and tags.
- `Tanner`, `Company`, `Product`, `Technology`, `AI`, `Automation`, and engineering tags usually map to `Tech Corner`; market, creator, brand, and social-commerce commentary usually maps to `Market Studies`.
- Use `/get-started` for article CTAs, or `/book-a-call` when the sentence explicitly asks readers to book time.
