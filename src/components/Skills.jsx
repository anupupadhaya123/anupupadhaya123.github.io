import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_DATA } from '../types';
import * as Icons from 'lucide-react';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...SKILL_DATA.map(group => group.category)];

  const getIconComponent = (iconName) => {
    // Dynamically look up Lucide icons
    const IconComp = Icons[iconName];
    if (IconComp) return <IconComp className="h-4.5 w-4.5" />;
    return <Icons.CheckCircle className="h-4.5 w-4.5" />;
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Advanced':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'Intermediate':
        return 'bg-slate-700/30 text-slate-400 border-slate-700/50';
      default:
        return 'bg-slate-800 text-slate-400';
    }
  };

  const filteredSkills = SKILL_DATA.flatMap(group => {
    if (selectedCategory !== 'All' && group.category !== selectedCategory) {
      return [];
    }
    return group.skills.map(skill => ({
      ...skill,
      category: group.category
    }));
  }).filter(skill => 
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6" id="skills-component">
      {/* Category selector and Search row */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
        <div className="flex flex-wrap gap-1.5">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px] md:min-w-[280px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 pointer-events-none">
            <Icons.Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search core skills (e.g., Active Directory)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-sky-500/80 rounded-lg py-2 pl-9 pr-4 text-xs font-sans text-slate-200 focus:outline-none placeholder-slate-500 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-500 hover:text-slate-300"
            >
              <Icons.X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid rendering skills */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map(skill => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={skill.name}
              className="bg-slate-950 border border-slate-800/80 hover:border-slate-700/80 rounded-xl p-4 flex items-start gap-3.5 transition-all group hover:shadow-lg hover:shadow-slate-950/40 hover:-translate-y-0.5"
            >
              <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-sky-400 group-hover:bg-slate-800/80 group-hover:text-sky-300 transition-all shrink-0">
                {getIconComponent(skill.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wider block">
                    {skill.category}
                  </span>
                  <span className={`text-[9px] font-sans font-semibold border px-1.5 py-0.5 rounded-full ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>
                <h4 className="font-sans font-bold text-xs md:text-sm text-slate-200 group-hover:text-white transition-all truncate">
                  {skill.name}
                </h4>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredSkills.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 font-sans text-sm">
            No specific skills match your query. Try searching another parameter.
          </div>
        )}
      </motion.div>

      {/* Legend & Endorsement footnote */}
      <div className="bg-slate-900/20 border border-slate-800/60 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-slate-400 font-sans">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] uppercase font-mono text-slate-500 font-semibold">Skill Level Indicators:</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Expert (Mastery & Prod Admin)</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-sky-400"></span> Advanced (Heavy Configuration)</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-slate-500"></span> Intermediate (Support Capable)</span>
        </div>
        <div className="text-slate-500 text-[10px] font-mono">
          *Google Certified & Master of IT Endorsed
        </div>
      </div>
    </div>
  );
}
