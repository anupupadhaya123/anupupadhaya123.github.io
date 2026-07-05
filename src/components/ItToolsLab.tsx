import React, { useState, useMemo } from 'react';
import { 
  Network, Calculator, Users, Ticket, CheckCircle2, AlertTriangle, 
  Plus, Search, HelpCircle, Shield, Play, RotateCcw, 
  Database, Server, Cpu, Clock, Send, Check, ShieldCheck, ShieldAlert
} from 'lucide-react';

// Subnet Helper functions
function parseIp(ipStr: string): number[] | null {
  const parts = ipStr.trim().split('.');
  if (parts.length !== 4) return null;
  const octets = parts.map(p => {
    const n = parseInt(p, 10);
    return isNaN(n) || n < 0 || n > 255 ? -1 : n;
  });
  if (octets.includes(-1)) return null;
  return octets;
}

function ipToLong(ip: number[]): number {
  return ((ip[0] << 24) >>> 0) + (ip[1] << 16) + (ip[2] << 8) + ip[3];
}

function longToIp(long: number): number[] {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255
  ];
}

interface ADItem {
  id: string;
  name: string;
  type: 'user' | 'computer';
  role?: string;
  os?: string;
  status: 'active' | 'locked';
}

interface OU {
  id: string;
  name: string;
  description: string;
  items: ADItem[];
  gpos: {
    mfa: boolean;
    usb: boolean;
    screenlock: boolean;
    complexity: boolean;
  };
}

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: 'Active Directory' | 'Network' | 'Security' | 'Hardware/Software';
  status: 'open' | 'assigned' | 'escalated' | 'resolved';
  assignee: string;
  createdBy: string;
  createdAt: string;
  logs: string[];
}

