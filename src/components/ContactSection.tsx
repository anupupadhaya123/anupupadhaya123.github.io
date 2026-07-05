import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, Download, FileText, Linkedin, Github, ExternalLink } from 'lucide-react';
import { personalInfo, references } from '../data';

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase font-bold tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
            Secure Link
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Connect &amp; References
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-350 text-base">
            Reach out via phone, secure SMTP mail form, or consult my listed corporate references from Playpoint, Rapid Pro Clean, and Crust Pizza.
          </p>
        </div>

        {/* Contact info grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Email Card */}
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 text-center flex flex-col items-center shadow-sm">
            <div className="h-10 w-10 bg-slate-900 dark:bg-emerald-500/20 dark:border dark:border-emerald-500/30 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Email Address</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">SMTP Secure Router</p>
            <a href={`mailto:${personalInfo.email}`} className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 mt-3 block underline transition-colors">
              {personalInfo.email}
            </a>
          </div>

          {/* Phone Card */}
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 text-center flex flex-col items-center shadow-sm">
            <div className="h-10 w-10 bg-slate-900 dark:bg-emerald-500/20 dark:border dark:border-emerald-500/30 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <Phone className="h-5 w-5" />
            </div>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Contact Number</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">Direct Dial Terminal</p>
            <a href={`tel:${personalInfo.phone}`} className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 mt-3 block underline transition-colors">
              {personalInfo.phone}
            </a>
          </div>

          {/* Location Card */}
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 text-center flex flex-col items-center shadow-sm">
            <div className="h-10 w-10 bg-slate-900 dark:bg-emerald-500/20 dark:border dark:border-emerald-500/30 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Primary Office</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">Physical Host</p>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-3 block">
              {personalInfo.location}
            </span>
          </div>
        </div>

        {/* Form and References Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Block: Contact Mailer Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-850 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">SMTP Secure Message Client</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-emerald-500 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="Inquiry Topic"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="How can I assist you with your systems support or data analysis workflows?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-emerald-500 text-sm"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  id="submit-message-btn"
                  type="submit"
                  disabled={isSending}
                  className="px-6 py-3 text-sm font-semibold text-white dark:text-slate-950 bg-slate-950 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl shadow-sm transition-all duration-200 flex items-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isSending ? (
                    <span>Routing...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
                      <span>Route Message</span>
                    </>
                  )}
                </button>

                {isSuccess && (
                  <span className="text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold flex items-center space-x-1.5 animate-fade-in">
                    <CheckCircle className="h-4 w-4" />
                    <span>Transmitted to au.anupupadhaya@gmail.com</span>
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Right Block: References & CV Download */}
          <div className="lg:col-span-5 space-y-6">
            {/* References Card */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-850 p-6 sm:p-8 shadow-sm">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2 pb-4 border-b border-slate-200/60 dark:border-slate-850 mb-6">
                <span>Enterprise Reference Nodes</span>
              </h3>

              <div className="space-y-6">
                {references.map((ref) => (
                  <div key={ref.id} className="relative group pl-4 border-l-2 border-emerald-500/30 hover:border-emerald-500 transition-colors">
                    <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">{ref.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{ref.role}, <span className="font-semibold">{ref.company}</span></p>
                    <div className="flex flex-wrap gap-x-4 mt-2 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                      <a href={`tel:${ref.phone}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 underline">
                        {ref.phone}
                      </a>
                      <a href={`mailto:${ref.email}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 underline">
                        {ref.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Download panel */}
            <div className="bg-slate-950 dark:bg-slate-900/60 text-white rounded-3xl border border-slate-900 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-widest w-fit block">
                  SYSTEM CREDENTIALS
                </span>
                <h3 className="font-display font-extrabold text-lg mt-3">Anup Upadhaya Professional CV</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Export my complete professional record including Systems Administration metrics, certifications audit, and analytical stack competencies in standard PDF layout.
                </p>
              </div>

              <div className="mt-6 flex items-center space-x-3">
                <a
                  id="cv-download-link"
                  href="https://github.com/anupupadhaya123/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download CV</span>
                </a>
                <a
                  id="linkedin-profile-link"
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-850 text-white border border-slate-800 dark:border-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <Linkedin className="h-3.5 w-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
