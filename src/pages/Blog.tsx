import { motion } from 'motion/react';
import { ArrowRight, Calendar, ChevronRight, Clock, User, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPosts';

export default function Blog() {
  const [featuredPost, ...posts] = blogPosts;

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#080b0f]">
      <Helmet>
        <title>Blog & Resources | GrowthSync</title>
        <meta name="description" content="Insights for the modern growth team. Strategies, playbooks, and trends on social commerce, AI automation, and turning engagement into revenue." />
        <link rel="canonical" href="https://growthsync.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growthsync.com/blog" />
        <meta property="og:title" content="Blog & Resources | GrowthSync" />
        <meta property="og:description" content="Insights for the modern growth team. Strategies, playbooks, and trends on social commerce, AI automation, and turning engagement into revenue." />
        <meta property="og:image" content="https://growthsync.com/growthsync-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#080b0f] text-white">
            <Zap className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-black tracking-tight">GrowthSync</span>
        </Link>
        <nav className="hidden items-center gap-9 text-sm font-black text-black/48 md:flex">
          <Link to="/#how" className="transition hover:text-[#080b0f]">How it works</Link>
          <Link to="/#proof" className="transition hover:text-[#080b0f]">Proof</Link>
          <Link to="/blog" className="text-[#080b0f]">Blog</Link>
        </nav>
        <Link
          to="/get-started"
          className="rounded-full bg-[#080b0f] px-5 py-3 text-sm font-black text-white shadow-[0_10px_30px_rgba(8,11,15,0.16)] transition hover:-translate-y-0.5 hover:bg-black"
        >
          Get Started for Free
        </Link>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
        <div className="grid gap-10 border-b border-black/10 pb-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-black/36"
            >
              Resources
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="max-w-5xl font-display text-6xl font-black leading-[0.86] tracking-tight md:text-8xl"
            >
              Ideas for turning attention into action.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="max-w-md text-lg font-bold leading-8 text-black/56"
          >
            Strategies, playbooks, and trends on social commerce, AI automation, and turning engagement into revenue.
          </motion.p>
        </div>

        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-12"
          >
            <Link to={`/blog/${featuredPost.id}`} className="group block">
              <article className="grid overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_24px_80px_rgba(8,11,15,0.07)] transition hover:-translate-y-1 hover:shadow-[0_30px_100px_rgba(8,11,15,0.1)] md:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[300px] overflow-hidden md:min-h-[520px]">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/46 via-black/0 to-black/8" />
                  <span className="absolute left-5 top-5 rounded-full bg-[#e8ff63] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#080b0f]">
                    {featuredPost.category}
                  </span>
                </div>
                <div className="flex flex-col justify-between p-6 md:p-10 lg:p-12">
                  <div>
                    <div className="mb-6 flex flex-wrap items-center gap-4 text-sm font-bold text-black/46">
                      <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {featuredPost.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {featuredPost.readTime}</span>
                    </div>
                    <h2 className="font-display text-4xl font-black leading-[0.95] tracking-tight transition group-hover:text-[#1688ff] md:text-5xl">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-6 max-w-xl text-lg font-bold leading-8 text-black/56">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center justify-between gap-6 border-t border-black/10 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-black/6">
                        {featuredPost.author.avatar ? (
                          <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <User className="h-5 w-5 text-black/42" />
                        )}
                      </div>
                      <span className="font-black">{featuredPost.author.name}</span>
                    </div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#080b0f] text-white transition group-hover:bg-[#1688ff]">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.22 + index * 0.05 }}
            >
              <Link to={`/blog/${post.id}`} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_18px_60px_rgba(8,11,15,0.05)] transition hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(8,11,15,0.09)]">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#080b0f] shadow-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-4 flex items-center gap-3 text-xs font-bold text-black/42">
                      <span>{post.date}</span>
                      <span className="h-1 w-1 rounded-full bg-black/18" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-display text-2xl font-black leading-[1.02] tracking-tight transition group-hover:text-[#1688ff]">
                      {post.title}
                    </h3>
                    <p className="mt-4 line-clamp-3 text-sm font-bold leading-6 text-black/52">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-5">
                      <span className="text-sm font-black">{post.author.name}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-black text-[#1688ff] transition group-hover:gap-2">
                        Read <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
