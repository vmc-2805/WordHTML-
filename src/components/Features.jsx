import { Zap, Shield, Download, Wand2, FileText, RefreshCw } from 'lucide-react';
import { useStaggerReveal } from '../hooks/useScrollReveal';

const features = [
  {
    icon: Wand2,
    title: 'Smart Cleaning',
    description: 'Automatically removes Word-specific markup, inline styles, and unnecessary attributes.',
    color: 'from-primary-500/20 to-primary-600/20',
    iconBg: 'bg-primary-100 dark:bg-primary-500/10',
    iconColor: 'text-primary-500 dark:text-primary-400',
  },
  {
    icon: Zap,
    title: 'Real-time Conversion',
    description: 'See HTML output instantly as you type or paste Word content.',
    color: 'from-accent-500/20 to-accent-600/20',
    iconBg: 'bg-accent-100 dark:bg-accent-500/10',
    iconColor: 'text-accent-600 dark:text-accent-400',
  },
  {
    icon: Shield,
    title: '100% Client-side',
    description: 'Your content never leaves your browser. Complete privacy guaranteed.',
    color: 'from-emerald-500/20 to-emerald-600/20',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
  },
  {
    icon: Download,
    title: 'Export Options',
    description: 'Download as HTML file, copy to clipboard, or print directly.',
    color: 'from-blue-500/20 to-blue-600/20',
    iconBg: 'bg-blue-100 dark:bg-blue-500/10',
    iconColor: 'text-blue-500 dark:text-blue-400',
  },
  {
    icon: FileText,
    title: 'Semantic HTML',
    description: 'Converts b/i tags to semantic strong/em tags for better accessibility.',
    color: 'from-purple-500/20 to-purple-600/20',
    iconBg: 'bg-purple-100 dark:bg-purple-500/10',
    iconColor: 'text-purple-500 dark:text-purple-400',
  },
  {
    icon: RefreshCw,
    title: 'Format & Preview',
    description: 'Beautify HTML output with proper indentation and structure.',
    color: 'from-rose-500/20 to-rose-600/20',
    iconBg: 'bg-rose-100 dark:bg-rose-500/10',
    iconColor: 'text-rose-500 dark:text-rose-400',
  }
];

export default function Features() {
  const [ref, visibleItems] = useStaggerReveal(features.length, { staggerDelay: 100 });

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-surface-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3">
            Powerful Features
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full mx-auto mb-4" />
          <p className="text-slate-600 dark:text-surface-400 max-w-2xl mx-auto text-lg">
            Everything you need to convert Word documents to clean, production-ready HTML at wordconverthtml.com.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-2xl bg-white dark:bg-surface-900/50 border border-slate-200 dark:border-surface-700/50 hover-lift hover-glow transition-all duration-500 ${
                visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative">
                <div className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-surface-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
