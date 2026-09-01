import { ClipboardPaste, Wand2, Download, ArrowRight } from 'lucide-react';
import { useStaggerReveal } from '../hooks/useScrollReveal';

const steps = [
  {
    icon: ClipboardPaste,
    step: '01',
    title: 'Paste Your Content',
    description: 'Copy content from Microsoft Word or any rich text editor and paste it into the Word Editor panel.',
    gradient: 'from-primary-500 to-primary-600',
    bg: 'bg-primary-50 dark:bg-primary-500/10',
  },
  {
    icon: Wand2,
    step: '02',
    title: 'Auto-Clean HTML',
    description: 'The editor automatically removes Word-specific markup, inline styles, and converts to clean HTML.',
    gradient: 'from-accent-500 to-accent-600',
    bg: 'bg-accent-50 dark:bg-accent-500/10',
  },
  {
    icon: Download,
    step: '03',
    title: 'Export Clean HTML',
    description: 'Copy the clean HTML to your clipboard, download as a file, or print directly.',
    gradient: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
  }
];

export default function HowItWorks() {
  const [ref, visibleItems] = useStaggerReveal(steps.length, { staggerDelay: 200 });

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-surface-900/30 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #0E5952 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3">
            How It Works
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full mx-auto mb-4" />
          <p className="text-slate-600 dark:text-surface-400 max-w-2xl mx-auto text-lg">
            Three simple steps to convert your Word content to clean HTML online.
          </p>
        </div>

        {/* Steps with connectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-primary-300 via-accent-300 to-emerald-300 dark:from-primary-700 dark:via-accent-700 dark:to-emerald-700" />

          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative text-center transition-all duration-700 ${
                visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Step icon */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className={`w-20 h-20 rounded-2xl ${step.bg} flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-9 h-9 text-primary-500 dark:text-primary-400" />
                </div>
                {/* Step number badge */}
                <span className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient} text-white text-sm font-bold flex items-center justify-center shadow-lg z-20 animate-bounce-in`}>
                  {step.step}
                </span>
                {/* Glow ring */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-20 blur-xl animate-pulse-slow`} />
              </div>

              {/* Arrow between steps (mobile) */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <ArrowRight className="w-6 h-6 text-slate-300 dark:text-surface-600 rotate-90" />
                </div>
              )}

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{step.title}</h3>
              <p className="text-slate-600 dark:text-surface-400 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
