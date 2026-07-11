import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';

export default function Navbar({ activeSection, darkMode, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Profile', id: 'profile' },
    { label: 'Sandbox homelab', id: 'sandbox' },
    { label: 'Core Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Education', id: 'education' },
    { label: 'Credentials', id: 'credentials' },
  ];

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 py-3 shadow-lg' 
        : 'bg-transparent py-5'
    }`} id="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Brand/Name */}
          <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-sans font-bold text-slate-900 dark:text-white tracking-tight text-lg md:text-xl">
              Anup Upadhaya
            </span>
            <span className="font-mono text-[10px] text-sky-600 dark:text-sky-400 tracking-wide font-medium">
              SYSTEMS & IT SUPPORT ENGINEER
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1.5 xl:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold border border-sky-500/20 shadow-sm shadow-sky-500/5'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-900/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Social Links & Contact & Mode Toggle */}
          <div className="hidden md:flex items-center space-x-3 border-l border-slate-200 dark:border-slate-800 pl-4">
            <button
              onClick={onToggleTheme}
              className="text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 p-1.5 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-900/60 transition-all cursor-pointer mr-1"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-indigo-500" />}
            </button>
            <a 
              href="mailto:au.anupupadhaya@gmail.com" 
              className="text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 p-1.5 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-900/60 transition-all"
              title="Mail to Anup"
            >
              <Mail className="h-4.5 w-4.5" />
            </a>
            <a 
              href="https://github.com/anupupadhaya123/" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-900/60 transition-all"
              title="GitHub Profile"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/anup-upadhaya-86aa27183" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 p-1.5 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-900/60 transition-all"
              title="LinkedIn Profile"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>
          </div>

          {/* Mobile menu and mobile toggle button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onToggleTheme}
              className="text-slate-500 dark:text-slate-400 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-900 cursor-pointer"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-indigo-500" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-900 focus:outline-none cursor-pointer"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                activeSection === item.id
                  ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-l-4 border-sky-500 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center px-4">
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400"
            >
              {darkMode ? (
                <>
                  <Sun className="h-4 w-4 text-amber-400" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-indigo-500" /> Dark Mode
                </>
              )}
            </button>
            <div className="flex items-center space-x-3">
              <a 
                href="mailto:au.anupupadhaya@gmail.com"
                className="flex items-center text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
              >
                <Mail className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://github.com/anupupadhaya123/" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/anup-upadhaya-86aa27183" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
