import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Network, BarChart, Code2, ServerCrash, Layers, HelpCircle, Terminal, Play, ShieldAlert, Cpu, CheckCircle, AlertCircle, RefreshCw, Folder, ChevronRight, User, FileText, Check, ShieldCheck } from 'lucide-react';
import { projects } from '../data';
import { Project } from '../types';

export default function ProjectsSection() {
  const [filter, setFilter] = useState<'all' | 'systems_networking' | 'data_analytics' | 'software_dev'>('all');

  // Interactive Sandbox simulation state
  const [sandboxTab, setSandboxTab] = useState<'topology' | 'gpo' | 'patch'>('topology');
  const [selectedNode, setSelectedNode] = useState<'dc' | 'client' | 'patch' | 'gateway'>('dc');
  const [pingLog, setPingLog] = useState<string[]>([]);
  const [isPinging, setIsPinging] = useState(false);
  const [selectedADItem, setSelectedADItem] = useState<string>('gpo1');

  // Patch automation simulation state
  const [patchCompliance, setPatchCompliance] = useState<number>(83);
  const [isDeployingPatches, setIsDeployingPatches] = useState(false);
  const [patchDeployLogs, setPatchDeployLogs] = useState<string[]>([]);

  const runPingTest = (ip: string) => {
    if (isPinging) return;
    setIsPinging(true);
    setPingLog([]);
    
    const lines = [
      `C:\\Users\\Guest> ping ${ip} -n 4`,
      `Pinging ${ip} with 32 bytes of data:`,
      `Reply from ${ip}: bytes=32 time=1ms TTL=128`,
      `Reply from ${ip}: bytes=32 time<1ms TTL=128`,
      `Reply from ${ip}: bytes=32 time=2ms TTL=128`,
      `Reply from ${ip}: bytes=32 time=1ms TTL=128`,
      ``,
      `Ping statistics for ${ip}:`,
      `    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),`,
      `Approximate round trip times in milli-seconds:`,
      `    Minimum = 0ms, Maximum = 2ms, Average = 1ms`
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setPingLog(prev => [...prev, lines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setIsPinging(false);
      }
    }, 150);
  };

  const deployPatches = () => {
    if (isDeployingPatches) return;
    setIsDeployingPatches(true);
    setPatchDeployLogs([]);
    
    const logTimeline = [
      "[Action1 Client] Connecting to endpoints...",
      "[Action1 Client] Initiating secure authentication with agent nodes...",
      "[Action1 Client] Target: Win11Client01 [Active Domain Member]",
      "[Action1 Client] Pending Update Stage: KB5034123 (Critical Windows Cumulative Update)...",
      "[Action1 Client] Executing package payload installer as SYSTEM context...",
      "[Win11Client01] Package KB5034123 downloaded: 542MB (verified SHA-256)",
      "[Win11Client01] Applying cumulative updates... 20%... 60%... 100%",
      "[Win11Client01] Update KB5034123 installed successfully. Rebooting node...",
      "[Action1 Client] Re-evaluating workstation node health...",
      "[Action1 Client] Win11Client01 is back ONLINE. Verifying patch compliance...",
      "[Action1 Client] Cumulative hotfix compliance level checks passed.",
      "[Action1 Client] Pending Update Stage: KB5034112 (.NET Security Update)...",
      "[Win11Client01] Applying KB5034112 security hotfix... Done.",
      "[Action1 Client] Run general domain sweep: 0 vulnerabilities found.",
      "[Action1 Client] Compliance sweep: SUCCESS. Domain is 100% SECURE."
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logTimeline.length) {
        setPatchDeployLogs(prev => [...prev, logTimeline[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setIsDeployingPatches(false);
        setPatchCompliance(100);
      }
    }, 250);
  };

  const resetPatchLab = () => {
    setPatchCompliance(83);
    setPatchDeployLogs([]);
    setIsDeployingPatches(false);
  };

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  // We can highlight the Enterprise Sandbox Rebuild specifically!
  const enterpriseProject = projects.find((p) => p.id === 'enterprise_sandbox');
  const otherProjects = filteredProjects.filter((p) => p.id !== 'enterprise_sandbox');

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-b border-slate-100 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase font-bold tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
            Portfolio Work
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Key Systems &amp; Analytical Projects
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-350 text-base">
            Hands-on sandboxes and analytics databases demonstrating core proficiency in active directory routing, power BI dashboards, python calculations, and mobile development.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'systems_networking', label: 'Systems & Networking' },
            { id: 'data_analytics', label: 'Data Analytics & BI' },
            { id: 'software_dev', label: 'Software Development' },
          ].map((btn) => (
            <button
              key={btn.id}
              id={`filter-btn-${btn.id}`}
              onClick={() => setFilter(btn.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                filter === btn.id
                  ? 'bg-slate-900 dark:bg-slate-800 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* STAR/FEATURED PROJECT: Enterprise Sandbox (Show prominently if filter is 'all' or 'systems_networking') */}
        {(filter === 'all' || filter === 'systems_networking') && enterpriseProject && (
          <div className="mb-12">
            <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-1">
              Featured Infrastructure Deployment
            </h3>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Deep Technical Sandbox Panel */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-3 py-1 rounded-full w-fit">
                    <Network className="h-3.5 w-3.5" />
                    <span className="font-bold">Active Directory Sandbox Build</span>
                  </div>

                  <h4 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-4 tracking-tight">
                    {enterpriseProject.title}
                  </h4>

                  <p className="text-slate-600 dark:text-slate-350 text-sm mt-3 leading-relaxed">
                    {enterpriseProject.description}
                  </p>

                  <div className="mt-6 space-y-3.5">
                    {enterpriseProject.highlights?.slice(0, 4).map((hl, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <span className="h-5 w-5 rounded bg-slate-900 dark:bg-slate-800 text-[10px] text-emerald-400 font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          0{idx + 1}
                        </span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex flex-wrap gap-1">
                    {enterpriseProject.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono font-medium text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  {enterpriseProject.githubUrl && (
                    <a
                      href={enterpriseProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      <span>Codebase</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Simulated Network Topology Visual Card */}
              <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 flex flex-col justify-between text-slate-300 font-mono text-xs border-t lg:border-t-0 lg:border-l border-slate-800">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">LAB TOPO DIAGRAM</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>

                  {/* ASCII Topology map mockup */}
                  <div className="bg-slate-900/60 p-4 rounded border border-slate-800/80 space-y-2 text-[11px] leading-tight text-slate-400">
                    <div>[ Host Controller (Dual Homed) ]</div>
                    <div className="pl-4 text-slate-500">│</div>
                    <div className="pl-4 text-slate-500">├── [ Secondary NAT Gateway ]</div>
                    <div className="pl-4 text-slate-500">│     └── (Action1 Cloud Patch Console Access)</div>
                    <div className="pl-4 text-slate-500">│</div>
                    <div className="pl-4 text-slate-500">└── [ Private Subnet (Host-Only AD) ]</div>
                    <div className="pl-12 text-emerald-400">├── DC Node (Windows Server 2022)</div>
                    <div className="pl-12 text-slate-500">│     └── IP: 10.0.2.14 (DNS Host)</div>
                    <div className="pl-12 text-slate-500">└── Client Node (Windows 11)</div>
                    <div className="pl-18 text-slate-500">└── Static IP Config &amp; DNS Pointer</div>
                  </div>

                  {/* Mini diagnostics table */}
                  <table className="w-full text-[10px] text-slate-500">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="text-left pb-1 font-bold">Node ID</th>
                        <th className="text-left pb-1 font-bold">Status</th>
                        <th className="text-right pb-1 font-bold">IPv4 Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-1">DarwinNepalDC</td>
                        <td className="py-1 text-emerald-400">ONLINE</td>
                        <td className="py-1 text-right">10.0.2.14</td>
                      </tr>
                      <tr>
                        <td className="py-1">Win11Client01</td>
                        <td className="py-1 text-emerald-400">ONLINE</td>
                        <td className="py-1 text-right">10.0.2.15</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-slate-500 text-[10px]">
                  <span>System Diagnostics sweep: Success. All endpoint nodes registered to Domain.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OTHER PROJECTS: Grid format */}
        {otherProjects.length > 0 && (
          <div>
            {filter === 'all' && (
              <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-1 mt-6">
                Data Science &amp; Mobile Development Projects
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((p) => (
                <div
                  key={p.id}
                  id={`project-card-${p.id}`}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-850 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 group"
                >
                  <div>
                    {/* Category icon indicator */}
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg text-slate-700 dark:text-slate-300">
                        {p.category === 'data_analytics' ? (
                          <BarChart className="h-4.5 w-4.5" />
                        ) : (
                          <Code2 className="h-4.5 w-4.5" />
                        )}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {p.category === 'data_analytics' ? 'Analytics & BI' : 'App Development'}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white mt-4 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {p.title}
                    </h4>

                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Highlights summaries in list */}
                    {p.highlights && (
                      <ul className="mt-4 space-y-1.5">
                        {p.highlights.slice(0, 3).map((hl, idx) => (
                          <li key={idx} className="text-xs text-slate-600 dark:text-slate-350 flex items-start space-x-1.5">
                            <span className="text-emerald-500 mt-0.5 font-bold font-mono">›</span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex flex-wrap gap-1">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-850">
                          {t}
                        </span>
                      ))}
                      {p.tags.length > 3 && (
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 px-1 py-0.5">
                          +{p.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
