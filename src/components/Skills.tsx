import { motion } from 'motion/react';
import { SkillHologram } from './SkillHologram';

const skills = [
  { name: 'Web Development', level: 90 },
  { name: 'AI Systems', level: 85 },
  { name: 'Electronics / Arduino', level: 75 },
  { name: 'UI Design', level: 80 },
  { name: 'Problem Solving', level: 95 },
];

export function Skills() {
  return (
    <section className="py-32 relative z-10 font-mono overflow-hidden">
      <SkillHologram />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-cyan-500 flex-1" />
          <div className="text-cyan-400 tracking-[0.5em] text-sm uppercase">SUIT MODULES</div>
          <div className="h-px bg-cyan-500 flex-1" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="hud-panel p-6 flex flex-col items-center text-center group hover:bg-cyan-900/20 transition-colors cursor-default"
            >
              {/* Circular Progress Ring */}
              <div className="relative w-24 h-24 mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Ring */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="4" />
                  {/* Animated Foreground Ring */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#06b6d4"
                    strokeWidth="4"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    whileInView={{ strokeDashoffset: 251.2 - (251.2 * skill.level) / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeOut", delay: index * 0.2 }}
                    className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-cyan-300 font-bold text-lg">
                  {skill.level}%
                </div>
                {/* Rotating decorative ring */}
                <div className="absolute inset-0 border border-cyan-500/20 rounded-full border-t-cyan-400 animate-[spin_4s_linear_infinite]" />
              </div>
              
              <h3 className="text-cyan-100 text-sm tracking-widest group-hover:text-cyan-400 transition-colors">
                {skill.name}
              </h3>
              <div className="w-full h-1 bg-cyan-900/30 mt-4 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-cyan-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
