import { useEffect } from 'react';
import type { BlogPost } from './types';
import type { JournalFilter } from './journal/types';

const SITE_URL = 'https://growthsync.com';

export function BlogSeo({ post, tab = 'All', missing = false }: { post?: BlogPost; tab?: JournalFilter; missing?: boolean }) {
  const title = post ? `${post.title} | GrowthSync Journal` : missing ? 'Note not found | GrowthSync' : 'Journal | GrowthSync';
  const description = post?.excerpt || 'How businesses become AI-native: perspectives, enterprise case studies, and the people building GrowthSync.';
  const suffix = tab === 'All' ? '' : `?tab=${tab.toLowerCase().replace(/ /g, '-')}`;
  const canonical = post ? `${SITE_URL}/blog/${post.slug}` : `${SITE_URL}/blog${suffix}`;
  const image = post ? (post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`) : `${SITE_URL}/growthsync-logo.png`;
  useEffect(() => {
    // Update the static HTML fallback tags instead of adding a second canonical
    // or description. Each route restores the fallback before its successor runs.
    const restore: Array<() => void> = [];
    const meta = (attribute: 'name' | 'property', key: string, content: string) => {
      const selector = `meta[${attribute}="${key}"]`;
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (element) {
        const before = element.getAttribute('content');
        const original = element;
        restore.push(() => before === null ? original.removeAttribute('content') : original.setAttribute('content', before));
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
        const created = element;
        restore.push(() => created.remove());
      }
      element.content = content;
    };
    meta('name', 'description', description);
    meta('property', 'og:type', post ? 'article' : 'website');
    meta('property', 'og:url', canonical);
    meta('property', 'og:title', title);
    meta('property', 'og:description', description);
    meta('property', 'og:image', image);
    meta('name', 'twitter:card', 'summary_large_image');
    meta('name', 'twitter:title', title);
    meta('name', 'twitter:description', description);
    meta('name', 'twitter:image', image);
    if (missing) meta('name', 'robots', 'noindex');
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) {
      const before = link.href;
      const original = link;
      restore.push(() => { original.href = before; });
    } else {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
      const created = link;
      restore.push(() => created.remove());
    }
    link.href = canonical;
    if (post) {
      meta('property', 'article:published_time', post.dateISO);
      meta('property', 'article:author', post.author.name);
      const data = [{
        '@context': 'https://schema.org', '@type': 'BlogPosting',
        headline: post.title, description: post.excerpt, image: [image],
        datePublished: post.dateISO, dateModified: post.dateISO,
        author: [{ '@type': post.author.name === 'GrowthSync' ? 'Organization' : 'Person', name: post.author.name, ...(post.author.name === 'GrowthSync' ? {} : { jobTitle: post.author.role }) }],
        url: canonical, mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        publisher: { '@type': 'Organization', name: 'GrowthSync', logo: { '@type': 'ImageObject', url: `${SITE_URL}/growthsync-logo.png` } },
      }, {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Journal', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
        ],
      }];
      for (const value of data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(value);
        document.head.appendChild(script);
        restore.push(() => script.remove());
      }
    }
    return () => { restore.reverse().forEach(reset => reset()); };
  }, [post, missing, canonical, description, image, title]);
  return null;
}
