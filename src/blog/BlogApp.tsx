import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react';
import { BlogSeo } from './BlogSeo';
import { RouterLink, navigateTo, useRoute } from './router';
import type { BlogPost } from './types';
import type { JournalFilter } from './journal/types';
import { getAllPosts, getHeadingsFromPost, getPostBySlug, getRelatedPosts } from './utils';
import { CoreInquiry } from '@/components/core/CoreInquiry';
import '@/styles/journal.css';
import '@/styles/journal-diagrams.css';

type JournalTab = JournalFilter;

function tabFromSearch(search: string): JournalTab {
  const value = new URLSearchParams(search).get('tab');
  if (value === 'tech-corner' || value === 'perspectives') return 'Perspectives';
  if (value === 'market-studies' || value === 'case-studies') return 'Case studies';
  return value === 'inside-growthsync' ? 'Inside GrowthSync' : 'All';
}

export function BlogApp() {
  const route = useRoute();
  const all = useMemo(() => getAllPosts(), []);
  const post = route.kind === 'blog-post' ? getPostBySlug(route.slug) : undefined;
  const tab = route.kind === 'blog-index' ? tabFromSearch(route.search) : 'All';
  const missing = route.kind === 'blog-post' && !post;

  useEffect(() => {
    if (route.kind === 'blog-post' && post && route.slug !== post.slug) {
      navigateTo(`/blog/${post.slug}${window.location.search}${window.location.hash}`, { replace: true });
    }
  }, [post, route]);

  useEffect(() => {
    document.title = post ? `${post.title} | GrowthSync Journal` : missing ? 'Note not found | GrowthSync' : 'Journal | GrowthSync';
    // Direct article hash links need their target after the lazy route has rendered.
    if (post && window.location.hash) {
      try {
        const id = decodeURIComponent(window.location.hash.slice(1));
        document.getElementById(id)?.scrollIntoView();
      } catch { /* Ignore malformed external hash fragments. */ }
    }
  }, [post, missing, tab]);

  return <main className="journal">
    <BlogSeo post={post} tab={tab} missing={missing} />
    {post ? <JournalArticle key={post.slug} post={post} /> : missing ? <JournalNotFound /> : <JournalIndex posts={all} tab={tab} />}
  </main>;
}

function JournalIndex({ posts, tab }: { posts: BlogPost[]; tab: JournalTab }) {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return posts.filter(post => (tab === 'All' || post.category === tab) && (!needle || [post.title, post.excerpt, post.author.name, post.category, ...post.tags].join(' ').toLocaleLowerCase().includes(needle)));
  }, [posts, tab, query]);
  const featured = tab === 'All' && !query.trim()
    ? filtered.find(post => post.slug === 'a-new-foundation-for-business')
    : undefined;
  const listed = featured ? filtered.filter(post => post.slug !== featured.slug) : filtered;

  function selectTab(next: JournalTab) {
    navigateTo(next === 'All' ? '/blog' : `/blog?tab=${next.toLowerCase().replace(/ /g, '-')}`);
  }

  return <div className="journal-index">
    <div className="journal-intro">
      <h1>Journal</h1>
      <p>Notes on the world we’re building toward.</p>
    </div>
    {featured && <RouterLink to={`/blog/${featured.slug}`} className="journal-feature">
      <div className="journal-feature-image"><img src={featured.image} alt={featured.imageAlt} width="1672" height="941" fetchPriority="high" /></div>
      <div className="journal-feature-copy">
        <p className="journal-feature-label">Our thesis</p>
        <h2>{featured.title}</h2>
        <p className="journal-feature-excerpt">{featured.excerpt}</p>
        <span className="journal-feature-link">Read the essay <ArrowRight size={17} aria-hidden="true" /></span>
      </div>
    </RouterLink>}
    <div className="journal-tools">
      <div className="journal-filters" role="group" aria-label="Filter journal">
        {(['All', 'Perspectives', 'Case studies', 'Inside GrowthSync'] as const).map(value => <button key={value} type="button" aria-pressed={tab === value} onClick={() => selectTab(value)}>{value === 'All' ? 'All' : value === 'Perspectives' ? 'Perspectives' : value === 'Case studies' ? 'Studies' : 'Team'}</button>)}
      </div>
      <div className="journal-search">
        <Search size={16} aria-hidden="true" />
        <input ref={searchRef} type="search" aria-label="Search journal" placeholder="Find an essay" value={query} onChange={event => setQuery(event.target.value)} />
        {query && <button type="button" aria-label="Clear search" onClick={() => { setQuery(''); searchRef.current?.focus(); }}><X size={15} aria-hidden="true" /></button>}
      </div>
    </div>
    <p className="core-sr-only" role="status">{filtered.length} {filtered.length === 1 ? 'essay' : 'essays'} found</p>
    {filtered.length ? <ol className="journal-list">{listed.map(post => <JournalRow key={post.slug} post={post} />)}</ol> : <div className="journal-empty">
      <h2>No essays found.</h2>
      <p>Try another word or browse all essays.</p>
      <button type="button" onClick={() => { setQuery(''); selectTab('All'); }}>Show all essays <ArrowRight size={16} aria-hidden="true" /></button>
    </div>}
    <JournalInvitation />
  </div>;
}

