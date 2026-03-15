import { motion } from 'motion/react';
import { BrainCircuit, Cpu, Rocket, Code2 } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-32 relative z-10 font-mono">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-cyan-500 flex-1" />
          <div className="text-cyan-400 tracking-[0.5em] text-sm uppercase">PROFILE SCAN</div>
          <div className="h-px bg-cyan-500 flex-1" />
        </div>

        <div className="hud-panel p-8 md:p-12 flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left: Holographic Avatar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-64 h-64 shrink-0"
          >
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-cyan-400/20 border-t-cyan-400 animate-[spin_3s_linear_infinite_reverse]" />
            <div className="absolute inset-8 rounded-full border-4 border-double border-cyan-500/10" />
            
            {/* Hologram Core */}
            <div className="absolute inset-12 bg-cyan-900/40 rounded-full backdrop-blur-sm flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-cyan-400/20 animate-pulse" />
              <div className="text-cyan-300 text-6xl font-black tracking-tighter opacity-80">SD</div>
            </div>
            
            {/* Scanning Line */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(6,182,212,0.5)_50%,transparent_100%)] h-[200%] animate-scan mix-blend-screen rounded-full overflow-hidden" />
          </motion.div>

          {/* Right: Data Readout */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6 text-sm md:text-base"
          >
            <div className="border-b border-cyan-500/30 pb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white hud-text tracking-widest mb-2">SUBJECT: SHIVANSH DUBEY</h2>
              <div className="text-cyan-400 tracking-widest">ROLE: TECH CREATOR / DEVELOPER</div>
              <div className="text-green-400 tracking-widest mt-1">STATUS: ACTIVE</div>
            </div>

            <p className="text-cyan-100/80 leading-relaxed">
              Analyzing subject data... Subject demonstrates high proficiency in software engineering, artificial intelligence, and hardware integration. Capable of building complex systems from scratch, similar to Stark Industries protocols.
            </p>

            <div>
              <div className="text-cyan-600 tracking-widest mb-4">KNOWN INTERESTS:</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-cyan-300">
                <li className="flex items-center gap-2"><BrainCircuit className="w-4 h-4 text-cyan-500" /> &gt; ARTIFICIAL INTELLIGENCE</li>
                <li className="flex items-center gap-2"><Code2 className="w-4 h-4 text-cyan-500" /> &gt; WEB DEVELOPMENT</li>
                <li className="flex items-center gap-2"><Cpu className="w-4 h-4 text-cyan-500" /> &gt; ELECTRONICS</li>
                <li className="flex items-center gap-2"><Rocket className="w-4 h-4 text-cyan-500" /> &gt; INNOVATION</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
