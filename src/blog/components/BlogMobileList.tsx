/**
 * <BlogMobileList> — stacked card-row view of posts for narrow screens.
 * Keeps the file/window metaphor but skips the unreadable mini-columns.
 * Each row is a real `<a href="/blog/:slug">` that navigates to the full
 * article reader; the SPA router intercepts the click.
 */

import { RouterLink } from "../router";
import type { BlogPost } from "../types";
import { freshnessFor } from "../utils";
import { FreshnessDot } from "./BlogFileIcon";

export function BlogMobileList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <div
        className="gs-psheet-mobile"
        style={{
          padding: "32px 16px",
          textAlign: "center",
          font: "500 13px/1.4 var(--gs-font-mono)",
          color: "var(--gs-ink-3)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        no rows match the filter
      </div>
    );
  }
  return (
    <div className="gs-psheet-mobile gs-psheet-scroll">
      {posts.map((p, i) => (
        <RouterLink
          key={p.slug}
          to={`/blog/${p.slug}`}
          className={`gs-psheet-row-m${i === 0 ? " is-featured" : ""}`}
          ariaLabel={`Open: ${p.title}`}
        >
          <div className="meta">
            <FreshnessDot kind={freshnessFor(p)} />
            <span>{p.date}</span>
            <span className="sep">·</span>
            <span>{p.category}</span>
          </div>
          <h3>{p.title}</h3>
          <p>{p.excerpt}</p>
          <div className="foot">
            <span>{p.author.name}</span>
            <span className="sep">·</span>
            <span>{p.signalType}</span>
            <span className="sep">·</span>
            <span>{p.readTime}</span>
          </div>
        </RouterLink>
      ))}
    </div>
  );
}
