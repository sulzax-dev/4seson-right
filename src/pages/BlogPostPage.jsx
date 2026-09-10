import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { Calendar, Clock, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import EstimateForm from '../components/EstimateForm';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = post.metaTitle || `${post.title} | 4 Seasons Right Services Inc`;

      const metaDesc = document.querySelector("meta[name='description']");
      if (metaDesc && post.metaDescription) {
        metaDesc.setAttribute('content', post.metaDescription);
      }

      // Inject Schema JSON-LD if available
      let scriptTag;
      if (post.schema) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.id = 'blog-schema-jsonld';
        scriptTag.text = JSON.stringify(post.schema);
        document.head.appendChild(scriptTag);
      }

      return () => {
        if (scriptTag && document.head.contains(scriptTag)) {
          document.head.removeChild(scriptTag);
        }
      };
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const consultationService = post.category?.toLowerCase().includes('flooring')
    ? 'Flooring & Carpentry'
    : post.category?.toLowerCase().includes('roofing')
    ? 'Roofing Services'
    : 'Kitchen & Bath Remodeling';

  return (
    <div className="space-y-12 py-10">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-500 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
            <span className="bg-brand-50 text-brand-600 px-3 py-1 rounded-full border border-brand-200">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Featured Image */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-80 sm:h-96">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Article Content & CTA */}
      <section className="max-w-4xl mx-auto px-6 grid grid-cols-1 gap-12">
        <div
          className="text-slate-700 leading-relaxed text-base space-y-4 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-black [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-tight [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:font-extrabold [&_h3]:text-slate-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-slate-700 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-2 [&_li]:text-slate-700 [&_li]:leading-relaxed [&_strong]:font-bold [&_strong]:text-slate-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* In-Article Estimate Callout */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
          <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>4 Seasons Right Services Inc.</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black">
            Ready to Start Your Project in Kirkland or Seattle?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
            Get an accurate, itemized quote with zero guesswork. We provide free on-site inspections for homeowners across King & Snohomish County.
          </p>
          
          <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-lg">
            <h4 className="font-extrabold text-base mb-4 text-center">Schedule Free Consultation</h4>
            <EstimateForm defaultService={consultationService} source={`Blog Article: ${post.title}`} />
          </div>
        </div>
      </section>
    </div>
  );
}
