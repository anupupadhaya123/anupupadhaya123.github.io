import React from 'react';
import { EXPERIENCE_DATA } from '../types';
import { Calendar, MapPin, CheckCircle } from 'lucide-react';

export default function Experiences() {
  return (
    <div className="relative border-l border-slate-800 ml-4 md:ml-6 space-y-10" id="experiences-timeline">
      {EXPERIENCE_DATA.map((job, index) => (
        <div key={index} className="relative pl-6 md:pl-8 group">
          {/* Timeline Node Point */}
          <span className="absolute left-[-9px] top-1.5 flex items-center justify-center h-4.5 w-4.5 rounded-full border-2 border-slate-900 bg-slate-950 text-slate-500 group-hover:border-sky-500 group-hover:bg-sky-500/10 transition-all duration-300">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600 group-hover:bg-sky-400 transition-all"></span>
          </span>

          <div className="bg-slate-950 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-300 shadow-xl group-hover:shadow-sky-500/[0.02]">
            {/* Header section of job */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800 pb-4 mb-4">
              <div>
                <span className="font-mono text-[10px] uppercase font-semibold text-sky-400 tracking-wider">
                  {job.role}
                </span>
                <h3 className="font-sans font-bold text-base md:text-lg text-white mt-1">
                  {job.company}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  {job.period}
                </span>
                <span className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  {job.location}
                </span>
              </div>
            </div>

            {/* Highlights bullets list */}
            <ul className="space-y-3.5 text-sm font-sans text-slate-300">
              {job.highlights.map((bullet, idx) => {
                // Break down to make bold headers inside bullet text stand out
                const parts = bullet.split(':');
                const hasHeader = parts.length > 1;

                return (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="h-4.5 w-4.5 text-sky-500/80 shrink-0 mt-0.5" />
                    <span>
                      {hasHeader ? (
                        <>
                          <strong className="text-white font-semibold font-sans">{parts[0]}:</strong>
                          <span className="text-slate-300">{parts.slice(1).join(':')}</span>
                        </>
                      ) : (
                        bullet
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
