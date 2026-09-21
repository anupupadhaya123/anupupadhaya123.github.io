import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, Bot, Send, Terminal, CheckCircle2, AlertTriangle, 
  Clock, Server, Zap, Copy, Check, User, ArrowRight, RefreshCw,
  HelpCircle, ChevronRight, FileText, Lock, Radio
} from 'lucide-react';

// ============================================================================
// Enterprise Knowledge Base (KB) Runbooks
// ============================================================================
const KNOWLEDGE_BASE = [
  {
    id: "KB-1001",
    title: "Active Directory / MFA Account Lockout & Self-Service Reset",
    domain: "identity_access",
    tier: "tier_1_service_desk",
    keywords: ["password", "locked", "lockout", "mfa", "okta", "duo", "login failed", "expired password", "access denied"],
    diagnostic_command: "net user %USERNAME% /domain",
    troubleshooting_steps: [
      "1. Verify caller identity using employee ID and manager verification.",
      "2. Query Active Directory to check lockout status: 'Search-ADAccount -LockedOut'.",
      "3. Execute 'Unlock-ADAccount -Identity <username>' to clear the lockout flag.",
      "4. If MFA token is out of sync, trigger an MFA device reset in Okta / Entra ID admin console.",
      "5. Instruct user to sign in through the self-service password portal."
    ],
    self_service_instructions: "Please visit https://identity.corp.internal/self-service to verify your identity via SMS or secondary email and reset your domain credentials."
  },
  {
    id: "KB-1002",
    title: "VPN Gateway Tunnel Failure & MTU/DNS Resolution",
    domain: "network_vpn",
    tier: "tier_1_service_desk",
    keywords: ["vpn", "globalprotect", "anyconnect", "tunnel", "gateway not reachable", "disconnected", "remote access"],
    diagnostic_command: "ipconfig /flushdns && ping -n 4 vpn.corp.internal",
    troubleshooting_steps: [
      "1. Confirm user has an active internet connection outside the VPN.",
      "2. Flush local DNS resolver cache to clear stale gateway records: 'ipconfig /flushdns'.",
      "3. In VPN client settings, switch gateway selection from 'Auto' to preferred regional gateway.",
      "4. Verify client certificate validity in user's Personal Certificate Store (certmgr.msc).",
      "5. Restart the VPN Agent service via services.msc."
    ],
    self_service_instructions: "Disconnect from Wi-Fi, restart your home router, reconnect to Wi-Fi, right-click the VPN icon in your system tray and select 'Refresh Connection'."
  },
  {
    id: "KB-1003",
    title: "Microsoft Outlook / M365 Authentication Loop & Credential Reset",
    domain: "software_cloud",
    tier: "tier_1_service_desk",
    keywords: ["outlook", "exchange", "password prompt", "m365", "teams", "credential loop", "autodiscover", "auth loop"],
    diagnostic_command: "cmdkey /list | findstr \"MicrosoftOffice\"",
    troubleshooting_steps: [
      "1. Completely exit Outlook, Teams, and all Microsoft 365 applications.",
      "2. Open Windows Credential Manager -> Windows Credentials.",
      "3. Locate and delete all entries under 'Generic Credentials' matching 'MicrosoftOffice16_Data*' and 'adal*'.",
      "4. Clear Modern Authentication token cache at '%localappdata%\\Microsoft\\TokenBroker\\Cache'.",
      "5. Relaunch Outlook and enter corporate credentials when prompted."
    ],
    self_service_instructions: "Close Outlook and Teams. Open Control Panel > Credential Manager > Windows Credentials, remove entries with 'MicrosoftOffice', then reopen Outlook."
  },
  {
    id: "KB-1004",
    title: "Windows BSOD / Stop Error & Kernel Dump Analysis",
    domain: "endpoint_hardware",
    tier: "tier_2_desktop_systems",
    keywords: ["bsod", "blue screen", "crash", "critical_process_died", "dump", "0x000000ef", "0x80070005", "stop code", "minidump"],
    diagnostic_command: "sfc /scannow && DISM /Online /Cleanup-Image /RestoreHealth",
    troubleshooting_steps: [
      "1. Boot system into Windows Recovery Environment (WinRE) or Safe Mode with Networking.",
      "2. Copy memory dump files from 'C:\\Windows\\Minidump\\' for analysis in WinDbg.",
      "3. Run System File Checker ('sfc /scannow') and DISM restore health command.",
      "4. Check Device Manager for recently updated display, network, or storage controllers.",
      "5. Run Windows Memory Diagnostic ('mdsched.exe') to test for physical RAM faults."
    ],
    self_service_instructions: "Save all open files immediately. If the computer crashes repeatedly, hold the power button for 10 seconds to shut down and contact Tier 2 Desktop Support."
  },
  {
    id: "KB-1005",
    title: "Enterprise Network Latency & Core Gateway Packet Loss",
    domain: "network_vpn",
    tier: "tier_3_infrastructure",
    keywords: ["network", "latency", "dns", "packet loss", "core switch", "router", "gateway", "nxdomain", "datacenter", "vlan"],
    diagnostic_command: "tracert -d 8.8.8.8 && nslookup dc01.corp.internal",
    troubleshooting_steps: [
      "1. Perform bidirectional traceroute between endpoint and enterprise core switch.",
      "2. Query primary and secondary DNS forwarders to check for zone transfer delays.",
      "3. Inspect core switch interface telemetry for CRC errors or flapping ports.",
      "4. Verify DHCP pool exhaustion on affected VLAN subnet.",
      "5. If organization-wide, initiate Major Incident Management (MIM) bridge with NOC."
    ],
    self_service_instructions: "Network engineering is actively investigating high latency on the corporate backbone. No user action is required."
  },
  {
    id: "KB-1006",
    title: "Suspected Phishing, Ransomware & Host Containment Protocol",
    domain: "security_incident",
    tier: "secops_csirt",
    keywords: ["ransomware", "malware", "virus", "phishing", "suspicious link", "compromised", "hacked", "lockbit", "bitcoin ransom", "encrypted files"],
    diagnostic_command: "netsh interface set interface name=\"Wi-Fi\" admin=DISABLED",
    troubleshooting_steps: [
      "1. IMMEDIATELY isolate the affected host from the network (unplug Ethernet and disable Wi-Fi).",
      "2. DO NOT power off or reboot the workstation to preserve volatile memory (RAM).",
      "3. Trigger an EDR host isolation action via CrowdStrike / Defender console.",
      "4. Reset user's domain credentials and revoke all active OAuth/Azure AD refresh tokens.",
      "5. Capture memory dump with WinPmem and preserve MFT/event logs for CSIRT."
    ],
    self_service_instructions: "UNPLUG YOUR NETWORK CABLE AND DISCONNECT WI-FI IMMEDIATELY. DO NOT TURN OFF YOUR COMPUTER. A SecOps analyst will contact you directly."
  },
  {
    id: "KB-1007",
    title: "Service Request: Software Provisioning & RBAC Access Grant",
    domain: "software_cloud",
    tier: "tier_1_service_desk",
    keywords: ["provision", "access request", "new hire", "license", "github", "jira", "aws access", "software install", "admin rights"],
    diagnostic_command: "dsregcmd /status",
    troubleshooting_steps: [
      "1. Validate that ticket has documented managerial approval in ITSM workflow.",
      "2. Verify user's department and job code against the RBAC matrix.",
      "3. Add user account to the corresponding Entra ID / Okta security group.",
      "4. Deploy software package silently via Microsoft Intune / SCCM company portal.",
      "5. Notify user once provisioning is complete with getting-started documentation."
    ],
    self_service_instructions: "Your request has been approved. You can install the approved application directly from the Company Portal app on your workstation without local admin rights."
  }
];

