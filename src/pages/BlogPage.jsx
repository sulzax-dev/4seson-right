import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="bg-brand-500/20 text-brand-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-brand-500/30 inline-block mb-3">
            Articles & Remodeling Guides
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Home Improvement & Contracting Insights
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Expert cost breakdowns, waterproofing guides, drywall finishing comparisons, and roofing maintenance tips for Washington homeowners.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-brand-500 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-500" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-500" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-black text-slate-900 text-lg leading-snug group-hover:text-brand-500 transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs font-extrabold text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
