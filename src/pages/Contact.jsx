import { useState } from 'react';
import { Mail, ArrowLeft, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from './PageLayout';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <PageLayout title="Contact Us" icon={Mail}>
      <div className="space-y-8 text-slate-700 dark:text-surface-300 text-sm sm:text-base leading-relaxed">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <p className="text-lg text-slate-600 dark:text-surface-400">
          Have a question, suggestion, or need help? We'd love to hear from you.
        </p>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
          <div className="flex items-start gap-4 p-5 rounded-xl bg-primary-50 dark:bg-primary-500/5 border border-primary-100 dark:border-primary-500/10">
            <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-primary-500 dark:text-primary-400" />
            </div>
            <div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white block mb-1">Email Us</span>
              <span className="text-sm text-slate-500 dark:text-surface-400">support@wordhtmleditor.com</span>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-xl bg-accent-50 dark:bg-accent-500/5 border border-accent-100 dark:border-accent-500/10">
            <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-500/10 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-accent-600 dark:text-accent-400" />
            </div>
            <div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white block mb-1">Response Time</span>
              <span className="text-sm text-slate-500 dark:text-surface-400">Within 24-48 hours</span>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="not-prose">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Send Us a Message</h3>

          {sent && (
            <div className="flex items-center gap-2 p-4 mb-6 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
              <CheckCircle className="w-5 h-5" />
              Thank you! Your message has been sent successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-surface-300 mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-slate-900 dark:text-white text-sm outline-none focus:border-primary-400 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-surface-300 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-slate-900 dark:text-white text-sm outline-none focus:border-primary-400 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-surface-300 mb-1.5">Subject</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-slate-900 dark:text-white text-sm outline-none focus:border-primary-400 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-surface-300 mb-1.5">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-slate-900 dark:text-white text-sm outline-none focus:border-primary-400 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all resize-none"
                placeholder="Tell us more..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:scale-105"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
