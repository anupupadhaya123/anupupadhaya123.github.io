import React, { useState } from 'react';
import { Server, Laptop, Network, BarChart2, ShieldAlert, Code, CheckCircle } from 'lucide-react';
import { skillCategories } from '../data';
import { SkillCategory } from '../types';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>(skillCategories[0].id);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Server':
        return <Server className="h-5 w-5" />;
      case 'Laptop':
        return <Laptop className="h-5 w-5" />;
      case 'Network':
        return <Network className="h-5 w-5" />;
      case 'BarChart2':
        return <BarChart2 className="h-5 w-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="h-5 w-5" />;
      case 'Code':
        return <Code className="h-5 w-5" />;
      default:
        return <Server className="h-5 w-5" />;
    }
  };

  const currentCategory = skillCategories.find((cat) => cat.id === activeCategory) || skillCategories[0];

  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-b border-slate-100 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase font-bold tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
            Technical Stack &amp; Skills
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Systems Administration &amp; Analytics Core
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-350 text-base sm:text-lg">
            A comprehensive overview of tools, systems, and protocols spanning Active Directory, Cloud Identity, Networking, and Data Science.
          </p>
        </div>

        {/* Desktop Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Category List Tabs */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 mb-2">
              Capability Segments
            </h3>
            {skillCategories.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  id={`skill-cat-btn-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-4 py-4 rounded-xl border flex items-start space-x-3 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 border-slate-900 dark:border-emerald-500 shadow-md ring-1 ring-slate-900/5 dark:ring-emerald-500/10 translate-x-1'
                      : 'bg-transparent border-slate-200/60 dark:border-slate-850 hover:bg-white dark:hover:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive ? 'bg-slate-900 dark:bg-emerald-500/20 text-emerald-400 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {getIcon(cat.iconName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`block font-display font-semibold text-sm transition-colors ${
                        isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {cat.name}
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                      {cat.skills.map((s) => s.name).join(', ')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Category Detail Panel */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-850 shadow-sm p-6 sm:p-8 min-h-[440px] flex flex-col justify-between">
            <div>
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="p-2.5 bg-slate-900 dark:bg-emerald-500/20 text-emerald-400 dark:text-emerald-400 rounded-xl">
                  {getIcon(currentCategory.iconName)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white">{currentCategory.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">Segment Identifier: {currentCategory.id}</p>
                </div>
              </div>

              {/* Skills Progress list */}
              <div className="space-y-6">
                {currentCategory.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start text-sm">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                          {skill.details && (
                            <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                              {skill.details}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-900 dark:bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Tag */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center space-x-1.5 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active Directory lab standard verified</span>
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">100% Core Competency</span>
            </div>
          </div>
        </div>

        {/* Global Competencies Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-850 shadow-sm flex items-start space-x-3">
            <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0 font-bold font-mono text-sm">
              AD
            </div>
            <div>
              <h4 className="font-display font-semibold text-slate-900 dark:text-white text-sm">Active Directory Lab Core</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Calibrated Windows Server 2022 domain routing, DNS path bindings, and secure offline setup routines.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-850 shadow-sm flex items-start space-x-3">
            <div className="h-10 w-10 bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center flex-shrink-0 font-bold font-mono text-sm">
              M365
            </div>
            <div>
              <h4 className="font-display font-semibold text-slate-900 dark:text-white text-sm">M365 &amp; Entra ID Admin</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Credential management, shared mailbox allocation, domain integration, license audits, and security logs.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-850 shadow-sm flex items-start space-x-3">
            <div className="h-10 w-10 bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center flex-shrink-0 font-bold font-mono text-sm">
              BI
            </div>
            <div>
              <h4 className="font-display font-semibold text-slate-900 dark:text-white text-sm">Business Intelligence Systems</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Extracting database insights via SQL, modeling workflows with Python, and crafting Power BI reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
