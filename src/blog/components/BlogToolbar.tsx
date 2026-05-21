/**
 * <BlogToolbar> — filter row above the spreadsheet table.
 * Reads as: `where category eq [All] and tags includes [All] and author includes [All]  Sort by [Newest]`
 */

import type { BlogCategory, BlogFilter, BlogTab } from "../types";

const TABS: BlogTab[] = ["Market Studies", "Tech Corner"];

const SORTS: BlogFilter["sort"][] = ["Newest", "Oldest", "Quickest read"];

export function BlogToolbar({
  filter,
  onChange,
  tags,
  authors,
  categories,
}: {
  filter: BlogFilter;
  onChange: (next: BlogFilter) => void;
  tags: string[];
  authors: string[];
  categories: BlogCategory[];
}) {
  const set = <K extends keyof BlogFilter>(key: K, value: BlogFilter[K]) =>
    onChange({ ...filter, [key]: value });

  return (
    <div className="gs-psheet-toolbar-wrap">
      <div className="gs-blog-tabs" role="tablist" aria-label="Blog sections">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={filter.tab === tab}
            className={filter.tab === tab ? "is-active" : undefined}
            onClick={() => set("tab", tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="gs-psheet-toolbar" role="toolbar" aria-label="Filter posts">
        <span className="grp">
        <span className="key">where</span>
        <span className="key">category</span>
        <span className="op">eq</span>
        <select
          className="gs-psheet-select"
          value={filter.category}
          onChange={(e) => set("category", e.target.value as BlogFilter["category"])}
          aria-label="Category"
        >
          {(["All", ...categories] as ("All" | BlogCategory)[]).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </span>

      <span className="grp">
        <span className="key">and tags</span>
        <span className="op">includes</span>
        <select
          className="gs-psheet-select"
          value={filter.tag}
          onChange={(e) => set("tag", e.target.value)}
          aria-label="Tag"
        >
          <option value="All">All</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </span>

      <span className="grp">
        <span className="key">and author</span>
        <span className="op">includes</span>
        <select
          className="gs-psheet-select"
          value={filter.author}
          onChange={(e) => set("author", e.target.value)}
          aria-label="Author"
        >
          <option value="All">All</option>
          {authors.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </span>

      <span className="grp" style={{ marginLeft: "auto" }}>
        <span className="key">Sort by</span>
        <select
          className="gs-psheet-select"
          value={filter.sort}
          onChange={(e) => set("sort", e.target.value as BlogFilter["sort"])}
          aria-label="Sort"
        >
          {SORTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </span>

      <span className="gs-psheet-search">
        <span aria-hidden>⌕</span>
        <input type="search" placeholder="find in signals…" aria-label="Search" />
      </span>
      </div>
    </div>
  );
}
