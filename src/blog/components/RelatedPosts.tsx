/**
 * <RelatedPosts> — three-card row below the article body.
 * Cards are intentionally lightweight: date eyebrow, title, one-line excerpt.
 */

import { RouterLink } from "../router";
import type { BlogPost } from "../types";
import { BlogFileIcon } from "./BlogFileIcon";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="gs-blog-related" aria-label="Related field notes">
      <div className="gs-blog-related-head">↳ Related field notes</div>
      <div className="gs-blog-related-grid">
        {posts.map((p) => (
          <RouterLink
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="gs-blog-related-card"
          >
            <div className="when">
              <BlogFileIcon category={p.category} />
              {p.date.toUpperCase()} · {p.signalType.toUpperCase()}
            </div>
            <h4>{p.title}</h4>
            <p>{p.excerpt}</p>
          </RouterLink>
        ))}
      </div>
    </section>
  );
}
