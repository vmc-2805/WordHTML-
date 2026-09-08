import { Link } from 'react-router-dom';
import { FileText, ExternalLink } from 'lucide-react';
import PageLayout from './PageLayout';
import { useSEO } from '../hooks/useSEO';
import { blogPosts } from '../data/blogPosts';

const mainPages = [
  { label: 'Home - Word to HTML Converter', to: '/', description: 'Free online Word to HTML converter at wordconverthtml.com.' },
  { label: 'Editor - Convert Word to HTML', to: '/editor', description: 'Convert and clean Word content to clean semantic HTML.' },
  { label: 'Blog - Tips & Tutorials', to: '/blog', description: 'Expert guides on converting Word to HTML and cleaning markup.' }
];

const legalPages = [
  { label: 'Terms of Use', to: '/terms', description: 'Terms and conditions for using WordConvertHTML.' },
  { label: 'Privacy Policy', to: '/privacy', description: 'How WordConvertHTML keeps your data private and secure.' }
];

export default function Sitemap() {
  useSEO({
    title: 'Sitemap - All Pages | WordConvertHTML',
    description: 'Browse every page on WordConvertHTML including the converter, blog articles, and legal pages. Find anything on the site instantly.',
    canonical: 'https://wordconverthtml.com/sitemap'
  });

  return (
    <PageLayout
      title="Sitemap"
      description="A complete list of all pages on WordConvertHTML. Use the links below to navigate to any part of the site."
      breadcrumbs={[
        { label: 'Home', to: '/' },
        { label: 'Sitemap' }
      ]}
    >
      <div className="space-y-10 text-slate-700 dark:text-surface-300">
        {/* Main Pages */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            Main Pages
            <span className="text-xs font-normal text-slate-400 dark:text-surface-500">({mainPages.length})</span>
          </h3>
          <ul className="grid grid-cols-1 gap-3">
            {mainPages.map((page) => (
              <li key={page.to} className="border border-slate-200 dark:border-surface-700/50 rounded-xl p-4 hover:border-primary-500/40 hover:shadow-sm transition-all">
                <Link to={page.to} className="font-medium text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 shrink-0" />
                  {page.label}
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </Link>
                <p className="text-sm text-slate-600 dark:text-surface-400 mt-1">{page.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Blog Posts */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            Blog Articles
            <span className="text-xs font-normal text-slate-400 dark:text-surface-500">({blogPosts.length})</span>
          </h3>
          <ul className="grid grid-cols-1 gap-3">
            {blogPosts.map((post) => (
              <li key={post.slug} className="border border-slate-200 dark:border-surface-700/50 rounded-xl p-4 hover:border-primary-500/40 hover:shadow-sm transition-all">
                <Link to={`/blog/${post.slug}`} className="font-medium text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 shrink-0" />
                  {post.title}
                </Link>
                <p className="text-sm text-slate-600 dark:text-surface-400 mt-1">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Pages */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            Legal &amp; Information
            <span className="text-xs font-normal text-slate-400 dark:text-surface-500">({legalPages.length})</span>
          </h3>
          <ul className="grid grid-cols-1 gap-3">
            {legalPages.map((page) => (
              <li key={page.to} className="border border-slate-200 dark:border-surface-700/50 rounded-xl p-4 hover:border-primary-500/40 hover:shadow-sm transition-all">
                <Link to={page.to} className="font-medium text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 shrink-0" />
                  {page.label}
                </Link>
                <p className="text-sm text-slate-600 dark:text-surface-400 mt-1">{page.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}
