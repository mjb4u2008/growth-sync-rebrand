import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPosts';
import { getMarketContextLinks, getRelatedPosts } from '../utils/blogLinks';

export default function BlogPost() {
  const { id } = useParams();
  
  // Find the post by ID
  const post = blogPosts.find(p => p.id === Number(id));

  // If post not found, redirect to blog index
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const siteUrl = 'https://growthsync.com';
  const postUrl = `${siteUrl}/blog/${post.id}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `${siteUrl}${post.image}`;
  const relatedPosts = getRelatedPosts(blogPosts, post, 3);
  const marketContextLinks = getMarketContextLinks(post, 2);

  // BreadcrumbList for rich results
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${siteUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title
      }
    ]
  };

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [imageUrl],
    "datePublished": post.dateISO,
    "dateModified": post.dateISO,
    "author": [{
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role
    }],
    "description": post.excerpt,
    "url": postUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "GrowthSync",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/growthsync-logo.png`
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] pb-24 pt-24 text-[#080b0f]">
      <Helmet>
        <title>{post.title} | GrowthSync Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={postUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="GrowthSync" />
        <meta property="article:published_time" content={post.dateISO} />
        <meta property="article:author" content={post.author.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={imageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-black text-[#1688ff] transition-colors hover:text-[#080b0f]">
            <ArrowLeft className="w-4 h-4" /> Back to all posts
          </Link>
        </motion.div>

        {/* Header */}
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="rounded-full bg-[#080b0f] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
              {post.category}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 font-display text-4xl font-black leading-[0.95] tracking-tight text-[#080b0f] sm:text-5xl md:text-6xl"
          >
            {post.title}
          </motion.h1>
          
          {/* Author Meta */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-between gap-4 border-y border-black/10 py-6 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div>
                <div className="font-black text-[#080b0f]">{post.author.name}</div>
                <div className="text-sm font-bold text-black/46">{post.author.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm font-bold text-black/46">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>
          </motion.div>
        </header>

        {/* Featured Image */}
        <motion.figure 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="aspect-video w-full rounded-lg object-cover shadow-sm"
            referrerPolicy="no-referrer"
          />
          <figcaption className="mt-4 text-center text-sm font-bold text-black/34">
            {post.category} - {post.title}
          </figcaption>
        </motion.figure>

        {/* Body Content - Structured for SEO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-black/70 [&_a]:font-black [&_a]:text-[#1688ff] [&_a]:underline [&_a]:decoration-[#1688ff]/25 [&_a]:underline-offset-4 [&_a:hover]:text-[#080b0f]"
        >
          {post.content}
        </motion.div>

        <section className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-lg border border-black/10 bg-white p-8 shadow-[0_18px_60px_rgba(8,11,15,0.04)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1688ff]">Keep Reading</p>
            <h3 className="mt-3 font-display text-2xl font-black leading-[1.02] text-[#080b0f]">Related posts worth opening next</h3>
            <div className="mt-6 grid gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="group rounded-lg border border-black/10 bg-white p-5 transition-colors hover:border-[#1688ff]/35 hover:bg-[#1688ff]/5 no-underline"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-black/36">{relatedPost.category}</p>
                      <p className="mt-2 font-display text-lg font-black leading-[1.04] text-[#080b0f] group-hover:text-[#1688ff]">{relatedPost.title}</p>
                      <p className="mt-2 text-sm font-bold leading-relaxed text-black/56">{relatedPost.excerpt}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-black/24 transition-colors group-hover:text-[#1688ff]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-lg border border-black/10 bg-white p-8 shadow-[0_18px_60px_rgba(8,11,15,0.04)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-black/40">Market Context</p>
              <h3 className="mt-3 font-display text-2xl font-black leading-[1.02] text-[#080b0f]">Useful source trails around this topic</h3>
              <div className="mt-6 grid gap-4">
                {marketContextLinks.map((resource) => (
                  <a
                    key={resource.href}
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-lg border border-black/10 p-5 transition-colors hover:border-[#1688ff]/35 hover:bg-[#1688ff]/5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-black text-[#080b0f] group-hover:text-[#1688ff]">{resource.label}</p>
                        <p className="mt-2 text-sm font-bold leading-relaxed text-black/56">{resource.description}</p>
                      </div>
                      <ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 text-black/24 transition-colors group-hover:text-[#1688ff]" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-[#080b0f] p-8 text-white shadow-[0_24px_80px_rgba(8,11,15,0.18)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#e8ff63]">Get Started</p>
              <h3 className="mt-3 font-display text-3xl font-black leading-[0.95]">Turn this social intent into action.</h3>
              <p className="mt-4 text-sm font-bold leading-relaxed text-white/64">
                If this article lines up with what your team is seeing, we can show you how GrowthSync turns those conversations into attributed sales.
              </p>
              <Link
                to="/get-started"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e8ff63] px-5 py-3 text-sm font-black text-[#080b0f] transition hover:-translate-y-0.5 hover:bg-white no-underline"
              >
                Get Started for Free
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Share & Tags */}
        <div className="mt-16 flex flex-col justify-between gap-6 border-t border-black/10 pt-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="text-sm font-black uppercase tracking-[0.16em] text-[#080b0f]">Share this article</span>
            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black/56 transition-colors hover:bg-[#080b0f] hover:text-white">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black/56 transition-colors hover:bg-[#080b0f] hover:text-white">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black/56 transition-colors hover:bg-[#080b0f] hover:text-white">
                <LinkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags?.map(tag => (
              <span key={tag} className="rounded-full bg-white px-3 py-1 text-sm font-bold text-black/56">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="mt-16 flex flex-col items-center gap-6 rounded-lg border border-black/10 bg-white p-8 text-center shadow-[0_18px_60px_rgba(8,11,15,0.04)] sm:flex-row sm:items-start sm:text-left">
          <img src={post.author.avatar} alt={post.author.name} className="w-24 h-24 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />
          <div>
            <h4 className="mb-2 font-display text-xl font-black text-[#080b0f]">Written by {post.author.name}</h4>
            <p className="mb-4 font-bold leading-relaxed text-black/56">
              {post.author.bio}
            </p>
            <button className="text-sm font-black uppercase tracking-[0.16em] text-[#1688ff] transition-colors hover:text-[#080b0f]">
              Follow on LinkedIn →
            </button>
          </div>
        </div>

      </article>
    </div>
  );
}
