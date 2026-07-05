import React from 'react';
import { ArrowUp, Shield, Heart } from 'lucide-react';
import { personalInfo } from '../data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-900 pb-8 mb-8">
          {/* Brand/Signature */}
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="font-display font-bold text-slate-200 text-sm tracking-tight">
              {personalInfo.name}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Secure Domain
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:text-white transition-colors"
            >
              Contact Email
            </a>
          </div>

          {/* Back to top button */}
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg border border-slate-800 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Legal and system info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[10px]">
          <div>
            <span>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved. </span>
            <span className="block sm:inline sm:ml-2">| Crafted with care for professional audit.</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Powered by React 19 &amp; Tailwind CSS</span>
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
