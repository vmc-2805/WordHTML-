import { ArrowRight, Zap, Sparkles } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function CTA() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-surface-950">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-navy-700 animate-gradient" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzRtMC00djItSDJ2MmgzNG0wLTRWMThoLTJ2MmgzNG0wLTRWMGgtMnYyaDM0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

          {/* Floating decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-2xl animate-float rotate-12 pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-16 h-16 border border-white/10 rounded-full animate-float-delay pointer-events-none" />
          <div className="absolute top-1/2 right-20 w-3 h-3 bg-accent-300/40 rounded-full animate-float pointer-events-none" />
          <div className="absolute top-20 right-1/3 w-2 h-2 bg-white/30 rounded-full animate-float-delay pointer-events-none" />

          {/* Glow effect */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent-300/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-300/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:py-20 text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 transition-all duration-500 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Zap className="w-4 h-4 text-accent-300 animate-pulse" />
              <span className="text-sm text-white/90 font-medium">Start in Seconds</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              Ready to Convert Your Documents to HTML?
            </h2>

            <p className={`text-lg text-white/80 max-w-xl mx-auto mb-8 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              No sign-up, no installation. Just open the editor and start converting Word to clean HTML instantly.
            </p>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <a
                href="#editor"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-600 font-bold hover:bg-slate-50 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-black/20"
              >
                <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
                Open Editor
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
