import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center justify-center flex-wrap gap-1.5 text-sm mb-6">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-1.5">
            {index === 0 && <Home className="w-3.5 h-3.5 text-slate-400 dark:text-surface-500" />}
            {isLast ? (
              <span className="font-medium text-primary-500 dark:text-primary-400">{item.label}</span>
            ) : (
              <Link
                to={item.to}
                className="text-slate-500 dark:text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                {item.label}
              </Link>
            )}
            {!isLast && <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-surface-600" />}
          </span>
        );
      })}
    </nav>
  );
}
