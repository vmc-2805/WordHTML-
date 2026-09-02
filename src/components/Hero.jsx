import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, FileCode, Zap } from 'lucide-react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Word to HTML';

  useEffect(() => {
    setLoaded(true);
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-16 pb-12 sm:pb-16 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float-delay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl animate-pulse-slow" />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
            style={{
              top: `${15 + i * 12}%`,
              left: `${10 + i * 15}%`,
              animation: `particle-float ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6 sm:mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <FileCode className="w-4 h-4 text-primary-500 dark:text-primary-400 animate-pulse" />
          <span className="text-sm text-primary-600 dark:text-primary-300 font-medium">Free Online Word to HTML Converter</span>        </div>

        {/* Heading with typing effect */}
        <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-slate-900 dark:text-white">Convert </span>
          <span className="text-primary-500 dark:text-primary-400 relative">
            {typedText}
            <span className="inline-block w-[3px] h-[1em] bg-primary-500 dark:bg-primary-400 ml-1 animate-pulse align-middle" />
          </span>
          <br className="sm:hidden" />
          <span className="text-slate-900 dark:text-white"> Instantly</span>
        </h1>

        {/* Subheading */}
        <p className={`text-lg sm:text-xl text-slate-600 dark:text-surface-400 max-w-2xl mx-auto mb-8 sm:mb-10 transition-all duration-700 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Paste your Word content, get clean, semantic HTML. Free, fast, and secure —
          no installation, no sign-up, and everything runs in your browser.
        </p>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <Link
            to="/editor"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 animate-pulse-glow"
          >
            <Zap className="w-5 h-5 transition-transform group-hover:rotate-12" />
            Start Editing
            <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-slate-200 dark:border-surface-700 text-slate-700 dark:text-surface-300 font-semibold hover:border-primary-300 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:shadow-lg"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
