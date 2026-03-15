import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Hologram } from './Hologram';

export function Hero() {
  const [data, setData] = useState({ power: 98.4, thrust: 1.2, alt: 12400, hr: 85 });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        power: Math.min(100, Math.max(0, prev.power + (Math.random() - 0.5) * 0.5)),
        thrust: +(prev.thrust + (Math.random() - 0.5) * 0.1).toFixed(2),
        alt: Math.floor(prev.alt + (Math.random() - 0.5) * 100),
        hr: Math.floor(80 + Math.random() * 15),
      }));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent z-10 font-mono">
      
      {/* Top HUD Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 flex justify-between items-center px-4 md:px-8 border-b border-cyan-500/30 bg-black/40 backdrop-blur-md z-50">
        <div className="text-cyan-500 text-xs md:text-sm tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-500 animate-pulse" />
          STARK INDUSTRIES // OS v4.2
        </div>
        <div className="hidden md:flex gap-4 w-1/3">
          <div className="flex-1 h-1 bg-cyan-900/50 rounded-full overflow-hidden self-center"><div className="w-full h-full bg-cyan-400 animate-pulse" /></div>
          <div className="w-16 h-1 bg-red-900/50 rounded-full overflow-hidden self-center"><div className="w-3/4 h-full bg-red-500" /></div>
        </div>
        <div className="text-cyan-500 text-xs md:text-sm tracking-widest">SYS: <span className="text-green-400">ONLINE</span></div>
      </div>

      <Hologram />

      {/* Center Arc Reactor Hologram */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] pointer-events-none opacity-60 mix-blend-screen"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-dashed border-cyan-500/40" />
        <div className="absolute inset-8 rounded-full border-[1px] border-cyan-400/30" />
        <div className="absolute inset-16 rounded-full border-[8px] border-double border-cyan-300/20" />
        <motion.div 
          className="absolute inset-[100px] rounded-full bg-cyan-500/10 blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10 mt-16">
        
        {/* Left Panel: Diagnostics */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:flex flex-col space-y-4 text-xs tracking-widest w-64"
        >
          <div className="hud-panel p-4 space-y-2">
            <div className="text-cyan-600 mb-2">SYSTEM DIAGNOSTICS</div>
            <div className="flex justify-between"><span className="text-cyan-700">SYS.CORE</span> <span className="text-cyan-300">{data.power.toFixed(1)}%</span></div>
            <div className="flex justify-between"><span className="text-cyan-700">THRUST</span> <span className="text-cyan-300">{data.thrust.toFixed(2)} MACH</span></div>
            <div className="flex justify-between"><span className="text-cyan-700">ALTITUDE</span> <span className="text-cyan-300">{data.alt} FT</span></div>
            <div className="flex justify-between"><span className="text-cyan-700">HEART RATE</span> <span className="text-red-400">{data.hr} BPM</span></div>
          </div>
          <div className="hud-panel p-4">
            <div className="text-cyan-600 mb-2">NEURAL LINK</div>
            <div className="h-12 w-full flex items-end gap-1">
              {[...Array(20)].map((_, i) => (
                <motion.div 
                  key={i} 
                  className="w-full bg-cyan-500/50" 
                  animate={{ height: ['20%', `${Math.random() * 100}%`, '20%'] }}
                  transition={{ duration: 1 + Math.random(), repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center: Identity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center text-center space-y-6"
        >
          <div className="text-cyan-500 tracking-[0.5em] text-sm">IDENTIFICATION CONFIRMED</div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-200 hud-text uppercase">
            SHIVANSH<br/>DUBEY
          </h1>
          <div className="text-cyan-400 tracking-[0.3em] text-lg md:text-xl uppercase border-y border-cyan-500/30 py-2">
            Tech Creator // Developer
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6,182,212,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 px-8 py-3 bg-cyan-500/10 text-cyan-300 border border-cyan-500/50 uppercase tracking-widest text-sm hover:bg-cyan-500/20 transition-all backdrop-blur-sm"
          >
            INITIATE PROTOCOL
          </motion.button>
        </motion.div>

        {/* Right Panel: Status */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:flex flex-col space-y-4 text-xs tracking-widest w-64 text-right"
        >
          <div className="hud-panel p-4 space-y-2">
            <div className="text-cyan-600 mb-2">MARK XLII ARMOR</div>
            <div className="text-cyan-300">J.A.R.V.I.S. v4.2.0</div>
            <div className="text-cyan-700">DIAGNOSTICS: <span className="text-green-400">OPTIMAL</span></div>
            <div className="text-cyan-700">WEAPONS: <span className="text-amber-400">HOT</span></div>
            <div className="text-cyan-700">REPULSORS: <span className="text-cyan-400">CHARGED</span></div>
          </div>
          <div className="hud-panel p-4 flex justify-end">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full border-t-cyan-400 animate-spin" />
              <div className="absolute inset-2 border border-cyan-500/20 rounded-full border-b-cyan-300 animate-[spin_2s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center text-cyan-500 text-[10px]">RADAR</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
