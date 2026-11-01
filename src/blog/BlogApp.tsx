import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react';
import { BlogSeo } from './BlogSeo';
import { RouterLink, navigateTo, useRoute } from './router';
import type { BlogPost, BlogTab } from './types';
import { getAllPosts, getHeadingsFromPost, getPostBySlug, getRelatedPosts } from './utils';
import '@/styles/journal.css';

type JournalTab = 'All' | BlogTab;

function tabFromSearch(search: string): JournalTab {
  const value = new URLSearchParams(search).get('tab');
  return value === 'tech-corner' ? 'Tech Corner' : value === 'market-studies' ? 'Market Studies' : 'All';
}

export function BlogApp() {
  const route = useRoute();
  const all = useMemo(() => getAllPosts(), []);
  const post = route.kind === 'blog-post' ? getPostBySlug(route.slug) : undefined;
  const tab = route.kind === 'blog-index' ? tabFromSearch(route.search) : 'All';
  const missing = route.kind === 'blog-post' && !post;

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
    return posts.filter(post => (tab === 'All' || post.tab === tab) && (!needle || [post.title, post.excerpt, post.author.name, post.category, ...post.tags].join(' ').toLocaleLowerCase().includes(needle)));
  }, [posts, tab, query]);

  function selectTab(next: JournalTab) {
    navigateTo(next === 'All' ? '/blog' : `/blog?tab=${next === 'Tech Corner' ? 'tech-corner' : 'market-studies'}`);
  }

  return <div className="journal-index">
    <div className="journal-intro">
      <h1>Journal</h1>
      <p>Ideas from the work in progress.</p>
    </div>
    <div className="journal-tools">
      <div className="journal-filters" role="group" aria-label="Filter journal">
        {(['All', 'Market Studies', 'Tech Corner'] as const).map(value => <button key={value} type="button" aria-pressed={tab === value} onClick={() => selectTab(value)}>{value === 'All' ? 'All notes' : value === 'Market Studies' ? 'Market studies' : 'Tech corner'}</button>)}
      </div>
      <div className="journal-search">
        <Search size={16} aria-hidden="true" />
        <input ref={searchRef} type="search" aria-label="Search journal" placeholder="Find a note" value={query} onChange={event => setQuery(event.target.value)} />
        {query && <button type="button" aria-label="Clear search" onClick={() => { setQuery(''); searchRef.current?.focus(); }}><X size={15} aria-hidden="true" /></button>}
      </div>
    </div>
    <p className="core-sr-only" role="status">{filtered.length} {filtered.length === 1 ? 'note' : 'notes'} found</p>
    {filtered.length ? <ol className="journal-list">{filtered.map(post => <JournalRow key={post.slug} post={post} />)}</ol> : <div className="journal-empty">
      <h2>No notes found.</h2>
      <p>Try another word or browse all notes.</p>
      <button type="button" onClick={() => { setQuery(''); selectTab('All'); }}>Show all notes <ArrowRight size={16} aria-hidden="true" /></button>
    </div>}
  </div>;
}

function JournalRow({ post }: { post: BlogPost }) {
  return <li>
    <RouterLink to={`/blog/${post.slug}`} className="journal-row">
      <time dateTime={post.dateISO}>{post.date}</time>
      <div className="journal-row-copy">
        <h2>{post.title}</h2>
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
    <RouterLink to="/blog" className="journal-back"><ArrowLeft size={16} aria-hidden="true" />All notes</RouterLink>
    <header className="journal-article-head">
      <h1>{post.title}</h1>
      <p className="journal-byline">{post.author.name}{' '}<span aria-hidden="true">·</span>{' '}<time dateTime={post.dateISO}>{post.date}</time>{' '}<span aria-hidden="true">·</span>{' '}{post.readTime}</p>
    </header>
    {headings.length > 2 && <details className="journal-contents">
      <summary>In this article</summary>
      <nav aria-label="Article sections"><ol>{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.text}</a></li>)}</ol></nav>
    </details>}
    <div className="journal-prose">{post.content}</div>
    {!!post.sources?.length && <section className="journal-sources"><h2>Sources</h2><ul>{post.sources.map(source => <li key={source.href}>{source.href && source.href !== '#' ? <a href={source.href} target="_blank" rel="noreferrer">{source.label}</a> : source.label}</li>)}</ul></section>}
    <section className="journal-related" aria-labelledby="journal-related-heading">
      <h2 id="journal-related-heading">Keep reading</h2>
      <ol className="journal-list">{related.map(item => <JournalRow key={item.slug} post={item} />)}</ol>
    </section>
  </article>;
}

function JournalNotFound() {
  return <div className="journal-empty journal-missing">
    <h1>That note isn’t here.</h1>
    <p>You can find the rest of our writing in the journal.</p>
    <RouterLink to="/blog">Back to all notes <ArrowRight size={16} aria-hidden="true" /></RouterLink>
  </div>;
}
