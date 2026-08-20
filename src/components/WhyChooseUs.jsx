import { useEffect, useState } from 'react';
import { Globe, Lock, Cpu, Star } from 'lucide-react';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';

const reasons = [
  {
    icon: Globe,
    title: 'No Installation Required',
    description: 'Works directly in your browser. No downloads, no plugins, no setup.',
    color: 'bg-primary-100 dark:bg-primary-500/10',
    iconColor: 'text-primary-500 dark:text-primary-400',
  },
  {
    icon: Lock,
    title: 'Complete Privacy',
    description: 'All processing happens locally. Your documents never leave your device.',
    color: 'bg-accent-100 dark:bg-accent-500/10',
    iconColor: 'text-accent-600 dark:text-accent-400',
  },
  {
    icon: Cpu,
    title: 'Lightning Fast',
    description: 'Instant conversion with no server delays. Works offline too.',
    color: 'bg-emerald-100 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
  }
];

const stats = [
  { value: 100, suffix: '%', label: 'Free to Use' },
  { value: 0, suffix: '', label: 'Server Calls' },
  { value: 1, suffix: 's', label: 'Conversion Time', prefix: '<' },
  { value: 999999, suffix: '+', label: 'Unlimited Usage' }
];

function AnimatedStat({ value, suffix = '', prefix = '', delay = 0 }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      const duration = 1500;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * value));
        if (progress < 1) requestAnimationFrame(animate);
        else setCount(value);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);

  const displayValue = value >= 999999 ? '∞' : `${prefix}${count}${suffix}`;

  return (
    <div ref={ref} className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <span className="text-2xl sm:text-3xl font-bold text-primary-500 dark:text-primary-400">
        {displayValue}
      </span>
    </div>
  );
}

export default function WhyChooseUs() {
  const [ref, visibleItems] = useStaggerReveal(reasons.length, { staggerDelay: 120 });

  return (
    <section id="why-choose-us" className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-surface-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/3 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3">
            Why Choose Us
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full mx-auto mb-4" />
          <p className="text-slate-600 dark:text-surface-400 max-w-2xl mx-auto text-lg">
            The fastest, most secure way to convert Word documents to HTML.
          </p>
        </div>

        {/* Reason cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 lg:mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-2xl bg-white dark:bg-surface-900/50 border border-slate-200 dark:border-surface-700/50 text-center hover-lift hover-glow transition-all duration-500 ${
                visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl ${reason.color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                <reason.icon className={`w-8 h-8 ${reason.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{reason.title}</h3>
              <p className="text-slate-600 dark:text-surface-400 text-sm">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-4 sm:p-6 rounded-2xl bg-white dark:bg-surface-800/50 border border-slate-200 dark:border-surface-700/30 hover-lift transition-all duration-500 ${
                visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <AnimatedStat value={stat.value} suffix={stat.suffix} prefix={stat.prefix || ''} delay={index * 150} />
              <div className="text-sm text-slate-500 dark:text-surface-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
