import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cpu, Terminal, CheckCircle2, Server, Globe } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_SEQUENCES = [
  { text: 'Securing gateway connection to darwinnepal.onmicrosoft.com...', duration: 600, icon: Globe },
  { text: 'Authenticating active administrator session with Directory Services...', duration: 700, icon: Shield },
  { text: 'Mounting network systems virtualization environment...', duration: 800, icon: Server },
  { text: 'Optimizing SMTP configuration & secure contact relay endpoints...', duration: 600, icon: Cpu },
  { text: 'Synchronizing interactive SysAdmin tools & dashboard controls...', duration: 600, icon: Terminal },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [statusMessage, setStatusMessage] = useState('Booting Secure Portal...');

  useEffect(() => {
    // 1. Progress increment logic
    const totalDuration = BOOT_SEQUENCES.reduce((acc, step) => acc + step.duration, 0) + 500;
    const intervalTime = 30; // ms
    const increment = (100 / totalDuration) * intervalTime;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // 2. Sequential boot step transitions
    let stepTimer: NodeJS.Timeout;

    const runStep = (index: number) => {
      if (index >= BOOT_SEQUENCES.length) {
        setStatusMessage('System Ready. Initializing user interface...');
        const finalTimer = setTimeout(() => {
          onComplete();
        }, 500);
        return () => clearTimeout(finalTimer);
      }

      const step = BOOT_SEQUENCES[index];
      setStatusMessage(step.text);
      setCurrentStepIndex(index);

      stepTimer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, index]);
        runStep(index + 1);
      }, step.duration);
    };

    runStep(0);

    return () => {
      clearTimeout(stepTimer);
    };
  }, [onComplete]);

  // Skip booting logic for immediate portal access
  const handleSkip = () => {
    setProgress(100);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 font-mono text-slate-300 p-6 selection:bg-emerald-950 selection:text-emerald-400">
      {/* Dynamic scanlines & retro screen effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.1)_0%,rgba(2,6,23,0.85)_100%)]"></div>
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20"></div>

      {/* Main Terminal Container */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80 animate-pulse"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
            <span className="text-xs text-slate-500 ml-2 font-bold tracking-wider">SECURE BOOT // v4.2.1-PROD</span>
          </div>
          <div className="text-[10px] text-emerald-500/80 bg-emerald-950/40 border border-emerald-900 px-2.5 py-0.5 rounded font-bold tracking-wide animate-pulse">
            ADMIN SESSION
          </div>
        </div>

        {/* Terminal Core Content */}
        <div className="space-y-4 min-h-[160px] md:min-h-[180px]">
          {/* Main Title Banner */}
          <div className="space-y-1">
            <h1 className="text-lg md:text-xl font-bold text-white flex items-center space-x-2 font-sans tracking-tight">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span>Anup is Loading...</span>
            </h1>
            <p className="text-[11px] text-slate-500 font-mono tracking-wider">
              ESTABLISHING ENCRYPTED SYSADMIN PORTAL GATEWAY
            </p>
          </div>

          {/* Sequential Process Log */}
          <div className="text-[11px] space-y-2 font-mono mt-4 max-h-[120px] overflow-hidden">
            {BOOT_SEQUENCES.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = completedSteps.includes(index);
              const isActive = index === currentStepIndex;

              return (
                <div
                  key={index}
                  className={`flex items-start space-x-2.5 transition-colors duration-200 ${
                    isCompleted ? 'text-slate-400' : isActive ? 'text-emerald-400 font-bold' : 'text-slate-700'
                  }`}
                >
                  <span className="mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                    ) : isActive ? (
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin flex-shrink-0"></div>
                    ) : (
                      <StepIcon className="h-3.5 w-3.5 text-slate-700 flex-shrink-0" />
                    )}
                  </span>
                  <span className="flex-1 leading-snug">
                    {step.text}
                    {isActive && <span className="animate-pulse">_</span>}
                  </span>
                  {isCompleted && (
                    <span className="text-[9px] text-emerald-500 bg-emerald-950/40 border border-emerald-900/50 px-1 rounded font-bold ml-auto flex-shrink-0">
                      SUCCESS
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar & Loader Controls */}
        <div className="border-t border-slate-800 pt-6 mt-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <div className="truncate max-w-[70%] font-mono text-[11px] text-emerald-500 tracking-wider">
              {statusMessage.toUpperCase()}
            </div>
            <div className="text-white text-sm tabular-nums">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Elegant Linear Progress Bar */}
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeInOut' }}
            />
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between text-[10px] text-slate-500">
            <span className="font-mono tracking-widest text-slate-600">IP ADDRESS: DHCP_LEASED</span>
            <button
              onClick={handleSkip}
              className="px-3 py-1 bg-slate-950 hover:bg-slate-800 hover:text-white border border-slate-800 hover:border-slate-700 rounded-md transition-all font-bold cursor-pointer uppercase tracking-wider"
              id="skip-boot-button"
            >
              Skip Initialization
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
