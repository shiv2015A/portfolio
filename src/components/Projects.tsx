import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github } from 'lucide-react';
import { ProjectHologram } from './ProjectHologram';

const projects = [
  {
    id: 1,
    title: 'JARVIUS AI',
    category: 'AI Assistant',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800',
    desc: 'Personal AI assistant built to automate tasks, answer queries, and control smart home devices. Integrated with advanced neural networks.',
    tech: ['Python', 'OpenAI', 'Speech Recognition'],
  },
  {
    id: 2,
    title: 'AUTONOMOUS DRONE',
    category: 'Robotics',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800',
    desc: 'Custom-built drone with autonomous flight capabilities using computer vision and Arduino microcontrollers.',
    tech: ['Arduino', 'C++', 'Computer Vision'],
  },
  {
    id: 3,
    title: 'WEBBYTE',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    desc: 'Modern web development agency startup creating high-performance, cinematic websites for clients.',
    tech: ['React', 'Next.js', 'TailwindCSS'],
  },
  {
    id: 4,
    title: 'EXPERIMENTAL ENG.',
    category: 'Hardware',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    desc: 'Centralized control system for home automation using ESP32 and custom web dashboard interfaces.',
    tech: ['ESP32', 'IoT', 'React'],
  },
];

export function Projects() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section className="py-32 relative z-10 font-mono overflow-hidden">
      <ProjectHologram />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-cyan-500 flex-1" />
          <div className="text-cyan-400 tracking-[0.5em] text-sm uppercase">STARK LAB</div>
          <div className="h-px bg-cyan-500 flex-1" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div
              layoutId={`card-${project.id}`}
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              className="hud-panel cursor-pointer group hover:bg-cyan-900/20 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-video overflow-hidden relative border-b border-cyan-500/30 bg-black">
                <motion.img
                  layoutId={`image-${project.id}`}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-50 mix-blend-luminosity group-hover:opacity-80 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-cyan-900/30 mix-blend-color pointer-events-none" />
                <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
                
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-cyan-400 text-xs tracking-widest px-3 py-1 border border-cyan-500/50">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-bold text-white hud-text tracking-widest">
                  {project.title}
                </motion.h3>
                <div className="mt-4 flex gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] text-cyan-600 tracking-wider">[{t}]</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <Modal project={projects.find((p) => p.id === selectedId)!} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function Modal({ project, onClose }: { project: any; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md font-mono"
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${project.id}`}
        className="w-full max-w-4xl hud-panel bg-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video border-b border-cyan-500/50 bg-black">
          <motion.img
            layoutId={`image-${project.id}`}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-cyan-900/20 mix-blend-color pointer-events-none" />
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 transition-colors backdrop-blur-md"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8">
          <motion.h3 layoutId={`title-${project.id}`} className="text-3xl font-bold text-white hud-text tracking-widest mb-4">
            {project.title}
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-cyan-100/80 leading-relaxed mb-8"
          >
            {project.desc}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {project.tech.map((t: string) => (
              <span key={t} className="px-3 py-1 bg-cyan-900/30 text-cyan-300 text-xs tracking-widest border border-cyan-500/30">
                {t}
              </span>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4"
          >
            <button className="flex items-center gap-2 px-6 py-3 bg-cyan-500/20 text-cyan-300 tracking-widest border border-cyan-500/50 hover:bg-cyan-500/40 transition-all text-sm">
              <ExternalLink className="w-4 h-4" /> DEPLOY
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-transparent text-cyan-500 tracking-widest border border-cyan-500/30 hover:border-cyan-500 hover:text-cyan-300 transition-all text-sm">
              <Github className="w-4 h-4" /> SCHEMATICS
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
