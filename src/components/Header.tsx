import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Terminal, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { personalInfo } from '../data';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const menuItems = [
    { label: 'Overview', id: 'overview' },
    { label: 'Capabilities', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'SysAdmin Lab', id: 'tools' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === 'dark'
            ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-900 shadow-md'
            : 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Title */}
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-slate-900 dark:bg-emerald-500/20 dark:border dark:border-emerald-500/30 flex items-center justify-center text-white shadow-md">
              <Shield className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <span className="font-display font-bold text-slate-900 dark:text-white tracking-tight text-lg block">
                {personalInfo.name}
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block leading-none font-semibold">
                SYSTEMS &amp; IT SUPPORT
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA & Theme toggle Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            <button
              id="cta-terminal-btn"
              onClick={() => scrollToSection('terminal')}
              className="px-3 py-1.5 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:bg-slate-100 dark:hover:bg-slate-850 transition-all duration-200 flex items-center space-x-1.5"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Launch CLI</span>
            </button>
            <button
              id="cta-contact-btn"
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 text-sm font-medium text-white dark:text-slate-950 bg-slate-950 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg shadow-sm transition-all duration-200 flex items-center space-x-1 cursor-pointer"
            >
              <span>Connect</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Navigation controls */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Theme Toggle Mobile */}
            <button
              id="theme-toggle-mobile-btn"
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className={`md:hidden border-b shadow-lg px-4 pt-2 pb-6 space-y-1 ${
            theme === 'dark'
              ? 'bg-slate-950 border-slate-900 text-slate-300'
              : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left px-4 py-3 text-base font-medium hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 flex flex-col space-y-2 px-4">
            <button
              id="mobile-cta-cli"
              onClick={() => scrollToSection('terminal')}
              className="w-full py-2.5 text-center text-sm font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:bg-slate-100 dark:hover:bg-slate-850 flex items-center justify-center space-x-1.5"
            >
              <Terminal className="h-4 w-4" />
              <span>Interactive CLI</span>
            </button>
            <button
              id="mobile-cta-connect"
              onClick={() => scrollToSection('contact')}
              className="w-full py-2.5 text-center text-sm font-medium text-white dark:text-slate-950 bg-slate-950 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg shadow-sm flex items-center justify-center space-x-1"
            >
              <span>Connect Now</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
