import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Server, Laptop, Cloud, Network, Terminal, CheckCircle2, 
  RefreshCw, Key, Activity
} from 'lucide-react';

export default function ActiveDirectorySandbox() {
  const [selectedNode, setSelectedNode] = useState('dc');
  const [activeSimulation, setActiveSimulation] = useState(null);
  const [simulationLogs, setSimulationLogs] = useState([
    "System Initialized. Active Directory Domain: DarwinNepal.onmicrosoft.com",
    "All virtualization services online (Oracle VM VirtualBox).",
    "Domain Controller [10.0.2.14] is responding to heartbeat queries.",
    "Windows 11 client [10.0.2.15] connected and authenticated.",
    "Action1 Cloud Patch Console connection: SECURE & STABLE.",
    "Ready to run simulation routines. Select a routine below."
  ]);
  const [patchCompliance, setPatchCompliance] = useState(75);
  const [isPatching, setIsPatching] = useState(false);
  const [pingPulse, setPingPulse] = useState(false);
  const terminalEndRef = useRef(null);

  const nodes = {
    dc: {
      id: 'dc',
      name: 'DarwinNepal-DC01',
      type: 'server',
      ip: '10.0.2.14',
      os: 'Windows Server 2022 Standard',
      status: isPatching && activeSimulation === 'patch' ? 'updating' : 'online',
      details: [
        "Active Directory Domain Services (AD DS) - Domain Controller",
        "Preferred DNS Server for private subnet (10.0.2.0/24)",
        "Configured GPOs: Password Complexity, Desktop Wallpaper restriction, WinRM Enabled",
        "Hosts local DHCP scope: Range 10.0.2.50 - 10.0.2.150",
        "LDAP Services: Operational on Port 389",
        "Global Catalog Server: Enabled"
      ],
      specs: {
        cpu: "2 Cores (Intel Xeon Silver Xeon E5 V4 allocated)",
        ram: "4 GB DDR4 RAM",
        storage: "60 GB virtual VDI disk on physical NVMe cache layer"
      }
    },
    client: {
      id: 'client',
      name: 'DarwinNepal-WS11',
      type: 'workstation',
      ip: '10.0.2.15 (DHCP)',
      os: 'Windows 11 Pro (23H2)',
      status: isPatching && activeSimulation === 'patch' ? 'updating' : 'online',
      details: [
        "Joined to domain: DarwinNepal.onmicrosoft.com",
        "DNS queries directed straight to Domain Controller (10.0.2.14)",
        "Offline deployment bypass completed successfully using OOBE\\BYPASSNRO",
        "Fitted with Action1 Cloud Endpoint Management Agent",
        "Security configuration: WinRM authorized, SMBv1 disabled, UAC enforced"
      ],
      specs: {
        cpu: "2 Cores (Hypervisor optimized)",
        ram: "4 GB RAM",
        storage: "50 GB virtual disk with dynamic allocations"
      }
    },
    action1: {
      id: 'action1',
      name: 'Action1 Cloud Console',
      type: 'cloud',
      ip: 'Portal (SaaS / SSL)',
      os: 'Cloud Service Dashboard',
      status: 'online',
      details: [
        "Dual-homed network setup routes DC telemetry securely to cloud portal",
        "Active patch catalog synchronization: Up-to-date",
        "Tracks software inventories, vulnerability analysis, and critical hotfixes",
        "Monitors 2 endpoints: 10.0.2.14 and 10.0.2.15",
        "Automated deployment schedule: Weekly security rollup audits"
      ],
      specs: {
        cpu: "Elastic Serverless Cloud Engine",
        ram: "SaaS Multi-tenant allocation",
        storage: "Cloud-hosted database"
      }
    },
    gateway: {
      id: 'gateway',
      name: 'Dual-Homed NAT Gateway',
      type: 'gateway',
      ip: '10.0.2.1 (Local) / WAN DHCP',
      os: 'Host VM NAT Driver',
      status: 'online',
      details: [
        "Provides network isolation with controlled internet access",
        "Secondary adapter on host controller allows restricted internet breakout",
        "Filters ports: Standard HTTP (80) & HTTPS (443) only",
        "Inbound firewall configured to reject all unsolicited WAN packets",
        "Ensures isolated Windows AD domain does not leak traffic to production subnet"
      ],
      specs: {
        cpu: "Host CPU Pass-through",
        ram: "Kernel network buffer",
        storage: "Diskless forwarding"
      }
    }
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [simulationLogs]);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setSimulationLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const runADCheck = () => {
    if (activeSimulation) return;
    setActiveSimulation('ad_check');
    addLog("--- Starting Active Directory Domain Services Health Check ---");
    addLog("Executing LDAP operational query to DarwinNepal.onmicrosoft.com...");
    
    setTimeout(() => {
      addLog("LDAP query successful. Connection established to RootDSE.");
      addLog("Verifying SYSVOL and NETLOGON shares availability...");
    }, 1000);

    setTimeout(() => {
      addLog("SUCCESS: \\\\DarwinNepal-DC01\\SYSVOL share path resolved locally.");
      addLog("Checking DNS resolution for SRV records: _ldap._tcp.dc._msdcs.DarwinNepal.onmicrosoft.com");
    }, 2200);

    setTimeout(() => {
      addLog("DNS resolution verified: Primary Domain Controller resolved to 10.0.2.14.");
      addLog("Auditing active GPO replication status on client DarwinNepal-WS11...");
    }, 3400);

    setTimeout(() => {
      addLog("GPO sync: Status OK. Last synchronization took place 14 mins ago. 0 errors detected.");
      addLog("--- AD DS Status: HEALTHY, ACTIVE, SECURE (100% replication) ---");
      setActiveSimulation(null);
    }, 4500);
  };

  const runPingSimulation = () => {
    if (activeSimulation) return;
    setActiveSimulation('ping');
    setPingPulse(true);
    addLog("--- Initiating DNS & ICMP Routing Diagnostics ---");
    addLog("Source: Windows 11 Client (10.0.2.15) -> Destination: DarwinNepal-DC01 (10.0.2.14)");
    addLog("Executing command: ping DarwinNepal.onmicrosoft.com -n 4");

    setTimeout(() => {
      addLog("Pinging DarwinNepal.onmicrosoft.com [10.0.2.14] with 32 bytes of data:");
    }, 800);

    let count = 1;
    const interval = setInterval(() => {
      if (count <= 4) {
        addLog(`Reply from 10.0.2.14: bytes=32 time<1ms TTL=128 (Request ${count})`);
        count++;
      } else {
        clearInterval(interval);
        addLog("Ping statistics for 10.0.2.14:");
        addLog("    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)");
        addLog("Approximate round trip times in milli-seconds: Minimum = 0ms, Maximum = 0ms, Average = 0ms");
        addLog("DNS routing resolution: DarwinNepal.onmicrosoft.com resolved correctly via Active Directory DNS.");
        addLog("--- ICMP Routing Diagnostics: STABLE ---");
        setPingPulse(false);
        setActiveSimulation(null);
      }
    }, 1200);
  };

  const runPatchManagement = () => {
    if (activeSimulation) return;
    setActiveSimulation('patch');
    setIsPatching(true);
    addLog("--- Deploying Security Patches via Action1 Cloud Console ---");
    addLog("Target Group: Sandbox-Domain-Endpoints (2 Active)");
    addLog("Vulnerability scanned: KB5031354 (Cumulative Security Update for Windows Server & Windows 11)");
    addLog("Vulnerability status: CRITICAL - EXPOSED TO LOCAL BUFFER EXPLOIT");
    addLog("Initializing secure secure-tunnel endpoint deployment...");

    setTimeout(() => {
      addLog("Tunnel established. Downloading package KB5031354 on DarwinNepal-DC01 and DarwinNepal-WS11...");
    }, 1500);

    setTimeout(() => {
      addLog("Download complete. Staging update. Stopping system services: wuauserv, cryptsvc...");
    }, 3200);

    setTimeout(() => {
      addLog("Applying update block. Executing secure cabinet extraction...");
    }, 4500);

    setTimeout(() => {
      addLog("Finalizing installation. Starting background service checks. Re-enabling Windows Update engine...");
      setPatchCompliance(100);
    }, 6000);

    setTimeout(() => {
      addLog("Deploy outcome: SUCCESS on 2/2 targets. KB5031354 active.");
      addLog("--- Endpoint Compliance: 100% SECURE & RECONCILED ---");
      setIsPatching(false);
      setActiveSimulation(null);
    }, 7200);
  };

  const runOOBEBypass = () => {
    if (activeSimulation) return;
    setActiveSimulation('oobe');
    addLog("--- Simulating Network-Isolated OOBE Bypass Routine ---");
    addLog("Loading Windows 11 installation system environment...");
    addLog("Out-of-Box Experience (OOBE) initialized. Network connection required prompt active.");

    setTimeout(() => {
      addLog("Intervention triggered: Pressing Shift + F10 to launch command prompt shell...");
    }, 1000);

    setTimeout(() => {
      addLog("CLI: C:\\Windows\\System32\\oobe>");
      addLog("CLI: Executing command 'BYPASSNRO'");
    }, 2200);

    setTimeout(() => {
      addLog("System command registry key set: HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OOBE\\BypassNRO = 1");
      addLog("Rebooting workstation environment in isolation...");
    }, 3400);

    setTimeout(() => {
      addLog("Workstation rebooted. Setup screen shows 'I don't have internet' link enabled.");
      addLog("Bypass outcome: Workstation account created successfully (Local Offline Admin: AnupUpadhaya).");
      addLog("--- OOBE BYPASS SIMULATION: COMPLETED ---");
      setActiveSimulation(null);
    }, 4800);
  };

  const clearLogs = () => {
    setSimulationLogs([
      "Logs cleared. Systems monitoring active.",
      "Domain Controller [10.0.2.14] and Client Workstation [10.0.2.15] are ready."
    ]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden p-6 text-slate-100" id="ad-sandbox">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-slate-800 pb-4 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="font-sans font-bold text-lg md:text-xl text-white">Active Directory & Patch Sandbox</h3>
          </div>
          <p className="text-slate-400 text-xs md:text-sm font-sans mt-0.5">
            Interactive system architecture representing Anup's custom homelab configuration.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-mono flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-blue-400" />
            <span>AD DOMAIN: <strong>DarwinNepal.onmicrosoft.com</strong></span>
          </div>
          <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-mono flex items-center gap-2">
            <RefreshCw className={`h-3.5 w-3.5 text-emerald-400 ${activeSimulation ? 'animate-spin' : ''}`} />
            <span>PATCH COMPLIANCE: <strong className={patchCompliance === 100 ? 'text-emerald-400' : 'text-amber-400'}>{patchCompliance}%</strong></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* NETWORK TOPOLOGY VISUALIZATION */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 rounded-xl border border-slate-800 p-5 relative overflow-hidden min-h-[380px] md:min-h-[440px]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-[0.15]"></div>
          
          <div className="relative z-10 flex justify-between items-center text-xs text-slate-500 font-mono mb-4">
            <span>NETWORK DIAGRAM (10.0.2.0/24 Subnet)</span>
            <span>Interactive Elements: Click to inspect</span>
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-center items-center py-6">
            {/* Action1 Cloud */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedNode('action1')}
              className={`cursor-pointer flex flex-col items-center p-3 rounded-lg border transition-all relative ${
                selectedNode === 'action1' ? 'bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-500/10' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="bg-blue-500/10 p-2.5 rounded-lg border border-blue-500/20 text-blue-400">
                <Cloud className="h-6 w-6" />
              </div>
              <span className="text-white font-semibold text-xs mt-2 font-sans">Action1 Cloud Console</span>
              <span className="text-[10px] text-slate-400 font-mono">SaaS Dashboard</span>
              
              {isPatching && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-sans font-medium animate-pulse flex items-center gap-1">
                  <RefreshCw className="h-2 w-2 animate-spin" /> Patching
                </span>
              )}
            </motion.div>

            <div className="w-[2px] h-8 bg-slate-800 relative">
              {isPatching && (
                <motion.div 
                  initial={{ top: 0 }}
                  animate={{ top: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute left-[-2px] w-1.5 h-1.5 rounded-full bg-blue-400"
                ></motion.div>
              )}
            </div>

            {/* Gateway Node */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedNode('gateway')}
              className={`cursor-pointer flex flex-col items-center p-2.5 rounded-lg border transition-all ${
                selectedNode === 'gateway' ? 'bg-indigo-950/40 border-indigo-500 shadow-lg' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/20 text-indigo-400">
                <Network className="h-5 w-5" />
              </div>
              <span className="text-white font-medium text-[11px] mt-1.5 font-sans">NAT Gateway</span>
              <span className="text-[9px] text-slate-400 font-mono">Host Controller NAT</span>
            </motion.div>

            <div className="w-full max-w-[280px] flex justify-between items-center px-4 relative mt-1">
              <div className="flex-1 h-[2px] bg-slate-800 relative origin-right">
                {pingPulse && (
                  <motion.div 
                    initial={{ left: '100%' }}
                    animate={{ left: '0%' }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="absolute top-[-3px] w-2 h-2 rounded-full bg-emerald-400"
                  ></motion.div>
                )}
              </div>
              <div className="w-[2px] h-6 bg-slate-800"></div>
              <div className="flex-1 h-[2px] bg-slate-800 relative origin-left">
                {pingPulse && (
                  <motion.div 
                    initial={{ left: '0%' }}
                    animate={{ left: '100%' }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="absolute top-[-3px] w-2 h-2 rounded-full bg-emerald-400"
                  ></motion.div>
                )}
              </div>
            </div>

            <div className="w-full max-w-[320px] h-[2px] bg-slate-800 flex justify-between relative">
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-[8px] bg-slate-950 px-1 text-slate-600 font-mono">
                SUBNET: 10.0.2.0 / 24
              </span>
            </div>

            <div className="w-full max-w-[280px] flex justify-between px-4 h-4">
              <div className="w-[2px] h-full bg-slate-800"></div>
              <div className="w-[2px] h-full bg-slate-800"></div>
            </div>

            <div className="w-full max-w-[340px] flex justify-between items-start gap-4">
              {/* Domain Controller */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedNode('dc')}
                className={`flex-1 cursor-pointer flex flex-col items-center p-3 rounded-lg border transition-all text-center relative ${
                  selectedNode === 'dc' ? 'bg-sky-950/40 border-sky-500 shadow-lg shadow-sky-500/10' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="bg-sky-500/10 p-2.5 rounded-lg border border-sky-500/20 text-sky-400">
                  <Server className="h-6 w-6" />
                </div>
                <span className="text-white font-semibold text-xs mt-2 font-sans">Domain Controller</span>
                <span className="text-[10px] text-slate-400 font-mono">10.0.2.14</span>
                <span className="text-[8px] mt-0.5 bg-sky-950 border border-sky-800 text-sky-400 px-1.5 py-0.5 rounded font-mono">
                  Windows Server 2022
                </span>
                
                <span className="absolute bottom-2 right-2 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500"></span>
                </span>
              </motion.div>

              {/* Client Workstation */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedNode('client')}
                className={`flex-1 cursor-pointer flex flex-col items-center p-3 rounded-lg border transition-all text-center relative ${
                  selectedNode === 'client' ? 'bg-teal-950/40 border-teal-500 shadow-lg shadow-teal-500/10' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="bg-teal-500/10 p-2.5 rounded-lg border border-teal-500/20 text-teal-400">
                  <Laptop className="h-6 w-6" />
                </div>
                <span className="text-white font-semibold text-xs mt-2 font-sans">Workstation 11</span>
                <span className="text-[10px] text-slate-400 font-mono">10.0.2.15 (DHCP)</span>
                <span className="text-[8px] mt-0.5 bg-teal-950 border border-teal-800 text-teal-400 px-1.5 py-0.5 rounded font-mono">
                  Windows 11 Client
                </span>

                <span className="absolute bottom-2 right-2 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500"></span>
                </span>
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 border-t border-slate-800 pt-3 mt-4 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-[10px] text-slate-500 font-sans">VIRTUAL HYPERVISOR</div>
              <div className="text-xs font-semibold text-slate-300 font-mono">VirtualBox 7.0</div>
            </div>
            <div className="border-x border-slate-800">
              <div className="text-[10px] text-slate-500 font-sans">DNS RESOLUTION</div>
              <div className="text-xs font-semibold text-emerald-400 font-mono">100% HEALTHY</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-sans">ACTIVE GP_OBJECTS</div>
              <div className="text-xs font-semibold text-slate-300 font-mono">5 Enforced</div>
            </div>
          </div>
        </div>

        {/* DETAILS & LIVE CONTROL PANEL */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                {nodes[selectedNode].type === 'server' && <Server className="h-5 w-5 text-sky-400" />}
                {nodes[selectedNode].type === 'workstation' && <Laptop className="h-5 w-5 text-teal-400" />}
                {nodes[selectedNode].type === 'cloud' && <Cloud className="h-5 w-5 text-blue-400" />}
                {nodes[selectedNode].type === 'gateway' && <Network className="h-5 w-5 text-indigo-400" />}
                <h4 className="font-sans font-bold text-sm text-white">{nodes[selectedNode].name}</h4>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs font-mono border-b border-slate-800/80 pb-2.5">
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">IP Address</span>
                    <span className="text-slate-300">{nodes[selectedNode].ip}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">Operating System</span>
                    <span className="text-slate-300">{nodes[selectedNode].os}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 font-sans text-[10px] block mb-1 uppercase font-semibold">Allocated HW Specs:</span>
                  <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono text-slate-400 bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
                    <div>
                      <span className="text-[8px] text-slate-600 block">CPU</span>
                      <span className="truncate block font-semibold text-slate-300" title={nodes[selectedNode].specs.cpu}>
                        {nodes[selectedNode].specs.cpu.split(' ')[0]} Cores
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-600 block">RAM</span>
                      <span className="font-semibold text-slate-300">{nodes[selectedNode].specs.ram.split(' ')[0]} GB</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-600 block">Disk Type</span>
                      <span className="font-semibold text-slate-300">SSD Cache</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 font-sans text-[10px] block mb-1.5 uppercase font-semibold">Active Configurations & Details:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                    {nodes[selectedNode].details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/80 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/60 text-[10px] text-slate-400 italic">
              *Designed as part of Anup's custom homelab replication of an enterprise Windows environment.
            </div>
          </div>

          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">
            <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider mb-3">Trigger Sandbox Routines</h4>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={runADCheck}
                disabled={!!activeSimulation}
                className="flex items-center gap-2 justify-center text-left p-2.5 rounded-lg text-xs font-sans font-medium transition-all bg-sky-950/40 border border-sky-900 hover:bg-sky-900/40 text-sky-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Activity className="h-4 w-4 text-sky-400" />
                <span>AD Health Check</span>
              </button>

              <button 
                onClick={runPingSimulation}
                disabled={!!activeSimulation}
                className="flex items-center gap-2 justify-center text-left p-2.5 rounded-lg text-xs font-sans font-medium transition-all bg-emerald-950/40 border border-emerald-900 hover:bg-emerald-900/40 text-emerald-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span>Ping Diagnostic</span>
              </button>

              <button 
                onClick={runPatchManagement}
                disabled={!!activeSimulation}
                className="flex items-center gap-2 justify-center text-left p-2.5 rounded-lg text-xs font-sans font-medium transition-all bg-blue-950/40 border border-blue-900 hover:bg-blue-900/40 text-blue-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed col-span-2"
              >
                <RefreshCw className={`h-4 w-4 text-blue-400 ${activeSimulation === 'patch' ? 'animate-spin' : ''}`} />
                <span>Deploy Cloud Patches (Action1)</span>
              </button>

              <button 
                onClick={runOOBEBypass}
                disabled={!!activeSimulation}
                className="flex items-center gap-2 justify-center text-left p-2.5 rounded-lg text-xs font-sans font-medium transition-all bg-indigo-950/40 border border-indigo-900 hover:bg-indigo-900/40 text-indigo-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed col-span-2"
              >
                <Key className="h-4 w-4 text-indigo-400" />
                <span>Show Offline OOBE Bypass (`BYPASSNRO`)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CLI SIMULATED TERMINAL */}
      <div className="mt-6 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs h-[180px]">
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] text-slate-500 uppercase ml-2">Console Shell v1.0</span>
          </div>
          <button 
            onClick={clearLogs}
            className="text-[10px] font-sans bg-slate-800 hover:bg-slate-700 hover:text-white px-2.5 py-0.5 rounded transition-all"
          >
            Clear Screen
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-1 text-slate-300 bg-slate-950">
          {simulationLogs.map((log, index) => (
            <div key={index} className="leading-relaxed whitespace-pre-wrap">
              {log.startsWith('---') ? (
                <span className="text-amber-400 font-semibold">{log}</span>
              ) : log.includes('SUCCESS') || log.includes('healthy') || log.includes('Reply from') || log.includes('HEALTHY') || log.includes('STABLE') ? (
                <span className="text-emerald-400">{log}</span>
              ) : log.includes('CRITICAL') || log.includes('errors detected') || log.includes('Vulnerability status') ? (
                <span className="text-rose-400">{log}</span>
              ) : (
                <span className="text-slate-300">{log}</span>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
}
