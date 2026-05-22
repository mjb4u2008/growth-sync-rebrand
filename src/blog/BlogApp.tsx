/**
 * BlogApp - the single shell that hosts both blog states.
 *
 *   /blog          → spreadsheet/table view inside the shell
 *   /blog/:slug    → article reader inside the same shell
 *
 * Browser back/forward works because the route comes from `useRoute()`.
 * Each post is still reachable directly via `/blog/:slug` with a
 * crawlable `<a href>` row.
 *
 * SEO TODO (out of scope for Phase 1.1, leave a marker):
 *   - emit `<link rel="canonical">` per slug
 *   - emit `<meta property="og:*">` / Twitter card per slug
 *   - emit BlogPosting + BreadcrumbList JSON-LD per slug
 *   - prerender or SSR for crawlable bodies (this SPA shell hides the
 *     article body from naive crawlers; routes are still indexable
 *     because the URL + anchor structure is real, but Article SEO will
 *     require Step 4 of the build guide).
 */

import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";

import { useRoute, RouterLink, navigateTo, type Route } from "./router";
import type { BlogFilter, BlogPost, BlogTab } from "./types";
import { applyFilter, getAllPosts, getHeadingsFromPost, getPostBySlug, getRelatedPosts, uniqueValues } from "./utils";

import { BlogDesktopShell } from "./components/BlogDesktopShell";
import { BlogToolbar } from "./components/BlogToolbar";
import { BlogTable } from "./components/BlogTable";
import { BlogMobileList } from "./components/BlogMobileList";

import { ArticleHero } from "./components/ArticleHero";
import { ArticleMeta } from "./components/ArticleMeta";
import { ArticleToc } from "./components/ArticleToc";
import { RelatedPosts } from "./components/RelatedPosts";
import { SourceBox } from "./components/SourceBox";

export function BlogApp() {
  const route = useRoute();
  const all = useMemo(() => getAllPosts(), []);
  const post = route.kind === "blog-post" ? getPostBySlug(route.slug) : undefined;

  return (
    <main className={`gs-blog-page${route.kind === "blog-post" ? " gs-blog-page--reader" : ""}`} id="blog">
      <BlogSeo route={route} post={post} />
      <div className="gs-blog-wrap">
        <BlogEyebrow route={route} totalRows={all.length} latestDate={all[0]?.date ?? ""} />
        {route.kind === "blog-post" ? (
          <ReaderShell slug={route.slug} all={all} />
        ) : (
          <TableShell key={route.kind === "blog-index" ? route.search : "blog"} all={all} />
        )}
      </div>
      {route.kind === "blog-post" && <ArticleCtaStrip />}
    </main>
  );
}

const SITE_URL = "https://growthsync.com";

function tabParam(tab: BlogTab) {
  return tab === "Tech Corner" ? "tech-corner" : "market-studies";
}

function tabFromSearch(search: string): BlogTab {
  const params = new URLSearchParams(search.replace(/^\?/, ""));
  return params.get("tab") === "tech-corner" ? "Tech Corner" : "Market Studies";
}

