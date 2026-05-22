/**
 * Blog helpers - slug lookup, related posts, heading extraction, filters.
 */

import type { BlogFilter, BlogPost } from "./types";
import { BLOG_POSTS } from "./data";

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => Date.parse(b.dateISO) - Date.parse(a.dateISO)
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug || String(p.id) === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const target = getPostBySlug(slug);
  if (!target) return [];
  return BLOG_POSTS.filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.category === target.category) score += 3;
      if (p.signalType === target.signalType) score += 1;
      score += p.tags.filter((t) => target.tags.includes(t)).length;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score || Date.parse(b.post.dateISO) - Date.parse(a.post.dateISO))
    .slice(0, limit)
    .map((x) => x.post);
}

export type ArticleHeading = { id: string; text: string };

/**
 * Pull H2 text from a post's content tree. Extracts both:
 *   <h2 id="...">Text</h2> JSX nodes, and
 *   plain markdown-style `## Text` lines.
 */
export function getHeadingsFromPost(post: BlogPost): ArticleHeading[] {
  const headings: ArticleHeading[] = [];
  const walk = (node: unknown) => {
    if (!node) return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (typeof node === "object" && node !== null && "props" in (node as object)) {
      const el = node as { type?: unknown; props?: { children?: unknown; id?: string } };
      if (el.type === "h2" && el.props?.children) {
        const text = flattenText(el.props.children);
        const id = el.props.id ?? slugify(text);
        if (text) headings.push({ id, text });
      }
      if (el.props?.children) walk(el.props.children);
    }
  };
  walk(post.content as unknown);
  return headings;
}

function flattenText(node: unknown): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (typeof node === "object" && node !== null && "props" in (node as object)) {
    const el = node as { props?: { children?: unknown } };
    return flattenText(el.props?.children);
  }
  return "";
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function applyFilter(posts: BlogPost[], filter: BlogFilter): BlogPost[] {
  let out = posts;
  if (filter.tab !== "All") out = out.filter((p) => p.tab === filter.tab);
  if (filter.category !== "All") out = out.filter((p) => p.category === filter.category);
  if (filter.tag !== "All") out = out.filter((p) => p.tags.includes(filter.tag));
  if (filter.author !== "All") out = out.filter((p) => p.author.name === filter.author);
  if (filter.sort === "Newest") {
    out = [...out].sort((a, b) => Date.parse(b.dateISO) - Date.parse(a.dateISO));
  } else if (filter.sort === "Oldest") {
    out = [...out].sort((a, b) => Date.parse(a.dateISO) - Date.parse(b.dateISO));
  } else if (filter.sort === "Quickest read") {
    out = [...out].sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
  }
  return out;
}

export function uniqueValues<T extends string>(values: T[]): T[] {
  return Array.from(new Set(values));
}

/** Days between two ISO dates (now and post). */
export function daysSince(iso: string): number {
  const d = (Date.now() - Date.parse(iso)) / (1000 * 60 * 60 * 24);
  return Math.floor(d);
}

/**
 * Walk a post's React content tree and return up to `count` top-level <p>
 * nodes. Used by the preview popout to show a 2-paragraph snippet without
 * authors needing to maintain a separate excerpt body.
 */
export function getPreviewParagraphs(post: BlogPost, count = 2): unknown[] {
  const out: unknown[] = [];
  const walk = (node: unknown): void => {
    if (out.length >= count) return;
    if (!node) return;
    if (Array.isArray(node)) {
      node.forEach((n) => walk(n));
      return;
    }
    if (typeof node === "object" && node !== null && "props" in (node as object)) {
      const el = node as { type?: unknown; props?: { children?: unknown } };
      if (el.type === "p") {
        out.push(node);
        return;
      }
      if (el.type === Symbol.for("react.fragment") && el.props?.children) {
        walk(el.props.children);
        return;
      }
      if (el.props?.children) walk(el.props.children);
    }
  };
  walk(post.content as unknown);
  return out;
}

export function freshnessFor(post: BlogPost): "fresh" | "warm" | "cold" {
  if (post.freshness) return post.freshness;
  const days = daysSince(post.dateISO);
  if (days < 14) return "fresh";
  if (days < 60) return "warm";
  return "cold";
}
