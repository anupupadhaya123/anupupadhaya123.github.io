import React from 'react';
import { EDUCATION_DATA, ACHIEVEMENTS_DATA } from '../types';
import { Award, Zap, Users, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Achievements() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Award':
        return <Award className="h-6 w-6 text-amber-400" />;
      case 'Zap':
        return <Zap className="h-6 w-6 text-sky-400" />;
      case 'Users':
        return <Users className="h-6 w-6 text-emerald-400" />;
      default:
        return <Award className="h-6 w-6 text-amber-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="credentials-component">
      {/* Education Column */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="h-5.5 w-5.5 text-sky-400" />
          <h3 className="font-sans font-bold text-lg md:text-xl text-white">Academic History</h3>
        </div>

        <div className="space-y-4">
          {EDUCATION_DATA.map((edu, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-5 transition-all">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3 mb-3">
                <div>
                  <h4 className="font-sans font-bold text-sm md:text-base text-white">{edu.institution}</h4>
                  <span className="text-xs font-mono text-sky-400 font-semibold">{edu.degree}</span>
                </div>
                <div className="flex flex-col items-start sm:items-end text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {edu.period}</span>
                  <span className="flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" /> {edu.location}</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs md:text-sm text-slate-300 font-sans">
                {edu.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500/80 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications and Awards Column */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Award className="h-5.5 w-5.5 text-amber-400" />
          <h3 className="font-sans font-bold text-lg md:text-xl text-white">Credentials & Accolades</h3>
        </div>

        <div className="space-y-4">
          {ACHIEVEMENTS_DATA.map((ach, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-5 flex gap-4 transition-all">
              <div className="bg-slate-900 border border-slate-800/80 p-3 rounded-xl shrink-0 h-12 w-12 flex items-center justify-center self-start">
                {getIcon(ach.icon)}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="font-sans font-bold text-sm md:text-base text-slate-100">{ach.title}</h4>
                  <span className="text-[10px] font-mono text-slate-500 font-semibold shrink-0">{ach.date}</span>
                </div>
                <p className="text-xs md:text-sm text-slate-400 font-sans leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
