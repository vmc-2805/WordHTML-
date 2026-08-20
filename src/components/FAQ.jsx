import { useState, useRef, useEffect } from 'react'
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react'
import { useStaggerReveal } from '../hooks/useScrollReveal'

const faqData = [
  {
    category: 'General',
    question: 'What is Word HTML Editor?',
    answer: 'Word HTML Editor is a free online tool that lets you convert Word documents to clean, semantic HTML code. You can paste content directly from Microsoft Word or upload .docx files, edit them in a WYSIWYG editor, and export clean HTML.'
  },
  {
    category: 'General',
    question: 'Is this tool free to use?',
    answer: 'Yes, Word HTML Editor is completely free to use with no sign-up required. There are no hidden fees or premium tiers. All features are available to everyone.'
  },
  {
    category: 'How to Use',
    question: 'How do I paste content from Microsoft Word?',
    answer: 'Simply copy your content from Microsoft Word (Ctrl+C) and paste it into the Word Editor panel (Ctrl+V). The editor will automatically convert the Word formatting to HTML. You can then use the cleaning tools to remove any unwanted markup.'
  },
  {
    category: 'How to Use',
    question: 'Can I upload .docx files directly?',
    answer: 'Yes! Click the "Upload DOCX" button in the editor toolbar to upload a .docx file directly. The file content will be loaded into the editor where you can modify and clean it before exporting.'
  },
  {
    category: 'Features',
    question: 'What cleaning tools are available?',
    answer: 'We offer 9 individual cleaning tools: Remove Inline Styles, Remove Empty Tags, Remove Classes, Remove IDs, Remove Comments, Remove Extra Whitespace, Remove Word Markup, Remove Spans, and Convert to Semantic HTML. You can also use "Clean All" to apply all cleaning operations at once.'
  },
  {
    category: 'Privacy',
    question: 'Is my data secure?',
    answer: 'Absolutely. All processing happens entirely in your browser. No data is sent to any server. Your documents never leave your device, ensuring complete privacy and security.'
  },
  {
    category: 'Privacy',
    question: 'Can I use this on mobile devices?',
    answer: 'Yes, Word HTML Editor is fully responsive and works on all devices including smartphones and tablets. However, for the best editing experience, we recommend using a desktop browser.'
  }
]

const categoryColors = {
  'General': 'bg-primary-500',
  'How to Use': 'bg-accent-500',
  'Features': 'bg-emerald-500',
  'Privacy': 'bg-blue-500',
}

function FaqItem({ faq, index, isOpen, onToggle }) {
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  const colorBar = categoryColors[faq.category] || 'bg-primary-500'

  return (
    <div
      className={`group rounded-2xl border transition-all duration-500 ${
        isOpen
          ? 'border-primary-300 dark:border-primary-700/60 bg-white dark:bg-surface-900/80 shadow-xl shadow-primary-500/5'
          : 'border-slate-200 dark:border-surface-700/50 bg-white dark:bg-surface-900/40 hover:border-primary-200 dark:hover:border-primary-800/50 hover:shadow-md'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 sm:p-6 text-left"
      >
        {/* Number */}
        <span className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
          isOpen
            ? 'bg-primary-500 text-white scale-110'
            : 'bg-slate-100 dark:bg-surface-800 text-slate-400 dark:text-surface-500 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/10 group-hover:text-primary-500'
        }`}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex-1 min-w-0">
         
          {/* Question */}
          <span className={`block text-sm sm:text-base font-semibold transition-colors duration-200 ${
            isOpen ? 'text-primary-600 dark:text-primary-400' : 'text-slate-900 dark:text-white'
          }`}>
            {faq.question}
          </span>
        </div>

        {/* Chevron */}
        <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-primary-500 text-white rotate-180 scale-110'
            : 'bg-slate-100 dark:bg-surface-800 text-slate-400 dark:text-surface-500 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/10'
        }`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {/* Answer with smooth height transition */}
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef} className="px-5 sm:px-6 pb-5 sm:pb-6">
          <div className="ml-14">
            <div className="h-px bg-gradient-to-r from-primary-200 dark:from-primary-800/50 to-transparent mb-4" />
            <p className="text-sm sm:text-base text-slate-600 dark:text-surface-400 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [ref, visibleItems] = useStaggerReveal(faqData.length, { staggerDelay: 80 })

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index)

  const categories = [...new Set(faqData.map(f => f.category))]

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-surface-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-3">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full mx-auto mb-4" />
          <p className="text-lg text-slate-600 dark:text-surface-400 max-w-xl mx-auto">
            Everything you need to know about Word HTML Editor.
          </p>

        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqData.map((faq, idx) => (
            <div
              key={idx}
              className={`transition-all duration-600 ${
                visibleItems.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <FaqItem
                faq={faq}
                index={idx}
                isOpen={openIndex === idx}
                onToggle={() => toggle(idx)}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-12">
          <p className="text-slate-500 dark:text-surface-400 text-sm mb-3">
            Still have questions?
          </p>
          <a
            href="#editor"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            Try It Yourself
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
