import { FileText, ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from './PageLayout';

export default function Terms() {
  return (
    <PageLayout title="Terms of Use" icon={FileText}>
      <div className="space-y-8 text-slate-700 dark:text-surface-300 text-sm sm:text-base leading-relaxed">
        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-surface-500">
          <Calendar className="w-3.5 h-3.5" />
          Last updated: August 20, 2026
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h3>
          <p className="mb-4">
            By accessing and using Word HTML Editor ("the Service"), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you may not use the Service.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">2. Description of Service</h3>
          <p className="mb-4">
            Word HTML Editor is a free, browser-based tool that allows users to convert Word documents and rich text content into clean, semantic HTML code. The Service operates entirely client-side within your web browser.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">3. User Responsibilities</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>You are responsible for the content you paste, upload, or process using the Service.</li>
            <li>You agree not to use the Service for any unlawful purpose.</li>
            <li>You must not attempt to reverse-engineer, decompile, or extract source code from the Service.</li>
            <li>You agree not to introduce malware or harmful code through the Service.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">4. Intellectual Property</h3>
          <p className="mb-4">
            The Service, including its design, code, and features, is owned by Word HTML Editor and protected by intellectual property laws. You may not copy, modify, distribute, or reverse-engineer any part of the Service without explicit written permission.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">5. Content Ownership</h3>
          <p className="mb-4">
            You retain full ownership of all content you process through the Service. We do not store, collect, or have access to any of your documents or data. All processing happens locally in your browser.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">6. Disclaimer of Warranties</h3>
          <p className="mb-4">
            The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or completely secure.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">7. Limitation of Liability</h3>
          <p className="mb-4">
            In no event shall Word HTML Editor be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">8. Changes to Terms</h3>
          <p className="mb-4">
            We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting. Your continued use of the Service constitutes acceptance of the updated terms.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">9. Contact</h3>
          <p>
            If you have questions about these Terms of Use, please contact us through our{' '}
            <Link to="/contact" className="text-primary-500 hover:text-primary-600 dark:text-primary-400 underline">Contact page</Link>.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
