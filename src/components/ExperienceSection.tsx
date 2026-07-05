import React, { useState } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';
import { experiences, educationHistory } from '../data';

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');
  const [selectedWorkId, setSelectedWorkId] = useState<string>(experiences[0].id);

  const selectedWork = experiences.find((exp) => exp.id === selectedWorkId) || experiences[0];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase font-bold tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
            Professional Track
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Work Experience &amp; Education
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-350 text-base">
            Refined credentials mapping technical systems administration roles, client services support, and high-level academic specializations.
          </p>
        </div>

        {/* Toggles */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200/60 dark:border-slate-800 flex space-x-1">
            <button
              id="tab-work-btn"
              onClick={() => setActiveTab('work')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                activeTab === 'work'
                  ? 'bg-white dark:bg-slate-850 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40'
              }`}
            >
              <Briefcase className="h-4 w-4" />
              <span>Experience</span>
            </button>
            <button
              id="tab-edu-btn"
              onClick={() => setActiveTab('education')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-white dark:bg-slate-850 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span>Education</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Work Experience */}
        {activeTab === 'work' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Timeline selector - Left Column */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-2">
                Timeline Records
              </h3>
              <div className="relative border-l border-slate-200/80 dark:border-slate-800 ml-4 pl-6 space-y-6">
                {experiences.map((exp) => {
                  const isSelected = exp.id === selectedWorkId;
                  return (
                    <div key={exp.id} className="relative">
                      {/* Timeline dot marker */}
                      <span
                        className={`absolute -left-[31px] top-1.5 h-4.5 w-4.5 rounded-full border-2 bg-white dark:bg-slate-900 flex items-center justify-center transition-all ${
                          isSelected ? 'border-slate-900 dark:border-emerald-500 scale-110 shadow-md' : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            isSelected ? 'bg-emerald-500' : 'bg-transparent'
                          }`}
                        ></span>
                      </span>

                      {/* Clickable Card Header */}
                      <button
                        onClick={() => setSelectedWorkId(exp.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 dark:bg-slate-900 border-slate-950 dark:border-emerald-500 text-white shadow-lg'
                            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-850 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850 shadow-sm text-slate-700 dark:text-slate-350'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span
                            className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isSelected
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {exp.period}
                          </span>
                          <span
                            className={`text-xs flex items-center ${
                              isSelected ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            <MapPin className="h-3 w-3 mr-1" />
                            {exp.location}
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-base mt-2.5">{exp.role}</h4>
                        <p
                          className={`text-xs mt-1 font-semibold ${
                            isSelected ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {exp.company}
                        </p>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Experience Bullet Details Panel - Right Column */}
            <div className="lg:col-span-7 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/80 dark:border-slate-850 p-6 sm:p-8 min-h-[460px] flex flex-col justify-between shadow-sm">
              <div>
                {/* Header detail */}
                <div className="pb-6 border-b border-slate-200/60 dark:border-slate-800 mb-6">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                      {selectedWork.role}
                    </h3>
                    <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-3 py-1 rounded-full">
                      {selectedWork.period}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                    <span className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1 text-slate-400" />
                      {selectedWork.company}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                      {selectedWork.location}
                    </span>
                  </div>
                </div>

                {/* Achievements Highlights list */}
                <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                  Key Accomplishments &amp; Support Duties
                </h4>
                <ul className="space-y-4">
                  {selectedWork.highlights.map((bullet, index) => (
                    <li key={index} className="flex items-start space-x-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Applied Tag pill row */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800">
                <h5 className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                  Systems &amp; Frameworks Deployed
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedWork.skillsUsed.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-md shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Education History */}
        {activeTab === 'education' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {educationHistory.map((edu, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-850 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-350 dark:hover:border-slate-700"
              >
                <div>
                  <div className="h-12 w-12 bg-slate-900 dark:bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-transparent dark:border-emerald-500/30">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
                    {edu.period}
                  </span>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mt-4 leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1.5">{edu.school}</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-4 leading-relaxed">{edu.details}</p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="flex items-center text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                    {edu.location}
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono">
                    {edu.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
