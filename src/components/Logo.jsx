export default function Logo({ size = 'md', className = '' }) {
  const sizes = {
    sm: { width: 'w-24' },
    md: { width: 'w-52' },
    lg: { width: 'w-52' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center ${className}`}>
      <img src="/logo.png" alt="WordConvertHTML Logo" className={`${s.width} h-auto object-contain`} />
    </div>
  );
}
