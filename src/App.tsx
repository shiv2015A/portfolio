import { useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { GlobalBackground } from './components/GlobalBackground';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { EasterEgg } from './components/EasterEgg';
import { BootSequence } from './components/BootSequence';

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      
      <div className={`relative min-h-screen bg-black text-white selection:bg-cyan-500/30 font-sans transition-opacity duration-1000 ${booted ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <CustomCursor />
        <GlobalBackground />
        <EasterEgg />
        
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
