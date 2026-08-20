export default function Logo({ size = 'md', className = '' }) {
  const sizes = {
    sm: { wrapper: 'w-7 h-7', svg: 28, text: 'text-base' },
    md: { wrapper: 'w-8 h-8', svg: 32, text: 'text-lg' },
    lg: { wrapper: 'w-10 h-10', svg: 40, text: 'text-xl' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${s.wrapper} relative shrink-0`}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="64" height="64" rx="14" fill="#0E5952"/>
          <rect x="2" y="2" width="60" height="60" rx="12" fill="url(#logo-bg)" opacity="0.15"/>
          <path d="M16 20 L22 44 L28 20" stroke="#EFEF4B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M36 20 L42 44 L48 20" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M32 32 L38 32" stroke="#EFEF4B" strokeWidth="3" strokeLinecap="round"/>
          <path d="M32 38 L38 38" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="52" cy="20" r="3" fill="#EFEF4B"/>
          <defs>
            <linearGradient id="logo-bg" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0%" stopColor="#EFEF4B"/>
              <stop offset="100%" stopColor="white"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className={`${s.text} font-bold tracking-tight text-primary-500 dark:text-primary-400`}>
        WordHTML<span className="text-accent-500 dark:text-accent-300">Editor</span>
      </span>
    </div>
  );
}
