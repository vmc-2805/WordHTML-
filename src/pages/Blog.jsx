import { Calendar, ArrowRight, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { blogPosts } from '../data/blogPosts';
import PageHeader from '../components/PageHeader';

export default function Blog() {
  useSEO({
    title: 'Blog - Word to HTML Tips & Tutorials | WordConvertHTML',
    description: 'Learn how to convert Word documents to clean HTML, optimize web content, and more with expert tips and tutorials from WordConvertHTML.',
    canonical: 'https://wordconverthtml.com/blog'
  });

  return (
    <section className="pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 min-h-screen bg-slate-50 dark:bg-surface-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <PageHeader
            items={[
              { label: 'Home', to: '/' },
              { label: 'Blog' }
            ]}
            title="WordConvertHTML Blog"
            description="Tips, tutorials, and guides to convert Word to HTML, clean your markup, and improve web content."
          />
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white dark:bg-surface-900/50 border border-slate-200 dark:border-surface-700/50 rounded-2xl overflow-hidden hover-lift hover-glow transition-all duration-500 flex flex-col"
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                  {post.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-surface-500 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} min</span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-sm text-slate-600 dark:text-surface-400 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-surface-800">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-surface-400">
                    <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center">
                      <User className="w-3 h-3 text-primary-500 dark:text-primary-400" />
                    </span>
                    {post.author}
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-all group-hover:gap-2"
                  >
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
