/**
 * <BlogTableRow> - one row of the desktop spreadsheet.
 * Renders as a real `<a href="/blog/:slug">` so right-click "open in new
 * tab" works and crawlers can follow it. The SPA router intercepts the
 * click for instant in-app navigation.
 */

import { RouterLink } from "../router";
import type { BlogPost } from "../types";
import { freshnessFor } from "../utils";
import { BlogFileIcon, FreshnessDot, SignalDot } from "./BlogFileIcon";

export function BlogTableRow({ post, featured }: { post: BlogPost; featured?: boolean }) {
  return (
    <RouterLink
      to={`/blog/${post.slug}`}
      className={`gs-psheet-row${featured ? " is-featured" : ""}`}
      ariaLabel={`Open: ${post.title}`}
    >
      <div className="gs-psheet-grid">
        <div className="gs-psheet-cell">
          <FreshnessDot kind={freshnessFor(post)} />
        </div>
        <div className="gs-psheet-cell gs-psheet-cell--mono">{post.date}</div>
        <div className="gs-psheet-cell gs-psheet-cell--title">
          <BlogFileIcon category={post.category} />
          <div style={{ minWidth: 0 }}>
            <strong>{post.title}</strong>
            <em>{post.excerpt}</em>
          </div>
        </div>
        <div className="gs-psheet-cell gs-psheet-cell--signal">
          <SignalDot signal={post.signalType} />
          {post.signalType}
        </div>
        <div className="gs-psheet-cell gs-psheet-cell--cat">{post.category}</div>
        <div className="gs-psheet-cell gs-psheet-cell--author">
          <span className="avatar" aria-hidden>{post.author.initials}</span>
          <span>
            <span className="who">{post.author.name}</span>
            <span className="role">{post.author.role}</span>
          </span>
        </div>
        <div className="gs-psheet-cell gs-psheet-cell--read">{post.readTime}</div>
      </div>
    </RouterLink>
  );
}
