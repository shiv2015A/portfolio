import { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Zap } from 'lucide-react';

export function ScrollBot() {
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    mass: 0.5
  });

  const y = useTransform(smoothProgress, [0, 1], ['10vh', '85vh']);
  const x = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ['5vw', '85vw', '5vw', '85vw', '5vw']);
  const rotate = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [15, -15, 15, -15, 15]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={{ position: 'fixed', top: 0, left: 0, x, y, rotate: isHovered ? 0 : rotate, zIndex: 50 }}
      className="pointer-events-auto hidden md:block"
    >
      <motion.div 
        animate={{ y: [0, -15, 0] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-pointer relative"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Comic style Arc Reactor drone */}
        <div className="relative bg-white border-4 border-black p-3 rounded-full comic-shadow-cyan">
          <div className="absolute inset-0 bg-cyan-400 rounded-full animate-pulse opacity-50" />
          <Zap className={`w-8 h-8 ${isHovered ? 'text-red-600' : 'text-cyan-500'} relative z-10`} fill="currentColor" />
        </div>
        
        {/* Comic bubble */}
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-black font-black uppercase text-sm px-4 py-2 border-4 border-black comic-shadow-red transform -skew-x-6"
          >
            I AM IRON MAN!
            {/* Bubble tail */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-4 border-b-4 border-black transform rotate-45" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
