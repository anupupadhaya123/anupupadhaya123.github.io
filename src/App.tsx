/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, ShieldAlert, Cpu, Terminal, ArrowDown, MapPin, CheckCircle, Network, Calendar, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import TerminalConsole from './components/TerminalConsole';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ItToolsLab from './components/ItToolsLab';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { personalInfo } from './data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={`min-h-screen bg-white dark:bg-slate-950 font-sans antialiased text-slate-800 dark:text-slate-200 selection:bg-slate-900 selection:text-white dark:selection:bg-slate-800 dark:selection:text-emerald-400 ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
      {/* Top Banner Warning or Status Bar (Optional, looks very tech-support professional) */}
      <div className="bg-slate-950 text-slate-400 py-2 border-b border-slate-900 text-[10px] font-mono text-center">
        <span className="flex items-center justify-center space-x-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>SYSTEM SECURE PORTAL</span>
          <span className="text-slate-700">•</span>
          <span>ACTIVE DOMAIN: <strong className="text-emerald-400">DARWINNEPAL.ONMICROSOFT.COM</strong></span>
          <span className="text-slate-700">•</span>
          <span>SLA REPORT: <strong className="text-emerald-400">100%</strong></span>
        </span>
      </div>

      {/* Navigation Header */}
      <Header />

      {/* Hero Section */}
      <section id="overview" className="relative pt-24 sm:pt-32 pb-20 overflow-hidden bg-radial from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 dark:opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Info Intro */}
            <motion.div
              className="lg:col-span-6 space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Profile Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-slate-700 dark:text-slate-350 bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 px-3 py-1 rounded-full w-fit"
              >
                <Shield className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>IT SUPPORT &amp; SYSTEMS ADMINISTRATOR</span>
              </motion.div>

              {/* Major Display Typography */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] sm:leading-tight"
              >
                Anup Upadhaya
              </motion.h1>

              {/* Dynamic Subtitle banner */}
              <motion.div
                variants={itemVariants}
                className="p-4 bg-slate-900 dark:bg-slate-900/60 rounded-2xl border border-slate-950 dark:border-slate-800 text-white font-mono shadow-md"
              >
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Current Node Status</div>
                <div className="text-lg font-semibold text-emerald-400 mt-1 flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Systems Engineer &amp; Data Analyst</span>
                </div>
              </motion.div>

              {/* Bio Summary Paragraph */}
              <motion.p
                variants={itemVariants}
                className="text-slate-600 dark:text-slate-350 text-sm sm:text-base leading-relaxed font-sans max-w-xl"
              >
                {personalInfo.about}
              </motion.p>

              {/* Quick Details List */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-850"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>Based: <strong className="text-slate-800 dark:text-slate-200">{personalInfo.location}</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-slate-400" />
                  <span>Availability: <strong className="text-slate-800 dark:text-slate-200">{personalInfo.availability}</strong></span>
                </div>
                <div className="flex items-center space-x-2 col-span-1 sm:col-span-2 border-t border-slate-200/60 dark:border-slate-800 pt-2 mt-2">
                  <ShieldAlert className="h-4 w-4 text-slate-400" />
                  <span>Spoken Terminals: <strong className="text-slate-800 dark:text-slate-200">{personalInfo.languages.join(', ')}</strong></span>
                </div>
              </motion.div>

              {/* Primary Call to Actions */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
                <button
                  id="hero-view-skills-btn"
                  onClick={() => {
                    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-6 py-3 rounded-xl bg-slate-950 dark:bg-white hover:bg-slate-850 dark:hover:bg-slate-100 text-white dark:text-slate-950 text-sm font-semibold shadow transition-all duration-200 cursor-pointer"
                >
                  Inspect Capabilities
                </button>
                <button
                  id="hero-view-projects-btn"
                  onClick={() => {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 text-sm font-semibold transition-all duration-200 cursor-pointer"
                >
                  View Systems Sandbox
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column: Console Mockup Embedded */}
            <motion.div
              id="terminal"
              className="lg:col-span-6"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                {/* Visual Glow effect behind the console */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-blue-500/10 blur-xl opacity-75 pointer-events-none"></div>
                <TerminalConsole />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Profile Summary Statistics Bento Grid */}
      <section className="py-12 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">ACADEMICS</span>
                <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="mt-4 font-display font-black text-xl text-slate-900 dark:text-white leading-tight">Master of IT</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">Major in Data Science and AI, Murdoch University</p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
              className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">CERTIFICATION</span>
                <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="mt-4 font-display font-black text-xl text-slate-900 dark:text-white leading-tight">Google IT Support</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">Professional SysAdmin, Network &amp; Security Credentials</p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
              className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">PROJECT DEPTH</span>
                <Cpu className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="mt-4 font-display font-black text-xl text-slate-900 dark:text-white leading-tight">20+ Completed</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">Active Directory sandboxes, Python modules, and BI builds</p>
            </motion.div>

            {/* Stat 4 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
              className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">SLA PERFORMANCE</span>
                <Terminal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="mt-4 font-display font-black text-xl text-slate-900 dark:text-white leading-tight">100% Resolve Rate</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">Ticketing tracking, process documentation, incident triage</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialized Skills Section */}
      <SkillsSection />

      {/* Experience & Education Timelines */}
      <ExperienceSection />

      {/* Systems & Analytical Projects Grid */}
      <ProjectsSection />

      {/* Interactive Admin & Network Systems Lab */}
      <ItToolsLab />

      {/* References & Contact SMTP panel */}
      <ContactSection />

      {/* Global Footer */}
      <Footer />
    </div>
    </>
  );
}