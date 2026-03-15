import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 800)); setStep(1); // Initializing
      await new Promise(r => setTimeout(r, 1500)); setStep(2); // Scanning
      await new Promise(r => setTimeout(r, 1500)); setStep(3); // Diagnostics
      await new Promise(r => setTimeout(r, 1500)); setStep(4); // Arc Reactor
      await new Promise(r => setTimeout(r, 2000)); setStep(5); // Welcome
      await new Promise(r => setTimeout(r, 2000)); onComplete();
    };
    sequence();
  }, [onComplete]);

  return (
    <motion.div className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center font-mono text-cyan-500 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xl md:text-2xl tracking-widest text-cyan-400">
            &gt; INITIALIZING STARK INTERFACE...
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative w-64 h-64">
            <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full border-t-cyan-400 animate-spin" />
            <div className="absolute inset-4 border-4 border-cyan-500/10 rounded-full border-b-cyan-400 animate-[spin_2s_linear_infinite_reverse]" />
            <div className="absolute inset-8 border border-cyan-500/30 rounded-full border-l-cyan-300 animate-[spin_3s_linear_infinite]" />
            <div className="absolute inset-0 flex items-center justify-center text-lg tracking-widest text-cyan-300">SCANNING...</div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 text-left w-80 text-sm md:text-base">
            <div className="text-cyan-400">&gt; CORE: <span className="text-green-400">ONLINE</span></div>
            <div className="text-cyan-400">&gt; MEMORY: <span className="text-green-400">STABLE</span></div>
            <div className="text-cyan-400">&gt; NEURAL NET: <span className="text-green-400">CONNECTED</span></div>
            <div className="text-cyan-400">&gt; HUD: <span className="text-green-400">ACTIVE</span></div>
            <div className="text-cyan-400">&gt; WEAPONS: <span className="text-amber-400">STANDBY</span></div>
          </motion.div>
        )}
        {step === 4 && (
          <motion.div key="4" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 2 }} className="relative w-48 h-48">
            <div className="absolute inset-0 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-8 bg-white rounded-full blur-md" />
            <div className="absolute inset-0 flex items-center justify-center text-black font-black tracking-widest z-10">POWER 100%</div>
          </motion.div>
        )}
        {step === 5 && (
          <motion.div key="5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-3xl md:text-5xl font-black tracking-widest text-white hud-text text-center px-4">
            WELCOME, SHIVANSH DUBEY
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
