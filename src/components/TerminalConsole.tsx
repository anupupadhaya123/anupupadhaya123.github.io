import React, { useState, useRef, useEffect } from 'react';
import { Terminal, RefreshCw, AlertCircle, PlayCircle, Minimize2 } from 'lucide-react';
import { personalInfo, skillCategories, experiences, educationHistory, projects, achievements, references } from '../data';

interface LogLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
}

export default function TerminalConsole() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogLine[]>([
    { text: 'Microsoft Windows [Version 10.0.22621.1702]', type: 'system' },
    { text: '(c) Microsoft Corporation. All rights reserved.', type: 'system' },
    { text: '', type: 'system' },
    { text: 'Initialising Active Directory secure sandbox link...', type: 'system' },
    { text: 'Connecting to domain: DarwinNepal.onmicrosoft.com [DC IP: 10.0.2.14]', type: 'success' },
    { text: 'Connection secured. Host status: ONLINE (SLA 100%)', type: 'success' },
    { text: 'Welcome to Anup Upadhaya\'s portfolio console. Type "help" to start, or simply ask any question (e.g. "what are your skills?") to chat with my virtual portfolio assistant!', type: 'system' },
  ]);

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Focus input on initial mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToSection = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleCommand = (commandStr: string) => {
    const cmd = commandStr.trim().toLowerCase();
    if (!cmd) return;

    // Add to logs and save history
    const newLogs = [...logs, { text: `C:\\Users\\Guest> ${commandStr}`, type: 'input' as const }];
    const updatedHistory = [...history, commandStr];
    setHistory(updatedHistory);
    setHistoryIndex(-1); // Reset index for subsequent entries

    switch (cmd) {
      case 'help':
        newLogs.push(
          { text: '=== AVAILABLE SYSTEM COMMANDS ===', type: 'system' },
          { text: '  about      - Display background profile summary on Anup Upadhaya', type: 'output' },
          { text: '  sandbox    - View details of the Enterprise Active Directory Sandbox project', type: 'output' },
          { text: '  skills     - List active technical systems capabilities and analytical stack', type: 'output' },
          { text: '  experience - List recent career roles and key service support outcomes', type: 'output' },
          { text: '  education  - Display academic qualifications and achievements', type: 'output' },
          { text: '  projects   - Show other custom technical and data science portfolio builds', type: 'output' },
          { text: '  contact    - Print professional support contact coordinates', type: 'output' },
          { text: '  references - List active professional and CEO references', type: 'output' },
          { text: '  clear      - Clear terminal log memory buffer', type: 'output' },
          { text: '  matrix     - Run a quick terminal memory simulation', type: 'output' }
        );
        break;

      case 'about':
        newLogs.push(
          { text: '=== IDENTITY INQUIRY: ANUP UPADHAYA ===', type: 'system' },
          { text: `Profile: ${personalInfo.about}`, type: 'output' },
          { text: `Current Base: ${personalInfo.location}`, type: 'output' },
          { text: `Availability: ${personalInfo.availability} Engagement`, type: 'success' },
          { text: `Interests: ${personalInfo.interests.join(', ')}`, type: 'output' }
        );
        break;

      case 'sandbox':
        newLogs.push(
          { text: '=== PROJECT LOGS: ENTERPRISE SANDBOX REBUILD ===', type: 'system' },
          { text: '• Topology Deployment:', type: 'success' },
          { text: '  - Active Directory DS setup on isolated Windows Server 2022', type: 'output' },
          { text: '  - Workstation Client binding: Windows 11 Enterprise Node', type: 'output' },
          { text: '  - Domain Namespace: DarwinNepal.onmicrosoft.com', type: 'output' },
          { text: '  - Primary DC IPv4 Routing: 10.0.2.14 / Subnet mask: 255.255.255.0', type: 'output' },
          { text: '• Configuration Hardening & Features:', type: 'success' },
          { text: '  - Automated Endpoint Patch Management via Action1 Cloud Console integration', type: 'output' },
          { text: '  - DNS server routing config directly binding workstation queries', type: 'output' },
          { text: '  - Bypass offline creation procedures: (OOBE\\BYPASSNRO)', type: 'output' },
          { text: '  - Local loop diagnostics verified utilizing ICMP Ping utilities', type: 'output' }
        );
        scrollToSection('projects');
        break;

      case 'skills':
        newLogs.push({ text: '=== CAPABILITY INVENTORY ===', type: 'system' });
        skillCategories.forEach(cat => {
          newLogs.push({ text: `[${cat.name}]`, type: 'success' });
          cat.skills.forEach(s => {
            newLogs.push({ text: `  • ${s.name} - Proficiency: ${s.level}% (${s.details})`, type: 'output' });
          });
        });
        scrollToSection('skills');
        break;

      case 'experience':
        newLogs.push({ text: '=== SERVICE OUTCOMES & RECENT TIMELINE ===', type: 'system' });
        experiences.forEach(exp => {
          newLogs.push(
            { text: `• ${exp.role} at ${exp.company} (${exp.period})`, type: 'success' },
            { text: `  Highlights:`, type: 'system' }
          );
          exp.highlights.forEach(highlight => {
            newLogs.push({ text: `    - ${highlight}`, type: 'output' });
          });
        });
        scrollToSection('experience');
        break;

      case 'education':
        newLogs.push({ text: '=== ACADEMIC TRANSCRIPTS & CERTIFICATIONS ===', type: 'system' });
        educationHistory.forEach(edu => {
          newLogs.push(
            { text: `🎓 ${edu.degree}`, type: 'success' },
            { text: `   ${edu.school} | ${edu.period} (${edu.grade})`, type: 'output' },
            { text: `   Details: ${edu.details}`, type: 'system' }
          );
        });
        newLogs.push({ text: '=== VERIFIED TECHNICAL CREDENTIALS ===', type: 'system' });
        achievements.forEach(ach => {
          newLogs.push(
            { text: `🏆 ${ach.title} [${ach.badgeText}]`, type: 'success' },
            { text: `   Issuer: ${ach.issuer} | Date: ${ach.date}`, type: 'output' },
            { text: `   Description: ${ach.description}`, type: 'system' }
          );
        });
        scrollToSection('experience');
        break;

      case 'projects':
        newLogs.push({ text: '=== CUSTOM SYSTEMS & DATA PORTFOLIO ===', type: 'system' });
        projects.forEach(p => {
          newLogs.push(
            { text: `🚀 ${p.title}`, type: 'success' },
            { text: `   Description: ${p.description}`, type: 'output' },
            { text: `   Stack: ${p.tags.join(', ')}`, type: 'system' },
            { text: `   Source: ${p.githubUrl}`, type: 'output' }
          );
        });
        scrollToSection('projects');
        break;

      case 'contact':
        newLogs.push(
          { text: '=== SYSTEM RECOVERY CONTACT COORDINATES ===', type: 'system' },
          { text: `  Email  : ${personalInfo.email}`, type: 'output' },
          { text: `  Phone  : ${personalInfo.phone}`, type: 'output' },
          { text: `  Office : ${personalInfo.location}`, type: 'output' },
          { text: `  GitHub : ${personalInfo.github}`, type: 'output' },
          { text: `  LinkIn : ${personalInfo.linkedin}`, type: 'output' }
        );
        scrollToSection('contact');
        break;

      case 'references':
        newLogs.push({ text: '=== PROFESSIONAL REFEREE CONTEXTS ===', type: 'system' });
        references.forEach(ref => {
          newLogs.push(
            { text: `👤 ${ref.name} - ${ref.role}`, type: 'success' },
            { text: `   Company: ${ref.company}`, type: 'output' },
            { text: `   Contact: Phone: ${ref.phone} | Email: ${ref.email}`, type: 'output' }
          );
        });
        scrollToSection('contact');
        break;

      case 'clear':
        setLogs([]);
        setInput('');
        return;

      case 'matrix':
        newLogs.push(
          { text: '01000101 01001110 01010100 01000101 01010010 01010000 01010010 01001001 01010011 01000101', type: 'system' },
          { text: 'SYSTEM: GPO and AD deployment routines verified.', type: 'success' },
          { text: 'STATUS: Operational Excellence Award logged.', type: 'success' },
          { text: 'SECURITY: Action1 security patch sweep complete.', type: 'success' }
        );
        break;

      default: {
        const lowercaseInput = commandStr.toLowerCase();
        let response = "";
        let foundMatch = true;

        if (/hello|hi|hey|greetings|namaste|yo/i.test(lowercaseInput)) {
          response = "Hello there! I am Anup's automated Portfolio Chatbot. Ask me anything about his technical skills, projects, work experience, or contact coordinates!";
        } else if (/who are you|your name|who is anup|about anup|identity|bio/i.test(lowercaseInput)) {
          response = `Anup Upadhaya is a highly skilled System & Network Engineer and IT Support Professional based in Kathmandu, Nepal. He specializes in enterprise system architecture, Active Directory, network administration, and automated patch management.`;
        } else if (/skill|tech|stack|power|python|cisco|active directory|windows|system|server/i.test(lowercaseInput)) {
          response = "Anup has expertise across: 1) System Administration (Active Directory, GPO, DNS, Windows Server 2022); 2) Network Infrastructure (Cisco Routing, ICMP Diagnostics, LAN/WAN setup); and 3) Automation (PowerShell scripting, Action1 Cloud Endpoint Management). Type 'skills' to see the full technical breakdown!";
        } else if (/experience|job|career|work|history|past/i.test(lowercaseInput)) {
          response = "Anup has rich professional experience, having worked in key roles like IT Support Engineer & Analyst. He has driven operational support, patch compliance, and enterprise network setups. Type 'experience' to see detailed logs of his professional timeline!";
        } else if (/project|portfolio|sandbox|active directory sandbox/i.test(lowercaseInput)) {
          response = "Anup's flagship projects include a complete Enterprise Active Directory Sandbox featuring Domain Controllers, Workstations, and automated patch monitoring. He also built simulated Cisco enterprise networks. Type 'projects' or 'sandbox' to load details!";
        } else if (/contact|hire|email|phone|reach|linkedin|github|connect/i.test(lowercaseInput)) {
          response = `You can get in touch with Anup Upadhaya directly: Email: ${personalInfo.email} | Phone: ${personalInfo.phone} | LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github}. Type 'contact' to render the clean recovery card!`;
        } else if (/education|school|college|degree|qualification|grade|gpa/i.test(lowercaseInput)) {
          response = "Anup holds a Bachelor's degree in Information Technology with high academic honors. He also holds multiple verified credentials from industry leaders like Google. Type 'education' to view the full transcripts!";
        } else if (/location|where|live|kathmandu|nepal/i.test(lowercaseInput)) {
          response = "Anup is located in Kathmandu, Nepal, and is open to hybrid, on-site, and remote engagements.";
        } else if (/references|reference|ceo/i.test(lowercaseInput)) {
          response = "Anup has strong endorsements from senior industry professionals and corporate executives. Type 'references' to see verified contact credentials for his referees!";
        } else if (/chatbot|bot|ai|chat/i.test(lowercaseInput)) {
          response = "I am a simple custom chatbot built into Anup's terminal workspace to quickly assist visitors. You can ask me questions about his skills, education, experience, projects, or references!";
        } else {
          foundMatch = false;
        }

        if (foundMatch) {
          newLogs.push({
            text: `🤖 Portfolio Chatbot: ${response}`,
            type: 'success'
          });
        } else {
          newLogs.push({
            text: `'${cmd}' is not recognized as a standard system command.`,
            type: 'error'
          }, {
            text: `🤖 Portfolio Chatbot: I couldn't recognize that system command, but ask me about Anup's "skills", "experience", "education", "projects", or "contact" and I'll be happy to answer!`,
            type: 'system'
          });
        }
        break;
      }
    }

    setLogs(newLogs);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0) return;
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  };

  const presetCommands = ['help', 'about', 'sandbox', 'skills', 'experience', 'education', 'projects', 'contact', 'clear'];

  return (
    <div 
      onClick={() => inputRef.current?.focus()}
      className="bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm text-slate-300 w-full max-w-3xl mx-auto flex flex-col h-[420px] cursor-text relative z-10"
    >
      {/* Window Header */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <Terminal className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-400">cmd.exe - admin@DarwinNepalDC</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-700"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-slate-700"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="p-4 flex-1 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {logs.map((log, index) => (
          <div
            key={index}
            className={`${
              log.type === 'input'
                ? 'text-white font-semibold'
                : log.type === 'error'
                ? 'text-rose-400'
                : log.type === 'success'
                ? 'text-emerald-400'
                : log.type === 'system'
                ? 'text-slate-500'
                : 'text-slate-300'
            } leading-relaxed break-words`}
          >
            {log.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Preset Chips Quick Actions */}
      <div 
        onClick={(e) => e.stopPropagation()} // Prevent double trigger focusing on chips
        className="px-4 py-2 bg-slate-900/60 border-t border-slate-900 flex items-center space-x-2 overflow-x-auto whitespace-nowrap scrollbar-none"
      >
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider select-none">Quick:</span>
        {presetCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2 py-0.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-700/60 transition-colors cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Input Line */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
        <span className="text-emerald-400 select-none font-bold">C:\Users\Guest&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command or ask chatbot (e.g. 'what are your skills?')..."
          className="bg-transparent text-white focus:outline-none flex-1 border-none focus:ring-0 p-0 font-mono text-sm"
          autoFocus={true}
        />
      </div>
    </div>
  );
}
