import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, User, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPosts';

export default function Blog() {
  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <Helmet>
        <title>Blog & Resources | GrowthSync</title>
        <meta name="description" content="Insights for the modern growth team. Strategies, playbooks, and trends on social commerce, AI automation, and turning engagement into revenue." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        {/* Header */}
        <div className="max-w-5xl mb-16 md:mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-display font-bold text-gray-950 mb-4 leading-tight"
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl"
          >
            Strategies, playbooks, and trends on social commerce, AI automation, and turning engagement into revenue.
          </motion.p>
        </div>

        {/* Featured Post */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16 md:mb-24"
        >
          <Link to={`/blog/${blogPosts[0].id}`} className="group block">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 grid md:grid-cols-2 gap-0 transition-shadow hover:shadow-md">
              <div className="h-64 md:h-auto overflow-hidden relative">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 uppercase tracking-wider">
                  {blogPosts[0].category}
                </div>
              </div>
              <div className="p-6 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {blogPosts[0].date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {blogPosts[0].readTime}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-display font-bold text-gray-950 mb-4 group-hover:text-teal-600 transition-colors">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {blogPosts[0].author.avatar ? (
                        <img src={blogPosts[0].author.avatar} alt={blogPosts[0].author.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{blogPosts[0].author.name}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-teal-50 transition-colors">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Grid Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
            >
              <Link to={`/blog/${post.id}`} className="group block h-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-full flex flex-col transition-shadow hover:shadow-md">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-gray-950 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
                      <span className="text-sm font-medium text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read more <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