// Preset Scenarios
const PRESET_SCENARIOS = [
  {
    id: "p1",
    label: "🚨 P1 Domain Controller Outage",
    color: "hover:border-rose-500 hover:bg-rose-500/10 text-rose-600 dark:text-rose-400",
    content: "URGENT: Active Directory domain controller dc01.corp.internal is completely unresponsive. Over 400 employees across all departments are locked out and production systems cannot authenticate users. This is a complete company-wide outage!"
  },
  {
    id: "ransomware",
    label: "🛡️ Ransomware Alert (LockBit)",
    color: "hover:border-purple-500 hover:bg-purple-500/10 text-purple-600 dark:text-purple-400",
    content: "ALERT: An employee on finance workstation ws-fin-04 opened an email attachment named 'Invoice_March.exe' and now their screen shows a LockBit ransomware note saying all corporate files are encrypted. Bitcoin ransom demanded immediately!"
  },
  {
    id: "bsod",
    label: "💻 Windows BSOD (0x000000ef)",
    color: "hover:border-amber-500 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400",
    content: "My Dell Latitude laptop has blue screened 3 times this morning with stop code 0x000000ef (CRITICAL_PROCESS_DIED). It keeps rebooting into Windows Recovery. Need assistance as I cannot attend client meetings."
  },
  {
    id: "vpn",
    label: "🌐 GlobalProtect VPN Drop",
    color: "hover:border-blue-500 hover:bg-blue-500/10 text-blue-600 dark:text-blue-400",
    content: "Hello IT helpdesk, my GlobalProtect VPN client is failing to connect with 'Gateway not reachable' error when working remotely from home. I have tried restarting my laptop twice."
  },
  {
    id: "provisioning",
    label: "📋 DevOps Laptop Provisioning",
    color: "hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    content: "Service request: Please provision new hire laptop and accounts for Alex Rivera (Senior Cloud Engineer) starting next Monday. Needs 32GB MacBook Pro, AWS production IAM access, and GitHub Enterprise organization invite."
  }
];

