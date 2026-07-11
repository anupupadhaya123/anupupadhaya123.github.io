import React, { useState, useEffect } from 'react';
import { 
  Terminal, ShieldCheck, Mail, Phone, MapPin, Award, Laptop, Clock, ChevronDown,
  Download, ArrowUp, Settings, X, FileText
} from 'lucide-react';
import Navbar from './components/Navbar';
import ActiveDirectorySandbox from './components/ActiveDirectorySandbox';
import Skills from './components/Skills';
import Experiences from './components/Experiences';
import Achievements from './components/Achievements';
import ContactForm from './components/ContactForm';

export default function App() {
  const [activeSection, setActiveSection] = useState('profile');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [localTime, setLocalTime] = useState('');
  
  // Custom CV/Resume download path states
  const [cvUrl, setCvUrl] = useState(() => localStorage.getItem('cv_url') || '/Anup_Upadhaya_CV.pdf');
  const [tempCvUrl, setTempCvUrl] = useState(cvUrl);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  // Dark/Light Theme selection
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('portfolio_theme');
    return saved ? saved === 'dark' : true; // Default to dark mode for high-craft tech mood
  });

  // Track state to html class list
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio_theme', 'light');
    }
  }, [darkMode]);

  // Local clock generator for Darwin (GMT+9.5) / Perth (GMT+8)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Darwin/NT Time (GMT+9.5)
      const options = {
        timeZone: 'Australia/Darwin',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setLocalTime(now.toLocaleTimeString('en-AU', options));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Monitor scroll height to show Back-to-Top and update Navbar tracking
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back to top button visibility
      setShowScrollTop(window.scrollY > 400);

      // Simple active section check based on scroll bounds
      const sections = ['profile', 'sandbox', 'skills', 'experience', 'education', 'credentials'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToElement = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen font-sans selection:bg-sky-500/30 selection:text-white antialiased relative transition-colors duration-300">
      {/* Dynamic ambient background gradients for high-craft tech mood */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[1200px] right-1/4 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-900/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-40 left-1/3 w-[450px] h-[450px] bg-indigo-500/5 dark:bg-indigo-900/10 rounded-full blur-[110px] pointer-events-none"></div>

      {/* Shared Navbar */}
      <Navbar activeSection={activeSection} darkMode={darkMode} onToggleTheme={() => setDarkMode(!darkMode)} />

      {/* HERO SECTION / GENERAL SUMMARY */}
      <header className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden" id="profile">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Bio Column (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-sky-600 dark:text-sky-400 font-semibold tracking-wider">
                <ShieldCheck className="h-4.5 w-4.5 text-sky-500 dark:text-sky-400 animate-pulse" />
                <span>AVAILABLE FOR FULL TIME / CONTRACT (DARWIN, NT)</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-tight">
                  Systems & IT Support <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 dark:from-sky-400 dark:via-blue-500 dark:to-indigo-400">
                    Engineer Specialist
                  </span>
                </h1>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-sans max-w-2xl mt-4">
                  Adaptable IT Support Graduate holding a <strong>Master of IT</strong> and <strong>Google IT Certifications</strong>. 
                  Passionate about active, hands-on systems configurations, Directory deployments, and cloud patch orchestration with a strong focus on high-reliability user workflows.
                </p>
              </div>

              {/* Contact/Bio Links */}
              <div className="flex flex-wrap gap-3.5 pt-2 items-center">
                <a 
                  href="mailto:au.anupupadhaya@gmail.com" 
                  className="bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-sans font-bold py-2.5 px-4 rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/10 hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" />
                  <span>Get In Touch</span>
                </a>
                <button 
                  onClick={() => scrollToElement('sandbox')}
                  className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-sans font-semibold py-2.5 px-4 rounded-lg flex items-center gap-2 transition-all cursor-pointer hover:-translate-y-0.5 shadow-sm"
                >
                  <Terminal className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                  <span>Interactive Homelab Sandbox</span>
                </button>
                
                <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:-translate-y-0.5 shadow-sm">
                  <a 
                    href={cvUrl}
                    download="Anup_Upadhaya_CV.pdf"
                    className="text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white text-xs font-sans font-semibold py-1.5 px-3 rounded-md flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Download PDF CV / Resume"
                  >
                    <Download className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Download PDF CV</span>
                  </a>
                  <button
                    onClick={() => {
                      setTempCvUrl(cvUrl);
                      setIsCvModalOpen(true);
                    }}
                    className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                    title="Configure Resume File Path / URL"
                  >
                    <Settings className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Grid with metadata chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200 dark:border-slate-900">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <div>
                    <span className="block text-[9px] uppercase font-mono text-slate-400 dark:text-slate-600">Location Base</span>
                    <span className="text-slate-800 dark:text-slate-300 font-sans font-medium">Darwin, NT, AU</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <div>
                    <span className="block text-[9px] uppercase font-mono text-slate-400 dark:text-slate-600">Darwin Local Time</span>
                    <span className="text-slate-800 dark:text-slate-300 font-mono font-medium">{localTime || 'GMT+9.5'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Phone className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <div>
                    <span className="block text-[9px] uppercase font-mono text-slate-400 dark:text-slate-600">Primary Contact</span>
                    <span className="text-slate-800 dark:text-slate-300 font-mono font-medium">0481239601</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Award className="h-4 w-4 text-amber-500" />
                  <div>
                    <span className="block text-[9px] uppercase font-mono text-slate-400 dark:text-slate-600">Certifications</span>
                    <span className="text-slate-800 dark:text-slate-300 font-sans font-medium">Google Certified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Showcase Bento Box (Right 5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800/80 p-6 rounded-3xl shadow-xl dark:shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl"></div>
                
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <div className="flex items-center gap-2">
                    <Laptop className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400">Systems Engineer Dossier</span>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-950/80 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                    <h3 className="font-sans font-bold text-sm text-slate-900 dark:text-slate-100">Domain Controller Setup</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1 leading-relaxed">
                      Engineered enterprise Windows environments with robust GPOs, DNS isolation, and user credentials security.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/80 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                    <h3 className="font-sans font-bold text-sm text-slate-900 dark:text-slate-100">Cloud Patch Orchestration</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1 leading-relaxed">
                      Leveraged Action1 Cloud Console for vulnerability audits, automated package rollups, and fleet security remediation.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/80 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                    <h3 className="font-sans font-bold text-sm text-slate-900 dark:text-slate-100">First-Contact Ticketing</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1 leading-relaxed">
                      Resolved 15+ weekly technical service tickets across hardware deployment, POS networks, and Microsoft 365 licensing.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    MURDOCH UNIVERSITY GRADUATE &bull; EXCELLENCE AWARD WINNER
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="flex justify-center mt-12 animate-bounce cursor-pointer" onClick={() => scrollToElement('sandbox')}>
          <ChevronDown className="h-6 w-6 text-slate-400 dark:text-slate-500 hover:text-slate-950 dark:hover:text-white transition-all" />
        </div>
      </header>

      {/* CORE INTERACTIVE LAB SANDBOX SECTION */}
      <section className="py-20 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900" id="sandbox">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 tracking-widest block mb-2">
              ACTIVE PORTFOLIO PROJECT DEMO
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
              Enterprise Active Directory Lab
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-sans mt-3">
              Anup built and tested an isolated enterprise sandbox containing Windows Server 2022, local DNS tables, offline bypass routines, and cloud-native endpoints. Test the routines below.
            </p>
          </div>

          <ActiveDirectorySandbox />
        </div>
      </section>

      {/* CORE SKILLS INVENTORY SECTION */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900" id="skills">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 tracking-widest block mb-2">
              TECHNICAL INVENTORY
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
              Skills Directory & Competencies
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-sans mt-3">
              Search and filter through Anup's domain qualifications, programming tools, and system diagnostics capability.
            </p>
          </div>

          <Skills />
        </div>
      </section>

      {/* PROFESSIONAL CHRONOLOGY SECTION */}
      <section className="py-20 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900" id="experience">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 tracking-widest block mb-2">
              PROFESSIONAL HISTORY
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
              Work Experience Timeline
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-sans mt-3">
              A record of roles across customer support, system provisioning, and enterprise workflow resolution.
            </p>
          </div>

          <Experiences />
        </div>
      </section>

      {/* ACADEMIC HISTORY & CREDENTIALS SECTION */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900" id="education">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 tracking-widest block mb-2">
              QUALIFICATIONS
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
              Education & Credentials
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-sans mt-3">
              Formal postgraduate education paired with industry-standard technical certifications and achievement tokens.
            </p>
          </div>

          <Achievements />
        </div>
      </section>

      {/* CONTACT & REFERENCES PORTAL */}
      <section className="py-20 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900" id="credentials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 tracking-widest block mb-2">
              VERIFICATION CENTER
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
              Contact & Reference Directory
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-sans mt-3">
              Inspect confirmed executive reference nodes or transmit a secure message directly to Anup Upadhaya.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <span className="font-sans font-bold text-slate-900 dark:text-white tracking-tight block">
                Anup Upadhaya
              </span>
              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase mt-1 block">
                IT Systems & Support Specialist &bull; Perth, WA / Darwin, NT
              </span>
            </div>

            <div className="flex items-center space-x-6 text-xs text-slate-500 dark:text-slate-400 font-sans">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-slate-950 dark:hover:text-white cursor-pointer transition-all">
                Return to Top
              </button>
              <a href="mailto:au.anupupadhaya@gmail.com" className="hover:text-slate-950 dark:hover:text-white transition-all">
                Direct Email
              </a>
              <a href="https://github.com/anupupadhaya123/" target="_blank" rel="noreferrer" className="hover:text-slate-950 dark:hover:text-white transition-all">
                GitHub Repo
              </a>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-900/80 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-slate-400 dark:text-slate-600">
            <span>
              &copy; 2026 Anup Upadhaya. All Rights Reserved.
            </span>
            <span>
              Designed for simple GitHub Pages (`github.io`) deployment.
            </span>
          </div>
        </div>
      </footer>

      {/* FLOAT BACK TO TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 bg-sky-500 hover:bg-sky-400 text-slate-950 p-2.5 rounded-lg shadow-lg hover:shadow-sky-500/20 transition-all cursor-pointer hover:-translate-y-1"
          title="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* CONFIGURE RESUME PATH MODAL */}
      {isCvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button 
              onClick={() => setIsCvModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5.5 w-5.5 text-sky-600 dark:text-sky-400" />
              <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white">Configure Resume CV Path</h3>
            </div>
            
            <p className="text-slate-500 dark:text-slate-400 text-xs font-sans leading-relaxed mb-4">
              Specify your CV PDF location. If you are deploying this app to your GitHub Pages repository (<code className="text-sky-600 dark:text-sky-300">github.io</code>), simply upload your PDF as <code className="text-sky-300">Anup_Upadhaya_CV.pdf</code> in the <code className="text-sky-300">public/</code> directory and keep the default local path. Alternatively, link to a shared Google Drive or Dropbox file URL.
            </p>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Resume file path or URL</label>
                <input
                  type="text"
                  value={tempCvUrl}
                  onChange={(e) => setTempCvUrl(e.target.value)}
                  placeholder="/Anup_Upadhaya_CV.pdf"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 focus:border-sky-500 rounded-lg py-2 px-3 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-none transition-all font-mono"
                />
              </div>
              
              <div className="flex gap-2 text-[10px] text-slate-400 dark:text-slate-500 font-mono bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/50 p-2 rounded-lg">
                <span className="text-amber-600 dark:text-amber-500">Note:</span>
                <span>The default local file is deployed at <code className="text-slate-500 dark:text-slate-300">/Anup_Upadhaya_CV.pdf</code>.</span>
              </div>
              
              <div className="flex gap-2.5 pt-2 justify-end">
                <button
                  onClick={() => setIsCvModalOpen(false)}
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-sans font-bold text-xs py-2 px-4 rounded-lg transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('cv_url', tempCvUrl);
                    setCvUrl(tempCvUrl);
                    setIsCvModalOpen(false);
                  }}
                  className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-sans font-bold text-xs py-2 px-4 rounded-lg transition-all cursor-pointer shadow-lg shadow-sky-500/10"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
