import EditorSection from '../components/EditorSection';
import { useSEO } from '../hooks/useSEO';

export default function Editor() {
  useSEO({
    title: 'Editor - Word to HTML Converter | WordConvertHTML',
    description: 'Use our free online editor to convert Word documents to clean HTML or edit HTML directly. Real-time two-way sync between Word and HTML.',
    canonical: 'https://wordconverthtml.com/editor'
  });

  return (
    <section className="pt-16 h-screen bg-slate-50 dark:bg-surface-950 overflow-hidden">
      <div className="h-full max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-3">
        <EditorSection />
      </div>
    </section>
  );
}