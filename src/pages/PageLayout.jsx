import { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function PageLayout({ title, icon: Icon, children }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.05 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 min-h-screen">
      <div ref={ref} className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">    
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            {title}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full mx-auto" />
        </div>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-surface-900/50 border border-slate-200 dark:border-surface-700/50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
