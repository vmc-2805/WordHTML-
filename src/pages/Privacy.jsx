import { Shield, Calendar, Lock, Eye, Database, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from './PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import { useSEO } from '../hooks/useSEO';

export default function Privacy() {
  useSEO({
    title: 'Privacy Policy | WordConvertHTML',
    description: 'Read the Privacy Policy for WordConvertHTML. Your data is 100% secure - all processing happens in your browser, nothing is stored on servers.',
    canonical: 'https://wordconverthtml.com/privacy'
  });
  return (
    <PageLayout title="Privacy Policy" icon={Shield}>
      <div className="space-y-8 text-slate-700 dark:text-surface-300 text-sm sm:text-base leading-relaxed">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Privacy Policy' }
          ]}
        />

        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-surface-500">
          <Calendar className="w-3.5 h-3.5" />
          Last updated: August 20, 2026
        </div>

        {/* Key highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose">
          {[
            { icon: Lock, title: '100% Private', desc: 'No data leaves your browser' },
            { icon: Database, title: 'Zero Storage', desc: 'We store nothing on servers' },
            { icon: Globe, title: 'Client-side Only', desc: 'All processing in your browser' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl bg-primary-50 dark:bg-primary-500/5 border border-primary-100 dark:border-primary-500/10">
              <item.icon className="w-6 h-6 text-primary-500 dark:text-primary-400 mb-2" />
              <span className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</span>
              <span className="text-xs text-slate-500 dark:text-surface-400">{item.desc}</span>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">1. Information We Do NOT Collect</h3>
          <p className="mb-4">
            WordConvertHTML is designed with privacy as a core principle. We do <strong>not</strong> collect, store, or transmit any personal information, including:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Names, email addresses, or contact information</li>
            <li>Documents, text content, or file uploads</li>
            <li>Browsing history or usage analytics</li>
            <li>Cookies or tracking data</li>
            <li>IP addresses or device information</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">2. How the Service Works</h3>
          <p className="mb-4">
            All content processing happens entirely within your web browser using JavaScript. No data is ever sent to any server. When you close the browser tab, all data is gone. There is no backend server that receives or stores your content.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">3. Local Storage</h3>
          <p className="mb-4">
            The only data stored locally on your device is your dark mode preference, saved in your browser's localStorage. This data never leaves your device and is used solely to remember your theme preference between sessions.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">4. Third-Party Services</h3>
          <p className="mb-4">
            WordConvertHTML does not integrate with any third-party analytics, advertising, or tracking services. The only external resource loaded is Google Fonts for typography, which is subject to Google's own privacy policy.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">5. Open Source</h3>
          <p className="mb-4">
            WordConvertHTML is open source. You can verify our privacy claims by reviewing the source code. Transparency is fundamental to our commitment to user privacy.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">6. Children's Privacy</h3>
          <p className="mb-4">
            Since we do not collect any personal data, the Service is safe for users of all ages, including children under 13.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">7. Changes to This Policy</h3>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated revision date.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">8. Contact</h3>
          <p>
            If you have questions about this Privacy Policy, please visit our{' '}
            <Link to="/contact" className="text-primary-500 hover:text-primary-600 dark:text-primary-400 underline">Contact page</Link>.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
