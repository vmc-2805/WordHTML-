import { Mail, Shield, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Footer() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <footer ref={ref} className={`border-t border-slate-200 dark:border-surface-800 py-12 sm:py-16 bg-white dark:bg-surface-950 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="sm:col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Logo size="md" />
            </div>
            <p className="text-slate-600 dark:text-surface-400 text-sm leading-relaxed max-w-sm mb-4">
              Free online tool to convert Word documents to clean, semantic HTML at wordconverthtml.com.
              Your content stays private — everything runs in your browser.
            </p>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary-500 dark:text-primary-400" />
              <span className="text-xs text-slate-500 dark:text-surface-400">100% Client-side & Private</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">Features</h3>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-surface-400">
              <li>Word to HTML</li>
              <li>HTML Cleaning</li>
              <li>Smart Formatting</li>
              <li>Export Options</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/blog" className="text-slate-500 dark:text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-500 dark:text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Terms of Use</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-500 dark:text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-surface-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 dark:text-surface-500 text-sm">
            &copy; {new Date().getFullYear()} WordConvertHTML. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-surface-600">
            <Link to="/blog" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Blog</Link>
            <Link to="/terms" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
