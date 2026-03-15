import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-cyan-500/30 relative overflow-hidden z-10 font-mono">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center space-y-8">
        
        {/* Glowing Arc Reactor Mini */}
        <motion.div 
          className="relative w-16 h-16"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/50" />
          <div className="absolute inset-2 rounded-full border border-cyan-400/30" />
          <div className="absolute inset-4 rounded-full bg-cyan-500/20 blur-md animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white tracking-[0.3em] hud-text">
            STARK INDUSTRIES
          </h2>
          <p className="text-cyan-600 text-xs mt-2 tracking-[0.5em]">
            // SHIVANSH DUBEY
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-cyan-500/50 text-[10px] tracking-widest mt-8"
        >
          © {new Date().getFullYear()} SHIVANSH DUBEY. ALL SYSTEMS OPERATIONAL.
        </motion.div>
      </div>
    </footer>
  );
}
