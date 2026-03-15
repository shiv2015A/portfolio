import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function EasterEgg() {
  const [input, setInput] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
        setInput((prev) => (prev + e.key).toUpperCase().slice(-6));
      } else if (e.key === 'Escape') {
        setIsActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (input === 'JARVIS') {
      setIsActive(true);
      setInput('');
    }
  }, [input]);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 font-mono"
        >
          <div className="absolute inset-0 bg-grid opacity-20" />
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-12 w-full max-w-2xl">
            
            {/* J.A.R.V.I.S. Voice UI */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <motion.div 
                className="absolute inset-0 border-2 border-cyan-500/50 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute inset-4 border border-amber-500/30 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
              />
              <div className="w-24 h-24 bg-cyan-400 rounded-full blur-xl animate-pulse" />
              <div className="w-16 h-16 bg-white rounded-full blur-md z-10" />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white tracking-[0.3em] hud-text">J.A.R.V.I.S.</h2>
              <div className="text-cyan-400 tracking-widest text-sm h-8">
                <TypingText text="Just A Rather Very Intelligent System." delay={0.5} />
              </div>
              <div className="text-amber-400 tracking-widest text-xs h-8">
                <TypingText text="At your service, sir. All systems are currently optimal." delay={2.5} />
              </div>
            </div>

            <button
              onClick={() => setIsActive(false)}
              className="px-8 py-3 bg-transparent border border-cyan-500/50 text-cyan-500 tracking-widest text-xs hover:bg-cyan-500/20 transition-colors"
            >
              DISCONNECT
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TypingText({ text, delay }: { text: string; delay: number }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const startTyping = () => {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
    };

    timeout = setTimeout(startTyping, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <p>{displayed}</p>;
}
