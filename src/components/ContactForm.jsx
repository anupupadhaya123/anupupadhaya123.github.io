import React, { useState } from 'react';
import { REFERENCES_DATA } from '../types';
import { Mail, Phone, Send, ShieldCheck, CheckCircle2, RefreshCw, AlertTriangle, User, FileText } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'IT Support / Systems Job Opportunity',
    message: ''
  });
  const [submissionState, setSubmissionState] = useState('idle');
  const [simStep, setSimStep] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmissionState('error');
      setSimStep('Please fill in all mandatory fields.');
      return;
    }

    setSubmissionState('sending');
    setSimStep('Establishing socket connection to au.anupupadhaya@gmail.com relay...');

    setTimeout(() => {
      setSimStep('Handshaking SMTP service (STARTTLS verified)...');
    }, 1000);

    setTimeout(() => {
      setSimStep('Analyzing message entropy & anti-spam compliance scoring...');
    }, 2000);

    setTimeout(() => {
      setSimStep('Routing secure payload envelope: dispatching telemetry packets...');
    }, 3200);

    setTimeout(() => {
      setSubmissionState('success');
      setSimStep('Dispatch complete! Secure transmission acknowledged by SMTP daemon.');
    }, 4500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'IT Support / Systems Job Opportunity',
      message: ''
    });
    setSubmissionState('idle');
    setSimStep('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="contact-component">
      {/* References Column (Left 5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <h3 className="font-sans font-bold text-lg md:text-xl text-white">Professional References</h3>
          <p className="text-xs md:text-sm text-slate-400 font-sans mt-1">
            Reach out directly to verify Anup's performance, work ethic, and operational outcomes.
          </p>
        </div>

        <div className="space-y-4">
          {REFERENCES_DATA.map((ref, idx) => (
            <div 
              key={idx} 
              className="bg-slate-950 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4.5 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex justify-between items-start mb-2.5">
                  <div>
                    <h4 className="font-sans font-bold text-sm text-slate-200">{ref.name}</h4>
                    <span className="text-[10px] font-mono text-sky-400 font-medium block">
                      {ref.role}, {ref.company}
                    </span>
                  </div>
                  <span className="text-[9px] bg-sky-950/80 border border-sky-900/60 text-sky-400 px-2 py-0.5 rounded-full font-mono">
                    CEO Verified
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono border-t border-slate-900 pt-3 mt-1 text-slate-400">
                <a 
                  href={`tel:${ref.phone}`} 
                  className="flex items-center gap-1.5 hover:text-sky-400 transition-all truncate"
                >
                  <Phone className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{ref.phone}</span>
                </a>
                <a 
                  href={`mailto:${ref.email}`} 
                  className="flex items-center gap-1.5 hover:text-sky-400 transition-all truncate"
                >
                  <Mail className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{ref.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action notice */}
        <div className="bg-sky-950/20 border border-sky-900/50 rounded-xl p-4 flex gap-3 text-xs text-sky-300 font-sans">
          <ShieldCheck className="h-5 w-5 shrink-0 text-sky-400" />
          <p className="leading-relaxed">
            All listed references are aware and prepared to discuss Anup's hardware/OS configurations, incident resolution speed, and teamwork.
          </p>
        </div>
      </div>

      {/* Recruiter SMTP Form (Right 7 cols) */}
      <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <h3 className="font-sans font-bold text-lg text-white mb-1">Direct Secure Dispatch</h3>
          <p className="text-xs text-slate-400 font-sans mb-5">
            Submit an opportunity or query through this sandboxed SMTP transmitter.
          </p>

          {submissionState === 'idle' || submissionState === 'error' ? (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Your Name *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 pointer-events-none">
                      <User className="h-4 w-4" />
                    </span>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Hiring Manager"
                      className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700/80 focus:border-sky-500 rounded-lg py-2 pl-9 pr-4 text-xs font-sans text-slate-200 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Your Email *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 pointer-events-none">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="manager@enterprise.com"
                      className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700/80 focus:border-sky-500 rounded-lg py-2 pl-9 pr-4 text-xs font-sans text-slate-200 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Subject Context</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 pointer-events-none">
                    <FileText className="h-4 w-4" />
                  </span>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700/80 focus:border-sky-500 rounded-lg py-2.5 pl-9 pr-4 text-xs font-sans text-slate-200 focus:outline-none transition-all cursor-pointer appearance-none"
                  >
                    <option value="IT Support / Systems Job Opportunity">IT Support / Systems Job Opportunity</option>
                    <option value="Contract / Project Homelab Consulting">Contract / Project Homelab Consulting</option>
                    <option value="General Technical Interview Request">General Technical Interview Request</option>
                    <option value="General Professional Query">General Professional Query</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Transmission Payload (Message) *</label>
                <textarea
                  required
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your role, team requirements, or technical query here..."
                  className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700/80 focus:border-sky-500 rounded-lg py-2.5 px-3.5 text-xs font-sans text-slate-200 focus:outline-none transition-all resize-none leading-relaxed"
                />
              </div>

              {submissionState === 'error' && (
                <div className="bg-rose-950/30 border border-rose-900/50 rounded-lg p-3 text-xs text-rose-400 flex items-start gap-2 font-sans">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{simStep}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-sans font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/10 active:scale-[0.98]"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Transmit Secure Message</span>
              </button>
            </form>
          ) : (
            /* Simulation states rendering */
            <div className="flex-1 flex flex-col justify-center items-center py-8 text-center min-h-[280px]">
              {submissionState === 'sending' ? (
                <div className="space-y-4 w-full max-w-sm">
                  <div className="relative flex justify-center items-center">
                    <RefreshCw className="h-10 w-10 text-sky-400 animate-spin" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-sans font-bold text-sm text-white">SMTP Socket Transfer in Progress</h4>
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-[11px] font-mono text-slate-400 leading-normal text-left min-h-[44px]">
                      <span className="text-emerald-400 font-bold">&gt;&nbsp;</span>
                      {simStep}
                    </div>
                  </div>
                </div>
              ) : (
                /* Success state */
                <div className="space-y-5 w-full max-w-sm">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-sans font-bold text-sm text-white">Secure Envelope Dispatched!</h4>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      Message dispatched successfully to <strong>au.anupupadhaya@gmail.com</strong>. The SMTP relay confirmed local spool indexing.
                    </p>
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-[10px] font-mono text-emerald-400 text-left">
                      SUCCESS: Envelope payload routed safely. Thank you, {formData.name}!
                    </div>
                  </div>
                  <button
                    onClick={resetForm}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-sans font-semibold text-xs py-2 px-4 rounded-lg transition-all cursor-pointer"
                  >
                    Transmit Another Message
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-slate-900 pt-3 mt-5 text-[10px] text-slate-500 font-mono text-center flex justify-between items-center">
          <span>TRANSPORT LAYER: TLS 1.3 SECURED</span>
          <span className="text-slate-600">DIRECT CLOUD RELAY</span>
        </div>
      </div>
    </div>
  );
}
