import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, MessageSquare, X, Send, Sparkles, User, Download, Mail, 
  Phone, MapPin, Award, ExternalLink, ChevronRight, Minimize2, Check
} from 'lucide-react';

// ============================================================================
// Anup Upadhaya Profile Knowledge Base
// ============================================================================
const ANUP_PROFILE = {
  name: "Anup Upadhaya",
  title: "Systems & IT Support Engineer Specialist",
  location: "Darwin, Northern Territory, Australia (GMT+9.5)",
  email: "au.anupupadhaya@gmail.com",
  phone: "0481239601",
  availability: "Available for Full-Time and Contract roles in Darwin, NT, and across Australia.",
  education: {
    degree: "Master of Information Technology",
    institution: "Murdoch University",
    honors: "Academic Excellence Award Winner"
  },
  certifications: [
    "Google IT Support Professional Certificate",
    "ITIL v4 Service Management aligned"
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/anup-upadhaya-86aa27183",
    github: "https://github.com/anupupadhaya123",
    cv: "/Anup_Upadhaya_CV.pdf"
  },
  skills: {
    directory_os: "Active Directory (AD DS), Windows Server 2022, Windows 10/11 Pro, macOS, Ubuntu/Linux, Group Policy Objects (GPO), LDAP, DNS, DHCP.",
    cloud_saas: "Microsoft 365, Entra ID (Azure AD), Okta, Action1 Cloud Patch Management, AWS, Google Cloud Console.",
    networking_security: "VPN (GlobalProtect, Cisco AnyConnect), TCP/IP, VLAN, NAT Gateway, Firewall configuration, Wi-Fi troubleshooting, EDR host network isolation.",
    tools_scripting: "PowerShell, Bash, Python, Oracle VM VirtualBox, Jira Service Management, ServiceNow, Git/GitHub."
  },
  projects: [
    {
      name: "Enterprise Active Directory Lab",
      summary: "Isolated virtualized enterprise domain environment with Windows Server 2022 Standard (10.0.2.14) as Domain Controller, Windows 11 Pro client (10.0.2.15), GPO deployment, local DNS resolution, offline bypass routines, and Action1 Cloud Patch Console integration."
    },
    {
      name: "Autonomous IT Service Desk (AITSD)",
      summary: "AI-powered multi-agent ITIL v4 incident management system featuring automated triage, dynamic Impact x Urgency SLA matrix (P1-P4), support tier dispatching (Tier 1/2/3, SecOps CSIRT), 7 Knowledge Base runbooks, PowerShell/CLI diagnostic generation, and conversational troubleshooting."
    }
  ]
};