export default function AutonomousServiceDesk() {
  const [ticketInput, setTicketInput] = useState(PRESET_SCENARIOS[0].content);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dossier, setDossier] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatStatus, setChatStatus] = useState('Active • Troubleshooting Session');
  const [suggestedActions, setSuggestedActions] = useState([]);
  const [copiedCli, setCopiedCli] = useState(false);
  const [sessionQueue, setSessionQueue] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isTyping]);

  // Client-side multi-agent triage engine
  const processTicket = (text) => {
    const textLower = text.toLowerCase();
    const timestamp = new Date();
    const ticketId = `INC-${timestamp.getFullYear()}${String(timestamp.getMonth()+1).padStart(2,'0')}${String(timestamp.getDate()).padStart(2,'0')}-${String(timestamp.getHours()).padStart(2,'0')}${String(timestamp.getMinutes()).padStart(2,'0')}${String(timestamp.getSeconds()).padStart(2,'0')}`;

    // 1. Entity Extraction
    const hexErrors = text.match(/\b0x[0-9a-fA-F]{4,8}\b/g) || [];
    const bsodErrors = text.match(/\b[A-Z_]{5,30}_(?:DIED|ERROR|FAILED|EXCEPTION|FAULT|VIOLATION)\b/g) || [];
    const httpErrors = (text.match(/\b(?:http\s*)?(?:4\d{2}|5\d{2})\b/gi) || []).filter(e => !isNaN(e)).map(e => `HTTP ${e}`);
    const hostnames = text.match(/\b(?:srv|dc|ws|vm|db|fw|rt|sw)-[a-zA-Z0-9-]+\b/gi) || [];
    const systems = [
      "active directory", "azure ad", "entra id", "okta", "mfa", "duo",
      "vpn", "globalprotect", "cisco anyconnect", "outlook", "exchange",
      "m365", "teams", "jira", "github", "aws", "azure", "windows 11"
    ].filter(s => textLower.includes(s));
    const securityTriggers = ["ransomware", "malware", "virus", "phishing", "lockbit", "encrypted files", "compromised", "hacked"].filter(s => textLower.includes(s));
    const outageTriggers = ["all users", "company-wide", "production down", "entire team", "datacenter", "core switch", "domain controller", "unresponsive"].filter(s => textLower.includes(s));
    const combinedErrors = [...new Set([...hexErrors, ...bsodErrors, ...httpErrors])];

    // 2. Record Type
    let recordType = "incident";
    if (textLower.includes("provision") || textLower.includes("request") || textLower.includes("new hire") || textLower.includes("license")) {
      if (!combinedErrors.length && !outageTriggers.length && !securityTriggers.length) {
        recordType = "service_request";
      }
    }

    // 3. Domain
    let domain = "general_it";
    if (securityTriggers.length || textLower.includes("ransomware") || textLower.includes("phishing")) {
      domain = "security_incident";
    } else if (textLower.includes("password") || textLower.includes("lockout") || textLower.includes("mfa") || textLower.includes("okta") || textLower.includes("active directory") || textLower.includes("login")) {
      domain = "identity_access";
    } else if (textLower.includes("vpn") || textLower.includes("globalprotect") || textLower.includes("wi-fi") || textLower.includes("dns") || textLower.includes("network") || textLower.includes("packet loss")) {
      domain = "network_vpn";
    } else if (textLower.includes("bsod") || textLower.includes("blue screen") || textLower.includes("laptop") || textLower.includes("hardware") || textLower.includes("monitor")) {
      domain = "endpoint_hardware";
    } else if (textLower.includes("outlook") || textLower.includes("m365") || textLower.includes("teams") || textLower.includes("aws") || textLower.includes("azure")) {
      domain = "software_cloud";
    }

    // 4. Impact & Urgency
    const impact = outageTriggers.length || textLower.includes("company-wide") || textLower.includes("production down") ? "high" : (textLower.includes("department") || textLower.includes("team") ? "medium" : "low");
    const urgency = domain === "security_incident" || textLower.includes("urgent") || textLower.includes("critical") || textLower.includes("immediately") ? "critical" : (textLower.includes("asap") || textLower.includes("cannot work") ? "high" : "low");

    // 5. Priority Matrix
    let priority = "P4_LOW";
    if (impact === "high") {
      priority = (urgency === "critical" || urgency === "high") ? "P1_CRITICAL" : (urgency === "medium" ? "P2_HIGH" : "P3_MEDIUM");
    } else if (impact === "medium") {
      priority = (urgency === "critical" || urgency === "high") ? "P2_HIGH" : (urgency === "medium" ? "P3_MEDIUM" : "P4_LOW");
    } else {
      priority = urgency === "critical" ? "P2_HIGH" : (urgency === "high" ? "P3_MEDIUM" : "P4_LOW");
    }

    // 6. SLA Calculations
    const slaMap = {
      P1_CRITICAL: { respMins: 15, resHours: 4, desc: "Critical Outage: 15-min response, 4-hour resolution target" },
      P2_HIGH: { respMins: 60, resHours: 8, desc: "High Priority: 1-hour response, 8-hour resolution target" },
      P3_MEDIUM: { respMins: 240, resHours: 24, desc: "Medium Priority: 4-hour response, 24-hour resolution target" },
      P4_LOW: { respMins: 480, resHours: 72, desc: "Low Priority: 8-hour response, 72-hour resolution target" }
    };
    const sla = slaMap[priority];
    const respDate = new Date(timestamp.getTime() + sla.respMins * 60000);
    const resDate = new Date(timestamp.getTime() + sla.resHours * 3600000);

    // 7. Support Tier Dispatch
    let primaryTier = "tier_1_service_desk";
    let secondaryTier = "tier_2_desktop_systems";
    let pagingRequired = false;

    if (domain === "security_incident") {
      primaryTier = "secops_csirt";
      secondaryTier = "tier_3_infrastructure";
      pagingRequired = true;
    } else if (impact === "high" && (domain === "network_vpn" || domain === "software_cloud" || domain === "endpoint_hardware")) {
      primaryTier = "tier_3_infrastructure";
      secondaryTier = "tier_2_desktop_systems";
      pagingRequired = true;
    } else if (domain === "endpoint_hardware") {
      primaryTier = "tier_2_desktop_systems";
      secondaryTier = "tier_1_service_desk";
    }
    if (priority === "P1_CRITICAL") pagingRequired = true;

    // 8. Runbook Matching
    let matchedKb = null;
    let highestScore = 0;
    for (const kb of KNOWLEDGE_BASE) {
      let score = 0;
      if (kb.domain === domain) score += 3;
      for (const kw of kb.keywords) {
        if (textLower.includes(kw)) score += 2;
      }
      for (const err of combinedErrors) {
        if (kb.keywords.some(k => k.includes(err.toLowerCase()))) score += 5;
      }
      if (score > highestScore) {
        highestScore = score;
        matchedKb = kb;
      }
    }
    if (!matchedKb || highestScore < 2) {
      matchedKb = {
        id: "KB-GENERIC",
        title: "Standard IT Service Desk Triage",
        diagnostic_command: "echo \"No automated script available\"",
        troubleshooting_steps: [
          "1. Contact user to gather detailed system logs.",
          "2. Verify network reachability and endpoint compliance.",
          "3. Escalate to senior systems engineer if unresolved within SLA window."
        ],
        self_service_instructions: "Please restart your application or computer and contact your local IT helpdesk if the issue persists."
      };
    }

    // 9. Escalation & MIM
    let needsEscalation = false;
    let mimBridge = false;
    let hostIsolation = false;
    let escalationReason = "Standard operational parameters maintained.";
    let escalationLevel = 1;

    if (domain === "security_incident" || securityTriggers.length) {
      needsEscalation = true;
      hostIsolation = true;
      escalationReason = `Active Security Threat Detected: ${securityTriggers.join(', ') || 'malware execution'}`;
      escalationLevel = 3;
    } else if (priority === "P1_CRITICAL") {
      needsEscalation = true;
      mimBridge = true;
      escalationReason = "P1 Mission-Critical Service Outage affecting enterprise operations.";
      escalationLevel = 3;
    } else if (priority === "P2_HIGH" && outageTriggers.length) {
      needsEscalation = true;
      escalationReason = "P2 High Priority incident impacting critical department services.";
      escalationLevel = 2;
    }

    return {
      ticket: { id: ticketId, content: text, created_at: timestamp.toISOString() },
      triage: {
        ticket_id: ticketId,
        record_type: recordType,
        domain: domain,
        impact: impact,
        urgency: urgency,
        priority: priority,
        sla: {
          priority: priority,
          response_target_minutes: sla.respMins,
          resolution_target_hours: sla.resHours,
          response_deadline: respDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          resolution_deadline: resDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          policy_description: sla.desc
        },
        extracted_entities: {
          error_codes: combinedErrors,
          hostnames: hostnames,
          detected_systems: systems,
          security_indicators: securityTriggers
        }
      },
      routing: {
        ticket_id: ticketId,
        assigned_tier: primaryTier,
        secondary_tier: secondaryTier,
        paging_required: pagingRequired,
        routing_rationale: `Dispatched to ${formatTier(primaryTier)} based on domain '${domain}' with ${priority} priority and ${impact} impact.`
      },
      remediation: {
        ticket_id: ticketId,
        matched_kb_id: matchedKb.id,
        matched_kb_title: matchedKb.title,
        diagnostic_command: matchedKb.diagnostic_command,
        technician_steps: matchedKb.troubleshooting_steps,
        user_response: `Hello,\n\nThank you for contacting Corporate IT Support.\n\nYour ticket has been assigned to our **${formatTier(primaryTier)}** under priority **${priority}**.\nOur target response window is within ${sla.respMins} minutes.\n\n**Self-Service Troubleshooting Recommendation:**\n${matchedKb.self_service_instructions}\n\nTicket Reference: ${ticketId}`
      },
      escalation: {
        ticket_id: ticketId,
        needs_escalation: needsEscalation,
        escalation_level: escalationLevel,
        escalation_reason: escalationReason,
        mim_bridge_required: mimBridge,
        host_isolation_required: hostIsolation,
        recommended_action: mimBridge 
          ? "CRITICAL MIM: Open emergency incident conference bridge, alert IT Leadership, and broadcast status page announcement." 
          : (hostIsolation ? "EMERGENCY SECOPS: Trigger EDR network containment on endpoint, revoke Active Directory session tokens, and preserve memory dump." : "Proceed with standard tier queue resolution within established SLA.")
      }
    };
  };

  // Conversational response engine
  const processChat = (userMsg, history, context) => {
    const msgLower = userMsg.toLowerCase().trim();
    const remediation = context?.remediation || {};
    const triage = context?.triage || {};
    const routing = context?.routing || {};
    const steps = remediation.technician_steps || [];
    const kbTitle = remediation.matched_kb_title || "IT Support";
    const diagnosticCmd = remediation.diagnostic_command || "";
    const tier = routing.assigned_tier || "tier_1_service_desk";

    // 1. Resolution
    const resWords = ["it worked", "it works", "works now", "working now", "now working", "fixed", "all good", "solved", "resolved", "issue resolved", "thank you", "thanks", "that helped", "problem solved", "success", "unlocked"];
    if (resWords.some(kw => msgLower.includes(kw))) {
      return {
        reply: `🎉 Excellent news! I'm glad to hear that resolved the issue with **${kbTitle}**.\n\nI have marked this ticket as **RESOLVED** in our IT Service Management system. A confirmation record has been archived.\n\nHave a productive day!`,
        status: "resolved",
        suggested: ["Rate Support Experience", "Submit New Ticket"]
      };
    }

    // 2. Escalation
    const escWords = ["talk to a human", "speak with human", "representative", "real person", "escalate", "not helping", "give up", "manager", "senior engineer"];
    if (escWords.some(kw => msgLower.includes(kw))) {
      return {
        reply: `Understood. I have escalated this ticket directly to a human engineer on the **${formatTier(tier)}** queue.\n\n• Priority: **${triage.priority || 'P3_MEDIUM'}**\n• Target: **${triage.sla?.response_deadline || 'Standard'}**\n\nA technician will review our troubleshooting history and contact you directly.`,
        status: "escalated",
        suggested: ["Check Ticket Status", "Attach Diagnostic Log"]
      };
    }

    // 3. Still Broken
    const failWords = ["still not working", "still broken", "didn't work", "did not work", "same error", "still failing", "error persists", "cannot connect"];
    if (failWords.some(kw => msgLower.includes(kw))) {
      return {
        reply: `I understand the previous step didn't resolve it yet. Let's dig deeper.\n\n**Next Recommended Action:**\n1. Please execute the diagnostic command:\n   \`${diagnosticCmd}\`\n\n2. Does it return an error code or timeout?\n\n*(Note: You can also click 'Escalate to Human' above at any time.)*`,
        status: "in_progress",
        suggested: ["I ran the command", "Paste Error Output", "Escalate to Human Engineer"]
      };
    }

    // 4. Ran command
    if (msgLower.includes("ran") || msgLower.includes("done") || msgLower.includes("executed")) {
      return {
        reply: `Great! After running \`${diagnosticCmd}\`:\n\n1. Did the command complete successfully or return an error code?\n2. Please test the original application or connection again now.\n\nDoes everything work now, or is it still showing an error?`,
        status: "in_progress",
        suggested: ["It worked! Issue resolved", "Still getting the error", "Show me the next step"]
      };
    }

    // 5. Next steps
    if (msgLower.includes("next") || msgLower.includes("step") || msgLower.includes("how")) {
      const stepText = steps.length ? steps.slice(0, 3).map(s => `• ${s}`).join("\n") : "Follow the SOP guidelines.";
      return {
        reply: `Here are the standard operating steps for **${kbTitle}**:\n\n${stepText}\n\nLet me know if you need clarification on any of these steps!`,
        status: "in_progress",
        suggested: ["Explain step 1", "I ran the steps", "It worked! Issue resolved", "Escalate to Human"]
      };
    }

    // 6. Default
    return {
      reply: `Thank you for the update regarding **${kbTitle}**.\n\n• Diagnostic command: \`${diagnosticCmd}\`\n• Please verify your network and credentials.\n\nWould you like me to walk you through running this step-by-step, or would you like to escalate this ticket to a technician?`,
      status: "in_progress",
      suggested: ["Walk me through it", "I ran the command", "Escalate to Human Engineer"]
    };
  };

  const handleTriageSubmit = (e) => {
    if (e) e.preventDefault();
    if (!ticketInput.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      const result = processTicket(ticketInput);
      setDossier(result);
      setSessionQueue(prev => [result, ...prev]);

      // Initialize chat
      const initialGreeting = result.remediation.user_response;
      setChatHistory([{
        role: "assistant",
        content: initialGreeting,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setChatStatus("Active • Troubleshooting Session");
      setSuggestedActions([
        "I ran the command",
        "It worked! Issue resolved",
        "Still getting the error",
        "Explain step 1"
      ]);

      setIsProcessing(false);
    }, 400);
  };

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || chatInput.trim();
    if (!text || !dossier) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newHistory = [...chatHistory, { role: "user", content: text, time }];
    setChatHistory(newHistory);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = processChat(text, newHistory, dossier);
      setIsTyping(false);

      setChatHistory(prev => [
        ...prev,
        {
          role: "assistant",
          content: botResponse.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      if (botResponse.status === "resolved") {
        setChatStatus("Resolved • Ticket Closed");
      } else if (botResponse.status === "escalated") {
        setChatStatus("Escalated • Human Engineer Assigned");
      }

      setSuggestedActions(botResponse.suggested || []);
    }, 450);
  };

  const copyCli = () => {
    if (!dossier?.remediation?.diagnostic_command) return;
    navigator.clipboard.writeText(dossier.remediation.diagnostic_command);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const formatTier = (tier) => {
    const names = {
      tier_1_service_desk: "Tier 1 Service Desk",
      tier_2_desktop_systems: "Tier 2 Desktop Systems",
      tier_3_infrastructure: "Tier 3 Infrastructure",
      secops_csirt: "SecOps CSIRT"
    };
    return names[tier] || tier;
  };

  const getPriorityBadge = (p) => {
    switch (p) {
      case "P1_CRITICAL": return "bg-rose-500/15 text-rose-500 border-rose-500/30";
      case "P2_HIGH": return "bg-amber-500/15 text-amber-500 border-amber-500/30";
      case "P3_MEDIUM": return "bg-sky-500/15 text-sky-500 border-sky-500/30";
      default: return "bg-blue-500/15 text-blue-500 border-blue-500/30";
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Architecture Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-sans font-bold text-xl text-slate-900 dark:text-white">
                  Autonomous IT Service Desk (AITSD)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-semibold">
                  ITIL v4 Compliant
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                AI Multi-Agent Architecture: Triage &bull; Dynamic SLA Matrix &bull; Tier Dispatch &bull; Runbook SOPs &bull; SecOps MIM Escalation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Multi-Agent Engine Online
            </span>
          </div>
        </div>

        {/* 5-Agent Pipeline Visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-6">
          {[
            { num: "1", title: "Triage Agent", desc: "Break/Fix vs Request & Domain" },
            { num: "2", title: "SLA Matrix Agent", desc: "Impact × Urgency & Deadlines" },
            { num: "3", title: "Tier Dispatcher", desc: "Tier 1/2/3 & SecOps Paging" },
            { num: "4", title: "Remediation Agent", desc: "KB Runbooks & Diagnostic CLI" },
            { num: "5", title: "SecOps / MIM Agent", desc: "P1 Bridges & Host Isolation" },
          ].map((step, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-3.5 flex items-start gap-3">
              <span className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-sky-500/20">
                {step.num}
              </span>
              <div>
                <span className="font-sans font-semibold text-xs text-slate-900 dark:text-slate-200 block">
                  {step.title}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans block mt-0.5 leading-tight">
                  {step.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Input Form (Left) & Results/Chat (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Ticket Ingestion & Quick Scenarios */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 tracking-wider block mb-1">
                INPUT QUEUE
              </span>
              <h4 className="font-sans font-bold text-lg text-slate-900 dark:text-white">
                Ingest IT Ticket / Monitoring Alert
              </h4>
            </div>

            {/* Quick Scenario Chips */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wide block">
                ⚡ Quick Enterprise Scenarios:
              </span>
              <div className="flex flex-col gap-1.5">
                {PRESET_SCENARIOS.map(sc => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setTicketInput(sc.content)}
                    className={`text-left text-xs font-sans font-medium px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 transition-all cursor-pointer hover:-translate-y-0.5 ${sc.color}`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleTriageSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 font-sans">
                  Ticket Content / Error Description:
                </label>
                <textarea
                  rows={5}
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
                  placeholder="Paste employee support request, system crash logs, or monitoring alert..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-xs text-slate-800 dark:text-slate-100 font-sans focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all resize-none"
                  required
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setTicketInput('')}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-sans font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Analyzing Multi-Agent Pipeline...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>Run Multi-Agent Triage</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Session Queue History */}
          {sessionQueue.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                  📋 Session Queue ({sessionQueue.length})
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Live History</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                {sessionQueue.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setDossier(item)}
                    className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between cursor-pointer hover:border-sky-500/40 transition-all"
                  >
                    <div>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200 block text-[11px]">
                        {item.ticket.id}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {item.triage.domain} &bull; {formatTier(item.routing.assigned_tier)}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border font-semibold ${getPriorityBadge(item.triage.priority)}`}>
                      {item.triage.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Incident Dossier & Interactive AI Support Chat */}
        <div className="lg:col-span-7 space-y-6">
          {!dossier ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center shadow-xl space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto text-2xl">
                📡
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-lg text-slate-900 dark:text-white">
                  Ready to Triage IT Tickets
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans max-w-md mx-auto">
                  Select an enterprise scenario on the left or paste a custom IT issue to watch the multi-agent system analyze, prioritize, route, and interactively troubleshoot in real time.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleTriageSubmit()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-semibold bg-sky-500 text-slate-950 hover:bg-sky-400 transition-all cursor-pointer shadow-lg shadow-sky-500/10"
              >
                <span>Run Demo Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Critical Alert Banner (MIM / SecOps) */}
              {dossier.escalation.needs_escalation && (
                <div className={`p-4 rounded-2xl border flex items-start gap-3 shadow-lg ${
                  dossier.escalation.mim_bridge_required
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                    : (dossier.escalation.host_isolation_required
                      ? 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400')
                }`}>
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h5 className="font-sans font-bold text-xs uppercase tracking-wide">
                      {dossier.escalation.mim_bridge_required
                        ? "P1 Major Incident Management (MIM) Bridge Triggered"
                        : (dossier.escalation.host_isolation_required
                          ? "SecOps Emergency Host Containment Active"
                          : `Escalation Level ${dossier.escalation.escalation_level}`)}
                    </h5>
                    <p className="text-xs font-sans opacity-90">
                      {dossier.escalation.recommended_action}
                    </p>
                  </div>
                </div>
              )}

              {/* Dossier Metrics Bento */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase block">
                      Incident Dossier Reference
                    </span>
                    <h4 className="font-mono font-bold text-base text-slate-900 dark:text-white">
                      {dossier.ticket.id}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono border font-bold ${getPriorityBadge(dossier.triage.priority)}`}>
                      {dossier.triage.priority}
                    </span>
                  </div>
                </div>

                {/* 4-Metric Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/60 p-3 rounded-2xl">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Record Type</span>
                    <span className="font-sans font-bold text-xs text-slate-800 dark:text-slate-200 mt-0.5 block uppercase">
                      {dossier.triage.record_type}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/60 p-3 rounded-2xl">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Domain</span>
                    <span className="font-sans font-bold text-xs text-slate-800 dark:text-slate-200 mt-0.5 block">
                      {dossier.triage.domain}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/60 p-3 rounded-2xl">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Assigned Tier</span>
                    <span className="font-sans font-bold text-xs text-sky-600 dark:text-sky-400 mt-0.5 block">
                      {formatTier(dossier.routing.assigned_tier)}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/60 p-3 rounded-2xl">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">On-Call Page</span>
                    <span className={`font-sans font-bold text-xs mt-0.5 block ${dossier.routing.paging_required ? 'text-rose-500' : 'text-slate-500'}`}>
                      {dossier.routing.paging_required ? '🚨 Emergency Page' : 'No (Standard)'}
                    </span>
                  </div>
                </div>

                {/* SLA Targets */}
                <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/60 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Clock className="w-4 h-4 text-sky-500" />
                    <span><strong>SLA Policy:</strong> {dossier.triage.sla.policy_description}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                    <span>Resp Target: <strong>{dossier.triage.sla.response_target_minutes}m</strong></span>
                    <span>Res Target: <strong>{dossier.triage.sla.resolution_target_hours}h</strong></span>
                  </div>
                </div>

                {/* Runbook & Diagnostic CLI */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-sky-500" />
                      <span className="font-sans font-bold text-xs text-slate-900 dark:text-white">
                        Runbook [{dossier.remediation.matched_kb_id}]: {dossier.remediation.matched_kb_title}
                      </span>
                    </div>
                  </div>

                  {/* CLI Code Block */}
                  <div className="bg-slate-950 rounded-2xl p-3.5 border border-slate-800 flex items-center justify-between gap-3">
                    <code className="text-xs font-mono text-sky-400 break-all">
                      $ {dossier.remediation.diagnostic_command}
                    </code>
                    <button
                      type="button"
                      onClick={copyCli}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all cursor-pointer shrink-0"
                      title="Copy CLI Command"
                    >
                      {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* SOP Steps */}
                  <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400 font-sans pl-1">
                    <span className="font-semibold text-slate-800 dark:text-slate-300 block text-[11px] uppercase tracking-wide">
                      Standard Operating Procedure (SOP):
                    </span>
                    {dossier.remediation.technician_steps.slice(0, 3).map((step, sIdx) => (
                      <p key={sIdx} className="leading-relaxed">{step}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* LIVE CONVERSATIONAL AI SUPPORT ASSISTANT (CHAT TO SOLVE) */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col">
                {/* Chat Header */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs text-slate-900 dark:text-white">
                        AI IT Support Specialist
                      </h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{chatStatus}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSendMessage("It worked! Issue resolved, thank you.")}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all cursor-pointer"
                    >
                      ✓ Resolve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendMessage("I'd like to escalate this ticket to a human engineer.")}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer"
                    >
                      🚨 Escalate
                    </button>
                  </div>
                </div>

                {/* Message Log */}
                <div className="p-4 space-y-3 max-h-72 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/40 text-xs">
                  {chatHistory.map((msg, mIdx) => (
                    <div
                      key={mIdx}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-sky-500 text-white rounded-br-none shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none shadow-sm'
                      }`}>
                        <p className="whitespace-pre-line font-sans">{msg.content}</p>
                        <span className={`block text-[9px] mt-1 text-right ${msg.role === 'user' ? 'text-sky-100' : 'text-slate-400'}`}>
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
                  <div ref={chatEndRef} />
                </div>

                {/* Suggestion Chips */}
                {suggestedActions.length > 0 && (
                  <div className="px-4 py-2 bg-slate-100/60 dark:bg-slate-950/60 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mr-1">
                      💡 Quick replies:
                    </span>
                    {suggestedActions.map((action, aIdx) => (
                      <button
                        key={aIdx}
                        type="button"
                        onClick={() => handleSendMessage(action)}
                        className="px-2.5 py-1 rounded-full text-[11px] font-sans font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-sky-500 hover:text-sky-500 transition-all cursor-pointer shadow-sm"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your reply, ask questions, or report command results..."
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-800 dark:text-slate-100 font-sans focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-sky-500/10"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
