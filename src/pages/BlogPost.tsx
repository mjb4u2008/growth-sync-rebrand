import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPosts';

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
    <div className="bg-white min-h-screen pt-24 pb-24">
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
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors">
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
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gray-950 leading-[1.1] mb-8"
          >
            {post.title}
          </motion.h1>
          
          {/* Author Meta */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-y border-gray-100 gap-4"
          >
            <div className="flex items-center gap-4">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div>
                <div className="font-bold text-gray-900">{post.author.name}</div>
                <div className="text-sm text-gray-500">{post.author.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
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
            className="w-full rounded-2xl aspect-video object-cover shadow-sm" 
            referrerPolicy="no-referrer"
          />
          <figcaption className="text-center text-sm text-gray-400 mt-4">
            {post.category} - {post.title}
          </figcaption>
        </motion.figure>

        {/* Body Content - Structured for SEO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-gray-700"
        >
          {post.content}
        </motion.div>

        {/* Share & Tags */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Share this article</span>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                <LinkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-600 text-sm font-medium rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="mt-16 bg-gray-50 rounded-3xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img src={post.author.avatar} alt={post.author.name} className="w-24 h-24 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Written by {post.author.name}</h4>
            <p className="text-gray-600 mb-4">
              {post.author.bio}
            </p>
            <button className="text-teal-600 font-bold text-sm uppercase tracking-wider hover:text-teal-700 transition-colors">
              Follow on LinkedIn →
            </button>
          </div>
        </div>

      </article>
    </div>
  );
}