export default function AnupAIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi there! 👋 I'm **Anup AI**, Anup Upadhaya's personal portfolio assistant.\n\nAsk me anything about Anup's **Master of IT degree**, **Active Directory & AITSD projects**, **technical skills**, **certifications**, or **job availability in Darwin, NT**!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "What are Anup's key skills?",
    "Tell me about his Active Directory lab",
    "What is the Autonomous IT Service Desk?",
    "Is Anup available for hire in Darwin?",
    "How can I contact Anup or get his CV?"
  ];

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Built-in Natural Language & Knowledge Matcher
  const answerQuestion = (query) => {
    const q = query.toLowerCase().trim();

    // 1. Greetings
    if (q.match(/\b(hi|hello|hey|g'day|who are you|what is this)\b/)) {
      return (
        `Hello! I'm **Anup AI**, Anup Upadhaya's personal assistant.\n\n` +
        `Anup is a **Systems & IT Support Engineer Specialist** based in Darwin, NT with a **Master of IT** from Murdoch University.\n\n` +
        `You can ask me about his technical skills, homelab projects, certifications, or how to contact him!`
      );
    }

    // 2. Active Directory / Homelab Project
    if (q.includes("active directory") || q.includes("homelab") || q.includes("ad lab") || q.includes("server 2022") || q.includes("virtualbox")) {
      return (
        `🖥️ **Enterprise Active Directory Lab Project**:\n\n` +
        `Anup engineered an isolated, virtualized enterprise domain environment (` + "`DarwinNepal.onmicrosoft.com`" + `):\n` +
        `• **Domain Controller (DC01)**: Windows Server 2022 Standard running AD DS, DNS, DHCP, and GPOs (password complexity, desktop lock down, WinRM).\n` +
        `• **Workstation (WS11)**: Windows 11 Pro domain-joined with offline deployment bypass (` + "`OOBE\\BYPASSNRO`" + `).\n` +
        `• **Action1 Cloud Console**: Integrated cloud patch management agent for weekly vulnerability audits and automated rollups.\n\n` +
        `You can test this interactive sandbox directly in the **AI Tools & Sandbox** section above!`
      );
    }

    // 3. Autonomous IT Service Desk (AITSD)
    if (q.includes("service desk") || q.includes("aitsd") || q.includes("itil") || q.includes("autonomous") || q.includes("incident")) {
      return (
        `🛡️ **Autonomous IT Service Desk (AITSD)**:\n\n` +
        `Anup built an enterprise-grade multi-agent system aligned with **ITIL v4** standards:\n` +
        `• **Triage Agent**: Distinguishes break/fix incidents vs service requests, technical domain, and extracts technical entities (BSOD codes, hex errors, IPs).\n` +
        `• **SLA Matrix Agent**: Computes Impact x Urgency to assign P1 Critical to P4 Low with automated response/resolution timers.\n` +
        `• **Tier Dispatcher**: Routes to Tier 1 Desk, Tier 2 Desktop, Tier 3 Infra, or SecOps CSIRT with emergency on-call paging.\n` +
        `• **Remediation Agent**: Matches 7 production KB runbooks with exact PowerShell/CLI diagnostic commands.\n` +
        `• **Live Conversational Chat**: Users can chat directly with the AI assistant to troubleshoot step-by-step.\n\n` +
        `Try it right now in the **AI Tools & Sandbox** section!`
      );
    }

    // 4. Skills & Technologies
    if (q.includes("skill") || q.includes("stack") || q.includes("technolog") || q.includes("powershell") || q.includes("network") || q.includes("cloud") || q.includes("m365")) {
      return (
        `⚡ **Anup's Core Technical Competencies**:\n\n` +
        `• **Directory & Systems**: Active Directory, Windows Server 2022, Windows 10/11, macOS, Linux, Group Policy (GPO), DNS, DHCP.\n` +
        `• **Cloud & Identity**: Microsoft 365, Entra ID (Azure AD), Okta, Action1 Cloud Console, AWS, Google Cloud.\n` +
        `• **Networking & Security**: GlobalProtect & Cisco AnyConnect VPN, TCP/IP, VLAN, NAT Gateways, EDR host isolation, Firewall ACLs.\n` +
        `• **Tools & Scripting**: PowerShell, Bash, Python, Jira Service Management, ServiceNow, Git.\n` +
        `• **Hardware**: Workstation imaging, POS network troubleshooting, RAM/SSD upgrades, and peripheral maintenance.`
      );
    }

    // 5. Education & Certifications
    if (q.includes("education") || q.includes("degree") || q.includes("university") || q.includes("murdoch") || q.includes("certif") || q.includes("google")) {
      return (
        `🎓 **Education & Certifications**:\n\n` +
        `• **Master of Information Technology** - Murdoch University\n` +
        `  *(Academic Excellence Award Winner)*\n` +
        `• **Google IT Support Professional Certificate**\n` +
        `• Aligned with **ITIL v4 Service Management** best practices.`
      );
    }

    // 6. Job Availability & Location (Darwin, NT)
    if (q.includes("hire") || q.includes("available") || q.includes("job") || q.includes("darwin") || q.includes("contract") || q.includes("full time") || q.includes("visa") || q.includes("work rights")) {
      return (
        `💼 **Availability & Location**:\n\n` +
        `• **Location**: Darwin, Northern Territory, Australia.\n` +
        `• **Status**: **Available immediately** for Full-Time, Part-Time, or Contract roles.\n` +
        `• **Target Roles**: Systems Administrator, IT Support Specialist, Helpdesk Analyst, Cloud/Infrastructure Support Engineer.\n` +
        `• **Contact**: 0481239601 or au.anupupadhaya@gmail.com.`
      );
    }

    // 7. Contact & CV / Resume
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("resume") || q.includes("cv") || q.includes("reach") || q.includes("linkedin") || q.includes("github")) {
      return (
        `📬 **Contact Anup Upadhaya**:\n\n` +
        `• **Email**: [au.anupupadhaya@gmail.com](mailto:au.anupupadhaya@gmail.com)\n` +
        `• **Phone**: 0481239601\n` +
        `• **Location**: Darwin, NT, Australia\n` +
        `• **Download CV**: You can download his PDF Resume directly [here](/Anup_Upadhaya_CV.pdf).\n` +
        `• **LinkedIn**: [linkedin.com/in/anup-upadhaya-86aa27183](https://www.linkedin.com/in/anup-upadhaya-86aa27183)\n` +
        `• **GitHub**: [github.com/anupupadhaya123](https://github.com/anupupadhaya123)`
      );
    }

    // 8. Experience & Background
    if (q.includes("experience") || q.includes("background") || q.includes("history") || q.includes("work")) {
      return (
        `💼 **Professional Experience Summary**:\n\n` +
        `• **Customer & IT Support**: Resolving 15+ weekly technical service tickets across POS networks, hardware deployment, and M365 licensing.\n` +
        `• **Directory & Cloud Management**: Deploying GPOs, managing Active Directory user lifecycles, and orchestrating cloud rollups with Action1.\n` +
        `• **Hands-on Diagnostics**: Stop error (BSOD) minidump analysis, network latency troubleshooting, and remote VPN support.`
      );
    }

    // Default Fallback
    return (
      `Thanks for asking! While I might not have specific details on that exact question, here is what I know best about Anup:\n\n` +
      `• **Education**: Master of IT from Murdoch University\n` +
      `• **Key Skills**: Active Directory, Windows Server 2022, PowerShell, Microsoft 365, Action1\n` +
      `• **Projects**: Enterprise AD Homelab & Autonomous IT Service Desk\n` +
      `• **Availability**: Available for IT roles in Darwin, NT (Phone: 0481239601)\n\n` +
      `Feel free to click any of the quick suggestions below or email Anup at au.anupupadhaya@gmail.com!`
    );
  };

  const handleSend = (textToSend = null) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: "user", content: text, time }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = answerQuestion(text);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: response,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 450);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setHasUnread(false);
          }}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white px-5 py-3.5 rounded-full shadow-2xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-white/20"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white animate-pulse" />
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white"></span>
            )}
          </div>
          <div className="text-left">
            <span className="text-xs font-bold block leading-tight">Ask Anup AI</span>
            <span className="text-[10px] text-sky-100/90 font-mono block leading-tight">Portfolio Assistant</span>
          </div>
          <Sparkles className="w-4 h-4 text-amber-300 opacity-80 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="w-[360px] sm:w-[410px] h-[560px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl shadow-slate-950/40 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 p-4 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm leading-tight">Anup AI</h4>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-white/20 text-white font-semibold">
                    Profile Bot
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-sky-100 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span>Online &bull; Ask me anything</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-950/50 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`p-3.5 rounded-2xl max-w-[88%] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-sky-500 text-white rounded-br-none shadow-md shadow-sky-500/10'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 text-slate-800 dark:text-slate-100 rounded-bl-none shadow-sm'
                }`}>
                  <p className="whitespace-pre-line font-sans">{msg.content}</p>
                  <span className={`block text-[9px] mt-1.5 text-right ${msg.role === 'user' ? 'text-sky-100' : 'text-slate-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className="px-3.5 py-2 bg-slate-100/60 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800/80 overflow-x-auto whitespace-nowrap flex gap-1.5 no-scrollbar shrink-0">
            {quickQuestions.map((q, qIdx) => (
              <button
                key={qIdx}
                type="button"
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full text-[10px] font-sans font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-sky-500 hover:text-sky-500 dark:hover:text-sky-400 transition-all cursor-pointer shadow-sm shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Anup's skills, projects, degrees..."
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-800 dark:text-slate-100 font-sans focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all cursor-pointer shadow-md shadow-sky-500/20"
              title="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
