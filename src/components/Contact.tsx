import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Github, Mail, Linkedin, CheckCircle2, Loader2 } from 'lucide-react';

export function Contact() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'transmitted'>('idle');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('transmitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      setStatus('transmitted');
      form.reset();
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Transmission failed:', error);
      setStatus('idle');
    }
  };

  return (
    <section className="py-32 relative z-10 font-mono">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-cyan-500 flex-1" />
          <div className="text-cyan-400 tracking-[0.5em] text-sm uppercase">COMMUNICATION CONSOLE</div>
          <div className="h-px bg-cyan-500 flex-1" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hud-panel p-8 md:p-12"
        >
          <form 
            action="https://formsubmit.co/ajax/shivanshdubey013@gmail.com" 
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-6 relative z-10"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New Transmission via Stark HUD" />
            <input type="hidden" name="_template" value="box" />
            {currentUrl && <input type="hidden" name="_next" value={currentUrl} />}
            <input type="hidden" name="System_Message" value="Received from HUD Interface" />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-cyan-600 uppercase tracking-widest">ALIAS (NAME)</label>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={status !== 'idle'}
                  className="w-full bg-cyan-950/30 border border-cyan-500/30 px-4 py-3 text-cyan-100 focus:outline-none focus:border-cyan-400 focus:bg-cyan-900/40 transition-colors backdrop-blur-sm disabled:opacity-50"
                  placeholder="Enter alias..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-cyan-600 uppercase tracking-widest">COMMS LINK (EMAIL)</label>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={status !== 'idle'}
                  className="w-full bg-cyan-950/30 border border-cyan-500/30 px-4 py-3 text-cyan-100 focus:outline-none focus:border-cyan-400 focus:bg-cyan-900/40 transition-colors backdrop-blur-sm disabled:opacity-50"
                  placeholder="Enter frequency..."
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-cyan-600 uppercase tracking-widest">TRANSMISSION</label>
              <textarea
                name="message"
                rows={4}
                required
                disabled={status !== 'idle'}
                className="w-full bg-cyan-950/30 border border-cyan-500/30 px-4 py-3 text-cyan-100 focus:outline-none focus:border-cyan-400 focus:bg-cyan-900/40 transition-colors resize-none backdrop-blur-sm disabled:opacity-50"
                placeholder="Type message here..."
              />
            </div>
            <button
              type="submit"
              disabled={status !== 'idle'}
              className="w-full py-4 bg-cyan-500/20 text-cyan-300 tracking-widest border border-cyan-500/50 hover:bg-cyan-500/40 transition-all flex items-center justify-center gap-3 text-sm uppercase group disabled:pointer-events-none disabled:bg-cyan-900/40"
            >
              {status === 'idle' && (
                <>
                  <span>Transmit Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
              {status === 'transmitting' && (
                <>
                  <span>Transmitting...</span>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              )}
              {status === 'transmitted' && (
                <>
                  <span className="text-green-400">Transmitted</span>
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-cyan-500/30 flex justify-center gap-8 relative z-10">
            <SocialLink href="https://github.com/shiv2015A" icon={Github} label="GitHub" />
            <SocialLink href="https://linkedin.com/in/shivanshdubey" icon={Linkedin} label="LinkedIn" />
            <SocialLink href="mailto:shivanshdubey013@gmail.com" icon={Mail} label="Email" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 text-cyan-600 hover:text-cyan-300 transition-colors group"
    >
      <div className="p-3 border border-cyan-500/30 rounded-full group-hover:border-cyan-400 group-hover:bg-cyan-900/30 transition-all">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-[10px] tracking-widest uppercase">{label}</span>
    </a>
  );
}