export default function ItToolsLab() {
  const [activeTab, setActiveTab] = useState<'subnet' | 'ad' | 'helpdesk'>('subnet');

  // --- 1. SUBNET CALCULATOR STATE ---
  const [ipInput, setIpInput] = useState('192.168.1.5');
  const [cidrInput, setCidrInput] = useState('24');
  const [subdivisionHosts, setSubdivisionHosts] = useState('30');

  const subnetResults = useMemo(() => {
    const ip = parseIp(ipInput);
    const cidr = parseInt(cidrInput, 10);
    if (!ip || isNaN(cidr) || cidr < 0 || cidr > 32) {
      return { error: 'Invalid IP address or CIDR mask' };
    }

    const ipLong = ipToLong(ip);
    
    // Mask calculations
    let maskLong = 0;
    if (cidr > 0) {
      maskLong = (~(0xFFFFFFFF >>> cidr)) >>> 0;
    }
    const wildcardLong = (~maskLong) >>> 0;

    const networkLong = (ipLong & maskLong) >>> 0;
    const broadcastLong = (networkLong | wildcardLong) >>> 0;

    const maskIp = longToIp(maskLong);
    const wildcardIp = longToIp(wildcardLong);
    const networkIp = longToIp(networkLong);
    const broadcastIp = longToIp(broadcastLong);

    let firstUsableIp = longToIp(networkLong + 1);
    let lastUsableIp = longToIp(broadcastLong - 1);
    let usableHosts = Math.pow(2, 32 - cidr) - 2;

    if (cidr === 31) {
      firstUsableIp = longToIp(networkLong);
      lastUsableIp = longToIp(broadcastLong);
      usableHosts = 2;
    } else if (cidr === 32) {
      firstUsableIp = longToIp(networkLong);
      lastUsableIp = longToIp(networkLong);
      usableHosts = 1;
    }

    // binary output helper
    const toBinStr = (num: number) => {
      return (num >>> 0).toString(2).padStart(32, '0').match(/.{1,8}/g)?.join('.') || '';
    };

    return {
      ip: ip.join('.'),
      cidr,
      mask: maskIp.join('.'),
      wildcard: wildcardIp.join('.'),
      network: networkIp.join('.'),
      broadcast: broadcastIp.join('.'),
      range: `${firstUsableIp.join('.')} - ${lastUsableIp.join('.')}`,
      hosts: usableHosts > 0 ? usableHosts.toLocaleString() : '0',
      ipBinary: toBinStr(ipLong),
      maskBinary: toBinStr(maskLong),
      networkBinary: toBinStr(networkLong),
      class: ip[0] < 128 ? 'Class A' : ip[0] < 192 ? 'Class B' : ip[0] < 224 ? 'Class C' : 'Class D (Multicast)'
    };
  }, [ipInput, cidrInput]);

  // Dynamic VLSM subdivision list
  const subnetSplits = useMemo(() => {
    const ip = parseIp(ipInput);
    const hostsReq = parseInt(subdivisionHosts, 10);
    if (!ip || isNaN(hostsReq) || hostsReq <= 0 || hostsReq > 100000) return [];

    // find smallest power of 2 that can support (hostsReq + 2)
    let neededSize = hostsReq + 2;
    let power = 2;
    while (Math.pow(2, power) < neededSize) {
      power++;
    }
    const neededCidr = 32 - power;
    if (neededCidr < 0) return [];

    const baseIpLong = ipToLong(ip) & ((~(0xFFFFFFFF >>> parseInt(cidrInput, 10))) >>> 0);
    const subnets = [];
    const subnetSize = Math.pow(2, power);

    for (let i = 0; i < 4; i++) {
      const netLong = (baseIpLong + (i * subnetSize)) >>> 0;
      const bcLong = (netLong + subnetSize - 1) >>> 0;
      subnets.push({
        index: i + 1,
        network: longToIp(netLong).join('.'),
        mask: `/${neededCidr}`,
        range: `${longToIp(netLong + 1).join('.')} - ${longToIp(bcLong - 1).join('.')}`,
        broadcast: longToIp(bcLong).join('.'),
        totalHosts: subnetSize - 2
      });
    }
    return subnets;
  }, [ipInput, cidrInput, subdivisionHosts]);

  // --- 2. ACTIVE DIRECTORY STATE ---
  const [selectedOuId, setSelectedOuId] = useState<string>('ou-kathmandu');
  const [adSearch, setAdSearch] = useState('');
  const [newOuName, setNewOuName] = useState('');
  const [newObjectName, setNewObjectName] = useState('');
  const [newObjectType, setNewObjectType] = useState<'user' | 'computer'>('user');
  const [newObjectRole, setNewObjectRole] = useState('Systems Engineer');
  const [ous, setOus] = useState<OU[]>([
    {
      id: 'ou-kathmandu',
      name: 'Kathmandu-HQ Users',
      description: 'Primary corporate users located at Kathmandu corporate office.',
      gpos: { mfa: true, usb: false, screenlock: true, complexity: true },
      items: [
        { id: 'usr-1', name: 'Anup Upadhaya', type: 'user', role: 'Systems Engineer', status: 'active' },
        { id: 'usr-2', name: 'Subash Sharma', type: 'user', role: 'IT Support Analyst', status: 'active' },
        { id: 'usr-3', name: 'Alina Karki', type: 'user', role: 'HR Manager', status: 'active' },
        { id: 'pc-1', name: 'KTM-DEV-WS01', type: 'computer', os: 'Windows 11 Enterprise', status: 'active' },
      ]
    },
    {
      id: 'ou-domain-controllers',
      name: 'Domain Controllers',
      description: 'Critical servers responsible for enterprise directory sync & authentication.',
      gpos: { mfa: true, usb: true, screenlock: true, complexity: true },
      items: [
        { id: 'srv-1', name: 'KTM-AD-DC01', type: 'computer', os: 'Windows Server 2022', status: 'active' },
        { id: 'srv-2', name: 'KTM-AD-DC02', type: 'computer', os: 'Windows Server 2022', status: 'active' },
      ]
    },
    {
      id: 'ou-contractors',
      name: 'Contractors & Guests',
      description: 'Temporary external partner accounts.',
      gpos: { mfa: false, usb: true, screenlock: false, complexity: false },
      items: [
        { id: 'usr-4', name: 'Guest Developer 01', type: 'user', role: 'External Partner', status: 'locked' },
        { id: 'pc-2', name: 'KTM-GUEST-WS09', type: 'computer', os: 'Windows 10 Professional', status: 'active' },
      ]
    }
  ]);

  const selectedOu = useMemo(() => ous.find(o => o.id === selectedOuId) || ous[0], [ous, selectedOuId]);

  const handleAddOu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOuName.trim()) return;
    const newId = `ou-${Date.now()}`;
    const newOu: OU = {
      id: newId,
      name: newOuName.trim(),
      description: 'Custom Organizational Unit (OU) created via admin panel.',
      gpos: { mfa: false, usb: false, screenlock: true, complexity: true },
      items: []
    };
    setOus([...ous, newOu]);
    setNewOuName('');
    setSelectedOuId(newId);
  };

  const handleAddObject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newObjectName.trim()) return;
    const newObj: ADItem = {
      id: `obj-${Date.now()}`,
      name: newObjectName.trim(),
      type: newObjectType,
      role: newObjectType === 'user' ? newObjectRole : undefined,
      os: newObjectType === 'computer' ? 'Windows 11 Pro' : undefined,
      status: 'active'
    };

    setOus(ous.map(ou => {
      if (ou.id === selectedOu.id) {
        return { ...ou, items: [...ou.items, newObj] };
      }
      return ou;
    }));
    setNewObjectName('');
  };

  const toggleGpo = (ouId: string, gpoKey: keyof OU['gpos']) => {
    setOus(ous.map(ou => {
      if (ou.id === ouId) {
        return {
          ...ou,
          gpos: { ...ou.gpos, [gpoKey]: !ou.gpos[gpoKey] }
        };
      }
      return ou;
    }));
  };

  const toggleUserLock = (ouId: string, itemId: string) => {
    setOus(ous.map(ou => {
      if (ou.id === ouId) {
        return {
          ...ou,
          items: ou.items.map(item => {
            if (item.id === itemId) {
              return { ...item, status: item.status === 'active' ? 'locked' : 'active' };
            }
            return item;
          })
        };
      }
      return ou;
    }));
  };

  // --- 3. HELPDESK TICKETS STATE ---
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TKT-2026-081',
      title: 'Executive User VPN Access Failures',
      description: 'MD from Kathmandu corporate office cannot sync with internal AD resources over GlobalProtect VPN.',
      priority: 'critical',
      category: 'Network',
      status: 'assigned',
      assignee: 'Anup Upadhaya',
      createdBy: 'Alina Karki (HR Manager)',
      createdAt: '2026-07-05 02:15',
      logs: [
        'Ticket logged by Alina Karki via SMTP Web Portal.',
        'Automatic Routing matched Network & VPN rules.',
        'Assigned to Tier 2 Lead Anup Upadhaya.',
        '[Anup Upadhaya]: Investigating local routing path and checking firewall log files.'
      ]
    },
    {
      id: 'TKT-2026-082',
      title: 'Active Directory Password Lockout',
      description: 'Financial accounting desk reporting repeated bad password locked out errors on terminal.',
      priority: 'high',
      category: 'Active Directory',
      status: 'open',
      assignee: 'Unassigned',
      createdBy: 'Ram Prasad (Finance Lead)',
      createdAt: '2026-07-05 03:00',
      logs: [
        'Domain controller logged event 4740 (Account Lockout) for ram_finance.',
        'Ticket generated automatically via syslog audit service.'
      ]
    },
    {
      id: 'TKT-2026-083',
      title: 'Pending Patch Compliance kb5034123',
      description: 'Audit report shows Windows cumulative security fix kb5034123 failed on workstation KTM-WS-78.',
      priority: 'medium',
      category: 'Security',
      status: 'resolved',
      assignee: 'Anup Upadhaya',
      createdBy: 'System Monitor Audit Daemon',
      createdAt: '2026-07-04 18:30',
      logs: [
        'Telemetry warning: Host compliance level below SLA target.',
        '[Anup Upadhaya]: Forced manual update deploy using cloud portal script.',
        '[Anup Upadhaya]: Node rebooted. Patch verified. Status updated to compliance standard.'
      ]
    }
  ]);

  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const [newTicketPriority, setNewTicketPriority] = useState<'critical' | 'high' | 'medium' | 'low'>('medium');
  const [newTicketCategory, setNewTicketCategory] = useState<SupportTicket['category']>('Active Directory');
  const [selectedTicketId, setSelectedTicketId] = useState<string>('TKT-2026-081');

  const selectedTicket = useMemo(() => tickets.find(t => t.id === selectedTicketId) || tickets[0], [tickets, selectedTicketId]);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle.trim() || !newTicketDesc.trim()) return;
    const newId = `TKT-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newTkt: SupportTicket = {
      id: newId,
      title: newTicketTitle.trim(),
      description: newTicketDesc.trim(),
      priority: newTicketPriority,
      category: newTicketCategory,
      status: 'open',
      assignee: 'Unassigned',
      createdBy: 'Guest Workspace Session',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      logs: [
        `Ticket created by Guest Workspace Session. Category: ${newTicketCategory}.`,
        'System is dispatching ticket warning alerts to local administrative stack.'
      ]
    };
    setTickets([newTkt, ...tickets]);
    setSelectedTicketId(newId);
    setNewTicketTitle('');
    setNewTicketDesc('');
  };

  const handleAssignToMe = (ticketId: string) => {
    setTickets(tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'assigned',
          assignee: 'Anup Upadhaya',
          logs: [...t.logs, `[Anup Upadhaya]: Took ownership of this incident. Preparing system diagnostics.`]
        };
      }
      return t;
    }));
  };

  const handleResolveTicket = (ticketId: string, notes: string) => {
    setTickets(tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'resolved',
          assignee: 'Anup Upadhaya',
          logs: [...t.logs, `[Anup Upadhaya]: RESOLUTION APPLIED. Details: ${notes}`]
        };
      }
      return t;
    }));
  };

  const handleEscalate = (ticketId: string) => {
    setTickets(tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'escalated',
          logs: [...t.logs, `[System Alert]: Incident escalated to Tier 3 Lead Engineer Core team.`]
        };
      }
      return t;
    }));
  };

  return (
    <section id="tools" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-slate-700 dark:text-slate-350 bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 px-3 py-1 rounded-full w-fit mb-4">
            <Shield className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>IT ENGINEERING UTILITIES LAB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            SysAdmin Operations Sandbox
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Experiment with actual enterprise systems tools designed for subnet division, Active Directory tree management, and ticketing diagnostics.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-200/60 dark:bg-slate-900/80 p-1.5 rounded-xl border border-slate-300/40 dark:border-slate-800 flex space-x-1 w-full max-w-lg shadow-inner">
            <button
              onClick={() => setActiveTab('subnet')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'subnet'
                  ? 'bg-slate-950 dark:bg-slate-850 text-white shadow-md scale-102'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calculator className="h-4 w-4 text-emerald-400" />
              <span>Subnet Calculator</span>
            </button>
            <button
              onClick={() => setActiveTab('ad')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'ad'
                  ? 'bg-slate-950 dark:bg-slate-850 text-white shadow-md scale-102'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="h-4 w-4 text-emerald-400" />
              <span>Active Directory</span>
            </button>
            <button
              onClick={() => setActiveTab('helpdesk')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'helpdesk'
                  ? 'bg-slate-950 dark:bg-slate-850 text-white shadow-md scale-102'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Ticket className="h-4 w-4 text-emerald-400" />
              <span>IT Helpdesk</span>
            </button>
          </div>
        </div>

        {/* --- TAB CONTENT 1: IP SUBNET CALCULATOR --- */}
        {activeTab === 'subnet' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left controls side */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-sm font-mono font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center space-x-2">
                <Network className="h-4 w-4 text-emerald-500" />
                <span>CIDR / VLSM Parameters</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase font-bold text-slate-400 mb-1.5">IPv4 Address Node</label>
                  <input
                    type="text"
                    value={ipInput}
                    onChange={(e) => setIpInput(e.target.value)}
                    placeholder="e.g. 192.168.1.1"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase font-bold text-slate-400 mb-1.5">CIDR Prefix Length (/{cidrInput})</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="0"
                      max="32"
                      value={cidrInput}
                      onChange={(e) => setCidrInput(e.target.value)}
                      className="flex-1 accent-emerald-500"
                    />
                    <input
                      type="number"
                      min="0"
                      max="32"
                      value={cidrInput}
                      onChange={(e) => setCidrInput(e.target.value)}
                      className="w-16 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-1.5 text-center font-mono text-xs font-bold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <span className="block text-[10px] font-mono uppercase font-bold text-slate-400 mb-2">Network Presets</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { setIpInput('192.168.1.0'); setCidrInput('24'); }}
                      className="py-1 px-2.5 rounded bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-350 text-left"
                    >
                      Class C Home (/24)
                    </button>
                    <button
                      onClick={() => { setIpInput('10.0.0.0'); setCidrInput('16'); }}
                      className="py-1 px-2.5 rounded bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-350 text-left"
                    >
                      Class A Corporate (/16)
                    </button>
                    <button
                      onClick={() => { setIpInput('172.16.0.0'); setCidrInput('12'); }}
                      className="py-1 px-2.5 rounded bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-350 text-left"
                    >
                      Class B Private (/12)
                    </button>
                    <button
                      onClick={() => { setIpInput('10.0.2.14'); setCidrInput('23'); }}
                      className="py-1 px-2.5 rounded bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-350 text-left"
                    >
                      DarwinHQ Sandbox (/23)
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                  <label className="block text-[11px] font-mono uppercase font-bold text-slate-400 mb-1.5">VLSM Subnet Planner (Hosts Per Block)</label>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={subdivisionHosts}
                    onChange={(e) => setSubdivisionHosts(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-800 dark:text-white focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block font-mono">
                    Splits the primary prefix block into sub-grids of size {subdivisionHosts} hosts.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Results Dashboard */}
            <div className="lg:col-span-8 space-y-6">
              {/* Bitwise math block */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <h3 className="text-sm font-mono font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-emerald-500" />
                    <span>IP Binary Matrix &amp; Subnet Translation</span>
                  </span>
                  <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                    {subnetResults.class}
                  </span>
                </h3>

                {subnetResults.error ? (
                  <div className="p-4 bg-red-500/15 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono rounded-lg mt-4">
                    {subnetResults.error}
                  </div>
                ) : (
                  <div className="mt-4 space-y-4 font-mono text-xs">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between text-slate-500 mb-0.5">
                        <span>IP Address (Node Value):</span>
                        <span className="text-slate-800 dark:text-white font-bold">{subnetResults.ip}</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded text-[11px] text-slate-500 dark:text-slate-400 break-all select-all font-mono">
                        {subnetResults.ipBinary}
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between text-slate-500 mb-0.5">
                        <span>Network Mask Value:</span>
                        <span className="text-slate-800 dark:text-white font-bold">{subnetResults.mask}</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded text-[11px] text-emerald-600 dark:text-emerald-400 break-all select-all font-bold font-mono">
                        {subnetResults.maskBinary}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Network Address ID</span>
                        <span className="text-slate-900 dark:text-white text-base font-bold">{subnetResults.network}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Broadcast IP Coordinate</span>
                        <span className="text-slate-900 dark:text-white text-base font-bold">{subnetResults.broadcast}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Usable IPv4 Host Range</span>
                        <span className="text-emerald-600 dark:text-emerald-400 text-base font-bold">{subnetResults.range}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Total Usable Hosts</span>
                        <span className="text-slate-900 dark:text-white text-base font-bold">{subnetResults.hosts} nodes</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Wildcard Mask</span>
                        <span className="text-slate-900 dark:text-white text-base font-bold font-mono">{subnetResults.wildcard}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Splits / VLSM table */}
              {!subnetResults.error && subnetSplits.length > 0 && (
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <h3 className="text-sm font-mono font-bold text-slate-800 dark:text-white mb-3 flex items-center space-x-2">
                    <Server className="h-4 w-4 text-emerald-500" />
                    <span>Calculated Subnets Split ({subdivisionHosts} Hosts Req)</span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
                          <th className="py-2 pr-2">#</th>
                          <th className="py-2 px-2">Network ID</th>
                          <th className="py-2 px-2">Usable Host Range</th>
                          <th className="py-2 px-2">Broadcast</th>
                          <th className="py-2 pl-2 text-right">Host Slots</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subnetSplits.map((sub) => (
                          <tr key={sub.index} className="border-b border-slate-50 dark:border-slate-850 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850">
                            <td className="py-2 pr-2 font-bold text-slate-400">{sub.index}</td>
                            <td className="py-2 px-2 text-slate-900 dark:text-white font-semibold">{sub.network} {sub.mask}</td>
                            <td className="py-2 px-2 text-emerald-600 dark:text-emerald-400 font-semibold">{sub.range}</td>
                            <td className="py-2 px-2">{sub.broadcast}</td>
                            <td className="py-2 pl-2 text-right font-bold text-slate-900 dark:text-white">{sub.totalHosts}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB CONTENT 2: ACTIVE DIRECTORY CONTROLLER SIMULATOR --- */}
        {activeTab === 'ad' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
            {/* Tree Side panel - OUs */}
            <div className="md:w-1/3 border-r border-slate-100 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-between">
                <span>Organizational Units</span>
                <span className="text-[10px] text-slate-500 font-bold font-mono">Domain Root</span>
              </h3>

              <div className="flex-1 space-y-1.5 overflow-y-auto">
                {ous.map(ou => (
                  <button
                    key={ou.id}
                    onClick={() => setSelectedOuId(ou.id)}
                    className={`w-full text-left p-3 rounded-xl border flex flex-col transition-all cursor-pointer ${
                      selectedOuId === ou.id
                        ? 'bg-slate-950 dark:bg-slate-850 border-slate-900 dark:border-slate-800 text-white shadow'
                        : 'bg-white dark:bg-slate-950 border-slate-200/60 dark:border-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-350'
                    }`}
                  >
                    <span className="text-xs font-bold font-mono block truncate">{ou.name}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 truncate block">{ou.description}</span>
                    <span className="text-[10px] font-mono mt-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 w-fit">
                      {ou.items.length} accounts
                    </span>
                  </button>
                ))}
              </div>

              {/* Add OU form */}
              <form onSubmit={handleAddOu} className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="New OU Name..."
                  value={newOuName}
                  onChange={(e) => setNewOuName(e.target.value)}
                  className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-800 dark:text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 p-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Create OU block"
                >
                  <Plus className="h-4 w-4 font-bold" />
                </button>
              </form>
            </div>

            {/* Middle panel - Objects inside selected OU */}
            <div className="flex-1 p-5 flex flex-col border-r border-slate-100 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4 gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <Server className="h-4 w-4 text-emerald-400" />
                    <span>{selectedOu.name}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{selectedOu.description}</p>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search OU accounts..."
                    value={adSearch}
                    onChange={(e) => setAdSearch(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs font-mono focus:outline-none"
                  />
                  <Search className="absolute left-2.5 top-1.5 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>

              {/* Objects list */}
              <div className="flex-1 space-y-2 overflow-y-auto max-h-[300px]">
                {selectedOu.items
                  .filter(item => item.name.toLowerCase().includes(adSearch.toLowerCase()))
                  .map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850 hover:border-slate-350 dark:hover:border-slate-750 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          item.type === 'user' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}>
                          {item.type === 'user' ? 'U' : 'C'}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white font-mono flex items-center space-x-1.5">
                            <span>{item.name}</span>
                            {item.status === 'locked' && (
                              <span className="text-[9px] bg-red-500/10 text-red-500 px-1.5 rounded uppercase font-bold">LOCKED</span>
                            )}
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block">
                            {item.type === 'user' ? `Role: ${item.role}` : `OS: ${item.os}`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleUserLock(selectedOu.id, item.id)}
                          className={`px-2.5 py-1 text-[10px] font-mono font-semibold rounded border transition-colors cursor-pointer ${
                            item.status === 'locked'
                              ? 'bg-red-500/15 text-red-500 border-red-500/20 hover:bg-red-500/25'
                              : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/25'
                          }`}
                        >
                          {item.status === 'locked' ? 'Unlock Account' : 'Disable/Lock'}
                        </button>
                      </div>
                    </div>
                  ))}

                {selectedOu.items.length === 0 && (
                  <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs font-mono">
                    No directory account resources found in this OU. Create one below!
                  </div>
                )}
              </div>

              {/* Add user/computer form */}
              <form onSubmit={handleAddObject} className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-3">
                  <select
                    value={newObjectType}
                    onChange={(e) => setNewObjectType(e.target.value as 'user' | 'computer')}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs font-mono text-slate-800 dark:text-white"
                  >
                    <option value="user">User Account</option>
                    <option value="computer">Computer Account</option>
                  </select>
                </div>
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    required
                    placeholder={newObjectType === 'user' ? 'Full Name (e.g. John Doe)' : 'Hostname (e.g. KTM-WS-02)'}
                    value={newObjectName}
                    onChange={(e) => setNewObjectName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs font-mono"
                  />
                </div>
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    disabled={newObjectType !== 'user'}
                    placeholder="Role (e.g. Accountant)"
                    value={newObjectRole}
                    onChange={(e) => setNewObjectRole(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs font-mono disabled:opacity-50"
                  />
                </div>
                <div className="sm:col-span-1">
                  <button
                    type="submit"
                    className="w-full h-full bg-slate-950 hover:bg-slate-850 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 p-2 rounded-lg flex items-center justify-center transition-colors cursor-pointer font-bold text-xs"
                    title="Add to Active Directory"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>

            {/* Right side - active GPOs applied */}
            <div className="md:w-1/4 p-5 bg-slate-50/20 dark:bg-slate-900/10 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center space-x-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Applied GPO Policies</span>
                </h3>
                <p className="text-[10px] text-slate-400 mb-4 font-mono">
                  Policies enforced at the selected OU level filter down to child accounts automatically.
                </p>

                <div className="space-y-3">
                  {/* GPO 1 */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
                    <div>
                      <span className="text-xs font-bold block font-mono text-slate-800 dark:text-white">Require Admin MFA</span>
                      <span className="text-[9px] text-slate-400 font-mono block">Multi-Factor Authenticator GPO</span>
                    </div>
                    <button
                      onClick={() => toggleGpo(selectedOu.id, 'mfa')}
                      className={`h-5 w-10 rounded-full p-0.5 transition-colors cursor-pointer ${
                        selectedOu.gpos.mfa ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-800'
                      }`}
                    >
                      <div className={`bg-white dark:bg-slate-900 h-4 w-4 rounded-full shadow-md transform transition-transform ${
                        selectedOu.gpos.mfa ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  {/* GPO 2 */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
                    <div>
                      <span className="text-xs font-bold block font-mono text-slate-800 dark:text-white">Block Removable Storage</span>
                      <span className="text-[9px] text-slate-400 font-mono block">USB Mass-Storage block policy</span>
                    </div>
                    <button
                      onClick={() => toggleGpo(selectedOu.id, 'usb')}
                      className={`h-5 w-10 rounded-full p-0.5 transition-colors cursor-pointer ${
                        selectedOu.gpos.usb ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-800'
                      }`}
                    >
                      <div className={`bg-white dark:bg-slate-900 h-4 w-4 rounded-full shadow-md transform transition-transform ${
                        selectedOu.gpos.usb ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  {/* GPO 3 */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
                    <div>
                      <span className="text-xs font-bold block font-mono text-slate-800 dark:text-white">Idle Screenlock 15m</span>
                      <span className="text-[9px] text-slate-400 font-mono block">Auto logout session GPO</span>
                    </div>
                    <button
                      onClick={() => toggleGpo(selectedOu.id, 'screenlock')}
                      className={`h-5 w-10 rounded-full p-0.5 transition-colors cursor-pointer ${
                        selectedOu.gpos.screenlock ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-800'
                      }`}
                    >
                      <div className={`bg-white dark:bg-slate-900 h-4 w-4 rounded-full shadow-md transform transition-transform ${
                        selectedOu.gpos.screenlock ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  {/* GPO 4 */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
                    <div>
                      <span className="text-xs font-bold block font-mono text-slate-800 dark:text-white">Password Complexity</span>
                      <span className="text-[9px] text-slate-400 font-mono block">Enforce uppercase/special/nums</span>
                    </div>
                    <button
                      onClick={() => toggleGpo(selectedOu.id, 'complexity')}
                      className={`h-5 w-10 rounded-full p-0.5 transition-colors cursor-pointer ${
                        selectedOu.gpos.complexity ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-800'
                      }`}
                    >
                      <div className={`bg-white dark:bg-slate-900 h-4 w-4 rounded-full shadow-md transform transition-transform ${
                        selectedOu.gpos.complexity ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
                  <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                  <span>Domain secure sync ACTIVE. Policy modifications deploy to DCs in real-time.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB CONTENT 3: SUPPORT HELPDESK & TICKETING SYSTEM --- */}
        {activeTab === 'helpdesk' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left tickets list sidebar */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                <h3 className="text-sm font-mono font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                  <Ticket className="h-4 w-4 text-emerald-500" />
                  <span>Active Service Tickets</span>
                </h3>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 font-bold px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">
                  {tickets.length} Incidents
                </span>
              </div>

              {/* Add Ticket Form Trigger */}
              <div className="space-y-2 overflow-y-auto max-h-[350px]">
                {tickets.map(tkt => (
                  <button
                    key={tkt.id}
                    onClick={() => setSelectedTicketId(tkt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border flex flex-col transition-all cursor-pointer ${
                      selectedTicketId === tkt.id
                        ? 'bg-slate-950 dark:bg-slate-850 border-slate-900 dark:border-slate-800 text-white shadow'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-900 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 truncate">{tkt.id}</span>
                      <span className={`text-[9px] font-bold px-2 rounded font-mono uppercase ${
                        tkt.priority === 'critical'
                          ? 'bg-red-500/20 text-red-500'
                          : tkt.priority === 'high'
                          ? 'bg-amber-500/20 text-amber-500'
                          : tkt.priority === 'medium'
                          ? 'bg-blue-500/20 text-blue-500'
                          : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {tkt.priority}
                      </span>
                    </div>

                    <span className="text-xs font-bold block mt-1 truncate">{tkt.title}</span>

                    <div className="flex items-center justify-between w-full mt-2 border-t border-slate-100/10 dark:border-slate-800 pt-2 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                      <span>Cat: {tkt.category}</span>
                      <span className={`font-bold uppercase ${
                        tkt.status === 'resolved'
                          ? 'text-emerald-500'
                          : tkt.status === 'assigned'
                          ? 'text-blue-500'
                          : tkt.status === 'escalated'
                          ? 'text-purple-500'
                          : 'text-amber-500 animate-pulse'
                      }`}>
                        ● {tkt.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Lodge/Create Ticket panel inside left */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <span className="block text-[11px] font-mono uppercase font-bold text-slate-400 mb-3">Lodge Support Ticket</span>
                <form onSubmit={handleCreateTicket} className="space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Incident Category</label>
                      <select
                        value={newTicketCategory}
                        onChange={(e) => setNewTicketCategory(e.target.value as SupportTicket['category'])}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded p-1.5 focus:outline-none"
                      >
                        <option value="Active Directory">Active Directory</option>
                        <option value="Network">Network</option>
                        <option value="Security">Security</option>
                        <option value="Hardware/Software">Hardware/Software</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Priority</label>
                      <select
                        value={newTicketPriority}
                        onChange={(e) => setNewTicketPriority(e.target.value as SupportTicket['priority'])}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded p-1.5 focus:outline-none"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                        <option value="critical">Critical Severity</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Title of technical issue..."
                      value={newTicketTitle}
                      onChange={(e) => setNewTicketTitle(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded p-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      placeholder="Describe symptoms, locked messages, or failing workstation details..."
                      value={newTicketDesc}
                      onChange={(e) => setNewTicketDesc(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded p-2 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded font-bold font-mono text-[10px] tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Submit Ticket Request
                  </button>
                </form>
              </div>
            </div>

            {/* Right Ticket Diagnostics Monitor */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-[500px]">
              <div>
                {/* Heading */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Incident Tracker Id: <strong className="text-slate-800 dark:text-white font-mono">{selectedTicket.id}</strong></span>
                    <span>Created: {selectedTicket.createdAt}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2 flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{selectedTicket.title}</span>
                  </h3>
                  <div className="flex items-center space-x-3 mt-2 text-xs font-mono text-slate-500">
                    <span>Requester: <strong className="text-slate-700 dark:text-slate-300">{selectedTicket.createdBy}</strong></span>
                    <span>•</span>
                    <span>Assignee: <strong className="text-slate-700 dark:text-slate-300">{selectedTicket.assignee}</strong></span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850 mb-6 font-mono text-xs text-slate-600 dark:text-slate-300">
                  <span className="block font-bold text-slate-400 text-[10px] uppercase mb-1">Issue Overview &amp; Systems Context</span>
                  {selectedTicket.description}
                </div>

                {/* Ticket Audit Log History */}
                <div className="space-y-3">
                  <span className="block font-bold text-slate-400 text-[10px] uppercase font-mono mb-2">Helpdesk Audit Trail / logs</span>
                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl font-mono text-xs text-slate-300 space-y-2 max-h-[180px] overflow-y-auto">
                    {selectedTicket.logs.map((log, index) => (
                      <div key={index} className="flex items-start space-x-1.5">
                        <span className="text-slate-600 font-bold select-none">&gt;&gt;</span>
                        <p className={`leading-relaxed ${log.startsWith('[Anup') ? 'text-emerald-400' : 'text-slate-300'}`}>{log}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Triage action triggers */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="block font-bold text-slate-400 text-[10px] uppercase font-mono mb-3">Triage Engineering Actions</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    disabled={selectedTicket.assignee === 'Anup Upadhaya'}
                    onClick={() => handleAssignToMe(selectedTicket.id)}
                    className="py-2.5 px-3 bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-50 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 rounded-lg flex items-center justify-center space-x-1.5 border border-slate-200/60 dark:border-slate-800 transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Assign to Anup</span>
                  </button>

                  <button
                    disabled={selectedTicket.status === 'escalated'}
                    onClick={() => handleEscalate(selectedTicket.id)}
                    className="py-2.5 px-3 bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-50 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 rounded-lg flex items-center justify-center space-x-1.5 border border-slate-200/60 dark:border-slate-800 transition-colors cursor-pointer"
                  >
                    <AlertTriangle className="h-3.5 w-3.5 text-purple-500" />
                    <span>Escalate to Tier 3</span>
                  </button>

                  <button
                    disabled={selectedTicket.status === 'resolved'}
                    onClick={() => {
                      const res = prompt('Enter resolution notes applied to helpdesk event log:');
                      if (res) handleResolveTicket(selectedTicket.id, res);
                    }}
                    className="py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 disabled:opacity-50 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center space-x-1.5 border border-emerald-500/20 transition-all cursor-pointer"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Mark as Resolved</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
