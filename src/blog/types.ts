/**
 * GrowthSync journal metadata and rich article content.
 * Posts are imported from `src/blog/data.tsx`.
 */

import type { ReactNode } from "react";

export type BlogTab = "Market Studies" | "Tech Corner";

export type BlogCategory = string;

export type SignalType = string;

export type BlogAuthor = {
  name: string;
  role: string;
  initials: string;
  avatar?: string;
  bio?: string;
};

export type BlogSource = {
  label: string;
  href: string;
};

export type BlogCover = {
  src: string;
  alt: string;
  caption?: string;
  portrait?: boolean;
};

export type BlogPost = {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tab: BlogTab;
  signalType: SignalType;
  author: BlogAuthor;
  /** Human-readable date, e.g. "Mar 14, 2026" */
  date: string;
  /** ISO 8601 date string */
  dateISO: string;
  /** Actual revision date, separate from the journal's editorial timeline. */
  updatedDateISO?: string;
  updatedDate?: string;
  /** e.g. "6 min" */
  readTime: string;
  tags: string[];
  image: string;
  imageAlt: string;
  /** Original editorial artwork or an existing, attributed team portrait. */
  cover?: BlogCover;
  /** Optional SVG/component fallback when a post does not have an image. */
  hero?: ReactNode;
  /** Article body (React) */
  content: ReactNode;
  /** Provenance for an adapted or revised essay, displayed to readers. */
  editorialNote?: string;
  /** Optional sources rendered in the source box */
  sources?: BlogSource[];
  /** Post freshness signal dot color. Defaults from `dateISO`. */
  freshness?: "fresh" | "warm" | "cold";
};

export type BlogFilter = {
  tab: "All" | BlogTab;
  category: "All" | BlogCategory;
  tag: "All" | string;
  author: "All" | string;
  sort: "Newest" | "Oldest" | "Quickest read";
};
