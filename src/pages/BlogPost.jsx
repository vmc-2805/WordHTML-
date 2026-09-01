import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, Clock, Tag, Share2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { blogPosts } from '../data/blogPosts';
import Breadcrumbs from '../components/Breadcrumbs';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  useSEO({
    title: post ? `${post.title} | WordConvertHTML Blog` : 'Blog Post Not Found | WordConvertHTML',
    description: post ? post.excerpt : 'Article not found.',
    canonical: post ? `https://wordconverthtml.com/blog/${post.slug}` : 'https://wordconverthtml.com/blog'
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 min-h-screen bg-slate-50 dark:bg-surface-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Blog', to: '/blog' },
            { label: post.category }
          ]}
        />

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-medium">
              {post.category}
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-surface-500">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} min read</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-surface-400 leading-relaxed mb-6">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-surface-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">{post.author}</div>
                <div className="text-xs text-slate-400 dark:text-surface-500">WordConvertHTML</div>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-surface-700 text-sm text-slate-600 dark:text-surface-300 hover:border-primary-300 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden mb-8 shadow-xl shadow-primary-500/10">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* Article Body */}
        <article className="bg-white dark:bg-surface-900/50 border border-slate-200 dark:border-surface-700/50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {post.content.map((section, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {section.heading}
                </h2>
                <p className="text-slate-600 dark:text-surface-300 leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-slate-100 dark:border-surface-800">
            <Tag className="w-4 h-4 text-slate-400 dark:text-surface-500" />
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-surface-800 text-xs text-slate-600 dark:text-surface-300">
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* Prev/Next Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {prevPost ? (
            <Link to={`/blog/${prevPost.slug}`} className="group p-5 rounded-2xl bg-white dark:bg-surface-900/50 border border-slate-200 dark:border-surface-700/50 hover:border-primary-200 dark:hover:border-primary-500/40 transition-all duration-300">
              <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-surface-500 mb-2">
                <ArrowLeft className="w-3 h-3" /> Previous
              </span>
              <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
                {prevPost.title}
              </span>
            </Link>
          ) : <div />}

          {nextPost ? (
            <Link to={`/blog/${nextPost.slug}`} className="group p-5 rounded-2xl bg-white dark:bg-surface-900/50 border border-slate-200 dark:border-surface-700/50 hover:border-primary-200 dark:hover:border-primary-500/40 transition-all duration-300 text-right">
              <span className="flex items-center justify-end gap-1 text-xs text-slate-400 dark:text-surface-500 mb-2">
                Next <ArrowRight className="w-3 h-3" />
              </span>
              <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </section>
  );
}
