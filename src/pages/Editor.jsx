import EditorSection from '../components/EditorSection';
import PageHeader from '../components/PageHeader';
import { useSEO } from '../hooks/useSEO';

export default function Editor() {
  useSEO({
    title: 'Editor - Word to HTML Converter | WordConvertHTML',
    description: 'Use our free online editor to convert Word documents to clean HTML or edit HTML directly. Real-time two-way sync between Word and HTML.',
    canonical: 'https://wordconverthtml.com/editor'
  });

  return (
    <section className="pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 min-h-screen bg-slate-50 dark:bg-surface-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-10 sm:mb-12">
          <PageHeader
            items={[
              { label: 'Home', to: '/' },
              { label: 'Editor' }
            ]}
            title="Word to HTML Editor"
            description="Paste your Word content or edit HTML directly. Real-time two-way sync."
          />
        </div>

        <EditorSection />
      </div>
    </section>
  );
}