function BlogSeo({ route, post }: { route: Route; post?: BlogPost }) {
  if (route.kind === "blog-post" && post) {
    const canonical = `${SITE_URL}/blog/${post.slug}`;
    const image = post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`;
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      image: [image],
      datePublished: post.dateISO,
      dateModified: post.dateISO,
      author: [{ "@type": "Person", name: post.author.name, jobTitle: post.author.role }],
      description: post.excerpt,
      url: canonical,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      publisher: {
        "@type": "Organization",
        name: "GrowthSync",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/growthsync-logo.png` },
      },
    };
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: canonical },
      ],
    };

    return (
      <Helmet>
        <title>{post.title} | GrowthSync Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content="GrowthSync" />
        <meta property="article:published_time" content={post.dateISO} />
        <meta property="article:author" content={post.author.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={image} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
      </Helmet>
    );
  }

  const tab = route.kind === "blog-index" ? tabFromSearch(route.search) : "Market Studies";
  const canonical = `${SITE_URL}/blog?tab=${tabParam(tab)}`;
  const description =
    tab === "Tech Corner"
      ? "GrowthSync product and engineering notes on building the relationship layer for Instagram commerce."
      : "GrowthSync market studies on social commerce, Instagram intent, creator commerce, and revenue action.";

  return (
    <Helmet>
      <title>{tab} | GrowthSync Blog</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={`${tab} | GrowthSync Blog`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE_URL}/growthsync-logo.png`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}

/* -------------------------------------------------------------------------
 * Eyebrow above the shell - shows breadcrumb-ish file path and status pill.
 * ------------------------------------------------------------------------- */

function BlogEyebrow({ route, totalRows, latestDate }: { route: Route; totalRows: number; latestDate: string }) {
  if (route.kind === "blog-post") {
    return (
      <div className="gs-blog-eyebrow-row" style={{ marginBottom: 10 }}>
        <span>
          FILE › /blog/<strong style={{ color: "var(--gs-ink)" }}>signals.psheet</strong>
          <span style={{ color: "var(--gs-ink-4)", margin: "0 6px" }}>/</span>
          <strong style={{ color: "var(--gs-ink)" }}>{route.slug}.field-note</strong>
        </span>
        <span className="gs-blog-eyebrow-status">
          <span className="ok">●</span> OPEN
        </span>
      </div>
    );
  }
  return (
    <div className="gs-blog-eyebrow-row">
      <span>
        FILE › /blog/<strong style={{ color: "var(--gs-ink)" }}>signals.psheet</strong>
      </span>
      <span className="gs-blog-eyebrow-status">
        <span className="ok">●</span> SYNCING
        <span>·</span>
        <span>{totalRows} ROWS</span>
        {latestDate && (
          <>
            <span>·</span>
            <span>UPDATED {latestDate.toUpperCase()}</span>
          </>
        )}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * TABLE STATE - the signals.psheet inside the shell.
 * ------------------------------------------------------------------------- */

function TableShell({ all }: { all: BlogPost[] }) {
  const [filter, setFilter] = useState<BlogFilter>({
    tab: tabFromSearch(window.location.search),
    category: "All",
    tag: "All",
    author: "All",
    sort: "Newest",
  });

  const tabPosts = useMemo(() => all.filter((p) => p.tab === filter.tab), [all, filter.tab]);
  const tags = useMemo(() => uniqueValues(tabPosts.flatMap((p) => p.tags)).sort(), [tabPosts]);
  const authors = useMemo(() => uniqueValues(tabPosts.map((p) => p.author.name)).sort(), [tabPosts]);
  const categories = useMemo(() => uniqueValues(tabPosts.map((p) => p.category)).sort(), [tabPosts]);
  const filtered = useMemo(() => applyFilter(all, filter), [all, filter]);

  const updateFilter = (next: BlogFilter) => {
    const changedTab = next.tab !== filter.tab;
    const normalized = changedTab ? { ...next, category: "All", tag: "All", author: "All" } : next;
    setFilter(normalized);
    if (changedTab) {
      const nextUrl = `/blog?tab=${tabParam(normalized.tab as BlogTab)}`;
      window.history.pushState({}, "", nextUrl);
      window.dispatchEvent(new Event("gs-route-change"));
    }
  };

  return (
    <BlogDesktopShell
      closeHref="/#home"
      closeAriaLabel="Close signals.psheet and return home"
      titlebarCenter={
        <>
          <span className="sep" aria-hidden>▤</span>
          <span className="file">signals.psheet</span>
        </>
      }
      titlebarRight={<>SOCIAL COMMERCE FIELD NOTES</>}
    >
      <BlogToolbar filter={filter} onChange={updateFilter} tags={tags} authors={authors} categories={categories} />
      <BlogTable posts={filtered} />
      <BlogMobileList posts={filtered} />
      <div className="gs-psheet-footer">
        <span>
          showing <span className="count">{filtered.length}</span> of {all.length}
        </span>
        <span>↳ sort: {filter.sort.toLowerCase()}</span>
      </div>
    </BlogDesktopShell>
  );
}

/* -------------------------------------------------------------------------
 * READER STATE - article opens inside the same .gs-psheet shell.
 * ------------------------------------------------------------------------- */

function ReaderShell({ slug, all }: { slug: string; all: BlogPost[] }) {
  const post = useMemo(() => getPostBySlug(slug), [slug]);
  const related = useMemo(() => (post ? getRelatedPosts(post.slug) : []), [post]);
  const headings = useMemo(() => (post ? getHeadingsFromPost(post) : []), [post]);

  useEffect(() => {
    if (!post) {
      document.title = "Not found | GrowthSync";
      return;
    }
    document.title = `${post.title} | GrowthSync`;
    return () => {
      document.title = "GrowthSync | The relationship layer for social commerce";
    };
  }, [post]);

  if (!post) {
    return <ReaderNotFound slug={slug} />;
  }

  return (
    <BlogDesktopShell
      modifier="is-reader"
      closeHref="/#home"
      closeAriaLabel="Close article and return home"
      titlebarCenter={
        <>
          <span className="sep" aria-hidden>▤</span>
          <RouterLink to="/blog" style={{ color: "var(--gs-tangerine-deep)", textDecoration: "none" }}>
            signals.psheet
          </RouterLink>
          <span className="sep" aria-hidden>›</span>
          <span className="file">{post.slug}.field-note</span>
        </>
      }
      titlebarRight={<>{post.signalType.toUpperCase()} · {post.readTime.toUpperCase()}</>}
    >
      <div className="gs-psheet-readerbar">
        <RouterLink to="/blog" className="gs-psheet-backbtn" ariaLabel="Open signals.psheet table">
          <span aria-hidden>←</span>
          <span>Open table</span>
        </RouterLink>
        <span className="crumb">
          <RouterLink to="/blog">signals.psheet</RouterLink>
          <span className="sep">›</span>
          <span>field-notes</span>
          <span className="sep">›</span>
          <span className="here">{post.title}</span>
        </span>
        <span className="meta">
          <span>{post.category.toUpperCase()}</span>
          <span className="sep">·</span>
          <time dateTime={post.dateISO}>{post.date.toUpperCase()}</time>
        </span>
      </div>

      <div className="gs-psheet-scroll" key={post.slug /* reset scroll on slug change */}>
        <article className="gs-psheet-reader" aria-label={post.title}>
          <ReaderLeftRail posts={all} currentSlug={post.slug} />
          <div className="gs-psheet-reader-article">
            <ArticleHero alt={post.imageAlt}>
              {post.image ? (
                <img src={post.image} alt={post.imageAlt} />
              ) : (
                post.hero
              )}
            </ArticleHero>
            <div className="gs-blog-article-body">
              <div className="gs-blog-eyebrow-meta">
                ARTICLE
                <span className="sep">·</span>
                {post.category.toUpperCase()}
                <span className="sep">·</span>
                UPDATED {post.date.toUpperCase()}
              </div>
              <h1 className="gs-blog-title">{post.title}</h1>
              <ArticleMeta post={post} />
              <ArticleToc headings={headings} variant="mobile" />
              <div className="gs-blog-prose">{post.content}</div>
              <SourceBox sources={post.sources} />
              <RelatedPosts posts={related} />
            </div>
          </div>
          <div className="gs-psheet-reader-toc">
            <ArticleToc headings={headings} variant="rail" />
          </div>
        </article>
      </div>

      <div className="gs-psheet-footer">
        <span>
          <span className="count" style={{ color: "var(--gs-ink)" }}>
          {post.author.name}
          </span>
          <span style={{ margin: "0 6px", color: "var(--gs-ink-4)" }}>·</span>
          {post.signalType.toUpperCase()} signal · {post.readTime.toUpperCase()}
        </span>
        <RouterLink
          to="/blog"
          style={{
            color: "var(--gs-tangerine-deep)",
            textDecoration: "none",
            font: "700 10px/1 var(--gs-font-mono)",
            letterSpacing: "0.10em",
          }}
        >
          ↳ BACK TO SIGNALS.PSHEET
        </RouterLink>
      </div>
    </BlogDesktopShell>
  );
}

/* -------------------------------------------------------------------------
 * Reader left rail - in-window list of latest posts.
 * (Replaces the older standalone ArticleLeftRail card so it can dock as a
 * pane within the shell.)
 * ------------------------------------------------------------------------- */

function ReaderLeftRail({ posts, currentSlug }: { posts: BlogPost[]; currentSlug: string }) {
  const items = posts.slice(0, 10);
  return (
    <nav className="gs-psheet-reader-leftrail" aria-label="Latest field notes">
      <div className="gs-psheet-reader-leftrail-head">▤ Latest field notes</div>
      <ul>
        {items.map((p) => {
          const active = p.slug === currentSlug;
          return (
            <li key={p.slug}>
              <RouterLink to={`/blog/${p.slug}`} className={active ? "active" : undefined}>
                <span className="when">
                  {p.date.toUpperCase()} · {p.signalType.toUpperCase()}
                </span>
                <span className="what">{p.title}</span>
              </RouterLink>
            </li>
          );
        })}
      </ul>
      <RouterLink to="/blog" className="gs-psheet-reader-leftrail-foot">
        ↳ Open signals.psheet
      </RouterLink>
    </nav>
  );
}

/* -------------------------------------------------------------------------
 * Not-found / unknown-slug state inside the same shell.
 * ------------------------------------------------------------------------- */

function ReaderNotFound({ slug }: { slug: string }) {
  return (
    <BlogDesktopShell
      modifier="is-reader"
      closeHref="/#home"
      closeAriaLabel="Close article and return home"
      titlebarCenter={
        <>
          <span className="sep" aria-hidden>▤</span>
          <RouterLink to="/blog" style={{ color: "var(--gs-tangerine-deep)", textDecoration: "none" }}>
            signals.psheet
          </RouterLink>
          <span className="sep" aria-hidden>›</span>
          <span className="file">404.field-note</span>
        </>
      }
      titlebarRight={<>SIGNAL NOT FOUND</>}
    >
      <div className="gs-psheet-readerbar">
        <RouterLink to="/blog" className="gs-psheet-backbtn">
          <span aria-hidden>←</span>
          <span>Open table</span>
        </RouterLink>
        <span className="crumb">
          <span className="here">No field note at this slug.</span>
        </span>
        <span />
      </div>
      <div className="gs-psheet-scroll" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: 48 }}>
          <div className="gs-blog-eyebrow-meta" style={{ justifyContent: "center" }}>
            SIGNAL NOT FOUND
          </div>
          <h1 className="gs-blog-title" style={{ marginBottom: 12 }}>
            <code style={{ font: "var(--gs-mono-md)", color: "var(--gs-ink-2)" }}>
              /blog/{slug}
            </code>{" "}
            didn&apos;t resolve.
          </h1>
          <p style={{ font: "400 16px/1.55 var(--gs-font-sans)", color: "var(--gs-ink-2)", marginBottom: 18 }}>
            Try the signal index.
          </p>
          <RouterLink to="/blog" className="gs-blog-cta-link is-primary">
            Open signals.psheet →
          </RouterLink>
        </div>
      </div>
      <div className="gs-psheet-footer">
        <span>404 · slug not in registry</span>
        <RouterLink
          to="/blog"
          style={{
            color: "var(--gs-tangerine-deep)",
            textDecoration: "none",
            font: "700 10px/1 var(--gs-font-mono)",
            letterSpacing: "0.10em",
          }}
        >
          ↳ BACK TO SIGNALS.PSHEET
        </RouterLink>
      </div>
    </BlogDesktopShell>
  );
}

/* -------------------------------------------------------------------------
 * Article CTA strip - pinned to the bottom of the article state only.
 * ------------------------------------------------------------------------- */

function ArticleCtaStrip() {
  return (
    <div className="gs-blog-cta-strip" role="complementary">
      <span>
        <strong>Questions about this?</strong> Book a call, or read another field note.
      </span>
      <span className="actions">
        <RouterLink to="/blog" className="gs-blog-cta-link">
          ↳ Read another
        </RouterLink>
        <a
          href="/book-a-call"
          className="gs-blog-cta-link is-primary"
          onClick={(e) => {
            e.preventDefault();
            navigateTo("/book-a-call");
          }}
        >
          Book a call →
        </a>
      </span>
    </div>
  );
}
