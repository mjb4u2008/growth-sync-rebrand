/**
 * <ArticleMeta> - author / date / category / read time row sitting
 * directly under the article H1. Visually subtle, mono-labeled.
 */

import type { BlogPost } from "../types";

export function ArticleMeta({ post }: { post: BlogPost }) {
  return (
    <div className="gs-blog-meta-row">
      <span className="who">
        <span className="avatar" aria-hidden>{post.author.initials}</span>
        <span>{post.author.name}</span>
      </span>
      <span className="sep">·</span>
      <span>{post.author.role.toUpperCase()}</span>
      <span className="sep">·</span>
      <time dateTime={post.dateISO}>{post.date.toUpperCase()}</time>
      <span className="sep">·</span>
      <span>{post.category.toUpperCase()}</span>
      <span className="sep">·</span>
      <span>{post.readTime.toUpperCase()}</span>
    </div>
  );
}
