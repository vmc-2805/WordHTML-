import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    if (isHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + '#' + id);
    }
  };

  const navLinks = [
    { id: 'features', label: 'Features' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'faq', label: 'FAQ' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-surface-900/95 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-surface-800' : 'bg-white/80 dark:bg-transparent backdrop-blur-sm'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Logo size="md" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-slate-600 dark:text-surface-300 hover:text-primary-500 dark:hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors ${
                isActive('/blog')
                  ? 'text-primary-500 dark:text-primary-400'
                  : 'text-slate-600 dark:text-surface-300 hover:text-primary-500 dark:hover:text-white'
              }`}
            >
              Blog
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-surface-800 transition-colors text-slate-500 dark:text-surface-400 hover:text-primary-500 dark:hover:text-white"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-surface-800 transition-colors text-slate-500 dark:text-surface-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-surface-900/95 backdrop-blur-md border-t border-slate-200 dark:border-surface-800">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left py-2 text-slate-600 dark:text-surface-300 hover:text-primary-500 dark:hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left py-2 text-slate-600 dark:text-surface-300 hover:text-primary-500 dark:hover:text-white transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
