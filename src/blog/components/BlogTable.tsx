/**
 * <BlogTable> — desktop column header + rows. The first row is featured
 * (latest post) so it gets the persistent orange rail without a giant
 * SaaS hero card. Rows are real `<a href>` links that navigate to the
 * full /blog/:slug article.
 */

import type { BlogPost } from "../types";
import { BlogTableRow } from "./BlogTableRow";

const HEADERS = ["", "Date", "Title", "Signal", "Category", "Author", "Read"];

export function BlogTable({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="gs-psheet-scroll">
        <div
          style={{
            padding: "48px 24px",
            textAlign: "center",
            font: "500 13px/1.4 var(--gs-font-mono)",
            color: "var(--gs-ink-3)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          no rows match the filter
        </div>
      </div>
    );
  }
  return (
    <div className="gs-psheet-scroll">
      <div className="gs-psheet-head">
        <div className="gs-psheet-grid">
          {HEADERS.map((h, i) => (
            <div
              key={i}
              className="gs-psheet-cell"
              style={i === HEADERS.length - 1 ? { textAlign: "right" } : undefined}
            >
              {h}
            </div>
          ))}
        </div>
      </div>
      <div className="gs-psheet-body" role="list">
        {posts.map((p, i) => (
          <BlogTableRow key={p.slug} post={p} featured={i === 0} />
        ))}
      </div>
    </div>
  );
}
