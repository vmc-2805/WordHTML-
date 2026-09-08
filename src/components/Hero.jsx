import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCode, Zap, ChevronRight } from 'lucide-react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [activeTab, setActiveTab] = useState('word');
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

  useEffect(() => {
    const tabTimer = setInterval(() => {
      setActiveTab(prev => prev === 'word' ? 'html' : 'word');
    }, 3000);
    return () => clearInterval(tabTimer);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-16 pb-12">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl animate-float-delay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl animate-pulse-slow" />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-400/20 rounded-full"
            style={{
              top: `${15 + i * 12}%`,
              left: `${10 + i * 15}%`,
              animation: `particle-float ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Side — Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6 transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <FileCode className="w-4 h-4 text-primary-500 dark:text-primary-400 animate-pulse" />
              <span className="text-sm text-primary-600 dark:text-primary-300 font-medium">
                Free Online Word to HTML Converter
              </span>
            </div>

            {/* Heading */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-all duration-700 delay-200 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="text-slate-900 dark:text-white">Convert </span>
              <span className="text-primary-500 dark:text-primary-400 relative inline-block">
                {typedText}
                <span className="inline-block w-[3px] h-[1em] bg-primary-500 dark:bg-primary-400 ml-1 animate-pulse align-middle" />
              </span>
              <br />
              <span className="text-slate-900 dark:text-white">Instantly</span>
            </h1>

            {/* Subheading */}
            <p
              className={`text-lg sm:text-xl text-slate-600 dark:text-surface-400 max-w-xl mb-8 transition-all duration-700 delay-400 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Paste your Word content, get clean, semantic HTML. Free, fast, and secure —
              no installation, no sign-up, everything runs in your browser.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center lg:items-start gap-4 transition-all duration-700 delay-500 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {/* Start Editing Button with outside arrow */}
              <div className="relative group">
                <Link
                  to="/editor"
                  className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 animate-pulse-glow z-10"
                >
                  <Zap className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  Start Editing
                </Link>
                {/* Animated arrow outside the button */}
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                  <div className="animate-bounce-x">
                    <ChevronRight className="w-6 h-6 text-primary-500 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gradient-to-r from-primary-500 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-slate-200 dark:border-surface-700 text-slate-700 dark:text-surface-300 font-semibold hover:border-primary-300 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:shadow-lg"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Side — Editor Visual */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <Link to="/editor" className="block relative animate-float-slow group cursor-pointer">
              {/* Glow behind the card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Main Editor Card */}
              <div className="relative bg-white dark:bg-surface-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-surface-700 overflow-hidden group-hover:shadow-primary-500/20 group-hover:border-primary-300 dark:group-hover:border-primary-600 transition-all duration-300">
                {/* Editor Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-surface-900 border-b border-slate-200 dark:border-surface-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setActiveTab('word')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-300 ${
                        activeTab === 'word'
                          ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                          : 'text-slate-500 hover:text-slate-700 dark:hover:text-surface-300'
                      }`}
                    >
                      Word
                    </button>
                    <ArrowRight className="w-3 h-3 text-slate-400 animate-pulse" />
                    <button
                      onClick={() => setActiveTab('html')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-300 ${
                        activeTab === 'html'
                          ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                          : 'text-slate-500 hover:text-slate-700 dark:hover:text-surface-300'
                      }`}
                    >
                      HTML
                    </button>
                  </div>
                </div>

                {/* Editor Content */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  {/* Word Content Panel */}
                  <div
                    className={`absolute inset-0 p-5 transition-all duration-700 ${
                      activeTab === 'word'
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-full'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="h-3 bg-slate-200 dark:bg-surface-600 rounded-full w-3/4" />
                      <div className="h-3 bg-slate-200 dark:bg-surface-600 rounded-full w-full" />
                      <div className="h-3 bg-slate-200 dark:bg-surface-600 rounded-full w-5/6" />
                      <div className="mt-4 flex gap-2">
                        <div className="h-24 bg-slate-100 dark:bg-surface-700 rounded-lg w-1/3 border border-slate-200 dark:border-surface-600" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-slate-200 dark:bg-surface-600 rounded-full w-full" />
                          <div className="h-3 bg-slate-200 dark:bg-surface-600 rounded-full w-4/5" />
                          <div className="h-3 bg-slate-200 dark:bg-surface-600 rounded-full w-full" />
                          <div className="h-3 bg-slate-200 dark:bg-surface-600 rounded-full w-3/5" />
                        </div>
                      </div>
                      <div className="h-3 bg-slate-200 dark:bg-surface-600 rounded-full w-2/3" />
                      <div className="h-3 bg-slate-200 dark:bg-surface-600 rounded-full w-full" />
                    </div>
                    <div className="absolute bottom-4 left-5 right-5 flex items-center gap-2 px-3 py-2 bg-primary-500/5 rounded-lg border border-primary-500/10">
                      <Zap className="w-4 h-4 text-primary-500" />
                      <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                        Rich text formatting detected
                      </span>
                    </div>
                  </div>

                  {/* HTML Content Panel */}
                  <div
                    className={`absolute inset-0 p-5 transition-all duration-700 ${
                      activeTab === 'html'
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-full'
                    }`}
                  >
                    <pre className="text-xs font-mono leading-relaxed">
                      <code>
                        <span className="text-pink-500">&lt;div</span>
                        <span className="text-yellow-500"> class</span>
                        <span className="text-green-500">="content"</span>
                        <span className="text-pink-500">&gt;</span>
                        {'\n'}
                        {'  '}
                        <span className="text-pink-500">&lt;h1&gt;</span>
                        <span className="text-slate-700 dark:text-surface-300">Hello World</span>
                        <span className="text-pink-500">&lt;/h1&gt;</span>
                        {'\n'}
                        {'  '}
                        <span className="text-pink-500">&lt;p&gt;</span>
                        <span className="text-slate-700 dark:text-surface-300">Clean semantic HTML</span>
                        <span className="text-pink-500">&lt;/p&gt;</span>
                        {'\n'}
                        {'  '}
                        <span className="text-pink-500">&lt;ul&gt;</span>
                        {'\n'}
                        {'    '}
                        <span className="text-pink-500">&lt;li&gt;</span>
                        <span className="text-slate-700 dark:text-surface-300">Formatted text</span>
                        <span className="text-pink-500">&lt;/li&gt;</span>
                        {'\n'}
                        {'    '}
                        <span className="text-pink-500">&lt;li&gt;</span>
                        <span className="text-slate-700 dark:text-surface-300">Tables &amp; lists</span>
                        <span className="text-pink-500">&lt;/li&gt;</span>
                        {'\n'}
                        {'  '}
                        <span className="text-pink-500">&lt;/ul&gt;</span>
                        {'\n'}
                        <span className="text-pink-500">&lt;/div&gt;</span>
                      </code>
                    </pre>
                    <div className="absolute bottom-4 left-5 right-5 flex items-center gap-2 px-3 py-2 bg-green-500/5 rounded-lg border border-green-500/10">
                      <FileCode className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        Clean, semantic output ready
                      </span>
                    </div>
                  </div>
                </div>

                {/* Conversion Arrow Animation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30 animate-pulse-glow">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-white dark:bg-surface-800 rounded-lg shadow-lg border border-slate-200 dark:border-surface-700 animate-bounce-in">
                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">Free</span>
              </div>
              <div className="absolute -bottom-3 -left-3 px-3 py-1.5 bg-white dark:bg-surface-800 rounded-lg shadow-lg border border-slate-200 dark:border-surface-700 animate-bounce-in animate-delay-300">
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">Secure</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