function JournalRow({ post }: { post: BlogPost }) {
  return <li>
    <RouterLink to={`/blog/${post.slug}`} className="journal-row">
      <time dateTime={post.dateISO}>{post.date}</time>
      <div className="journal-row-copy">
        <h2>{post.title}</h2>
        <p className="journal-row-excerpt">{post.excerpt}</p>
        <p>{post.author.name}{' '}<span aria-hidden="true">·</span>{' '}<span>{post.readTime}</span></p>
      </div>
      <ArrowRight className="journal-row-arrow" size={19} aria-hidden="true" />
    </RouterLink>
  </li>;
}

function JournalArticle({ post }: { post: BlogPost }) {
  const headings = useMemo(() => getHeadingsFromPost(post), [post]);
  const related = useMemo(() => getRelatedPosts(post.slug, 3), [post]);
  return <article className="journal-article">
    <RouterLink to="/blog" className="journal-back"><ArrowLeft size={16} aria-hidden="true" />All essays</RouterLink>
    <header className={`journal-article-head${post.cover?.portrait ? ' journal-article-head-portrait' : ''}`}>
      <div>
        <h1>{post.title}</h1>
        <p className="journal-dek">{post.excerpt}</p>
        <p className="journal-byline">{post.author.name}{' '}<span aria-hidden="true">·</span>{' '}<time dateTime={post.dateISO}>{post.date}</time>{' '}<span aria-hidden="true">·</span>{' '}{post.readTime}</p>
        {post.updatedDateISO && <p className="journal-updated">Revised <time dateTime={post.updatedDateISO}>{post.updatedDate}</time></p>}
      </div>
      {post.cover?.portrait && <figure className="journal-portrait">
        <div className="journal-portrait-frame"><img src={post.cover.src} alt={post.cover.alt} width="1600" height="900" /></div>
        <figcaption>{post.cover.caption}</figcaption>
      </figure>}
    </header>
    {post.cover && !post.cover.portrait && <figure className="journal-article-art">
      <img src={post.cover.src} alt={post.cover.alt} width="1672" height="941" fetchPriority="high" />
      {post.cover.caption && <figcaption>{post.cover.caption}</figcaption>}
    </figure>}
    {post.editorialNote && <p className="journal-editorial-note">{post.editorialNote}</p>}
    {headings.length > 2 && <details className="journal-contents">
      <summary>In this article</summary>
      <nav aria-label="Article sections"><ol>{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.text}</a></li>)}</ol></nav>
    </details>}
    <div className="journal-prose">{post.content}</div>
    {!!post.sources?.length && <section className="journal-sources"><h2>Sources</h2><ul>{post.sources.map(source => <li key={source.href}>{source.href && source.href !== '#' ? <a href={source.href} target="_blank" rel="noreferrer">{source.label}</a> : source.label}</li>)}</ul></section>}
    <JournalInvitation />
    <section className="journal-related" aria-labelledby="journal-related-heading">
      <h2 id="journal-related-heading">Keep reading</h2>
      <ol className="journal-list">{related.map(item => <JournalRow key={item.slug} post={item} />)}</ol>
    </section>
  </article>;
}

function JournalInvitation() {
  const [open, setOpen] = useState(false);
  return <>
    <section className="journal-invitation" aria-label="Explore Core">
      <div><h2>Put the ideas to work.</h2><p>Explore what Core could do for your business.</p></div>
      <button type="button" onClick={() => setOpen(true)}>Book a call <ArrowRight size={17} aria-hidden="true" /></button>
    </section>
    {typeof document !== 'undefined' && createPortal(
      <div className="core-support journal-inquiry-portal"><CoreInquiry open={open} onClose={() => setOpen(false)} /></div>,
      document.body,
    )}
  </>;
}

function JournalNotFound() {
  return <div className="journal-empty journal-missing">
    <h1>That note isn’t here.</h1>
    <p>You can find the rest of our writing in the journal.</p>
    <RouterLink to="/blog">Back to all notes <ArrowRight size={16} aria-hidden="true" /></RouterLink>
  </div>;
}
