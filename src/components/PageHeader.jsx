import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PageHeader({ items, title, description }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-navy-800 shadow-xl shadow-primary-600/20 animate-gradient">
      {/* Decorative orbs */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-accent-300/20 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-primary-300/20 rounded-full blur-3xl animate-float-delay pointer-events-none" />
      <div className="absolute top-6 right-1/4 w-2 h-2 bg-accent-200/60 rounded-full animate-float pointer-events-none" />
      <div className="absolute bottom-8 right-10 w-3 h-3 bg-white/30 rounded-full animate-float-delay pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNiI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzRtMC00djItSDJ2MmgzNG0wLTRWMThoLTJ2MmgzNG0wLTRWMGgtMnYyaDM0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

      <div className="relative px-6 sm:px-8 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left: Breadcrumb + Title */}
          <div className="flex-1 min-w-0 text-center lg:text-left">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center justify-center lg:justify-start gap-1.5 flex-wrap text-sm mb-4"
            >
              {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                  <span key={index} className="flex items-center gap-1.5">
                    {index === 0 && (
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-accent-200">
                        <Home className="w-3 h-3" />
                      </span>
                    )}
                    {isLast ? (
                      <span className={`font-semibold text-accent-200 ${index === 0 ? 'ml-1' : ''}`}>{item.label}</span>
                    ) : (
                      <Link
                        to={item.to}
                        className={`inline-flex items-center text-white/70 hover:text-white transition-colors ${index === 0 ? 'ml-1' : ''}`}
                      >
                        {item.label}
                      </Link>
                    )}
                    {!isLast && <ChevronRight className="w-3.5 h-3.5 text-white/30" />}
                  </span>
                );
              })}
            </nav>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white mb-2 leading-tight">
              {title}
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-300 to-accent-400 rounded-full mx-auto lg:mx-0" />
          </div>

          {/* Right: Description */}
          {description && (
            <div className="flex-1 lg:max-w-md">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed text-center lg:text-left lg:border-l lg:border-white/15 lg:pl-8">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}