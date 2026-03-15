import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const timeline = [
  { year: '2024', title: 'The AI Initiative', desc: 'Started building JARVIUS and integrating LLMs into daily workflows.' },
  { year: '2023', title: 'Web Development Mastery', desc: 'Founded WebByTe, delivering full-stack applications for clients.' },
  { year: '2022', title: 'Hardware & Robotics', desc: 'Built first autonomous drone and dove deep into Arduino programming.' },
  { year: '2021', title: 'The Spark', desc: 'Wrote my first line of code. The journey of a thousand miles began.' },
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="py-32 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="inline-block bg-white text-black font-black px-6 py-2 text-3xl uppercase tracking-widest border-4 border-black comic-shadow-cyan transform skew-x-12 mb-20">
          Story Arcs
        </div>

        <div className="relative">
          {/* Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-2 bg-black border-x-2 border-white -translate-x-1/2" />
          <motion.div
            style={{ height }}
            className="absolute left-4 md:left-1/2 top-0 w-2 bg-red-600 -translate-x-1/2 origin-top border-x-2 border-red-400"
          />

          <div className="space-y-24">
            {timeline.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }: { item: any; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Dot */}
      <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-amber-400 border-4 border-black comic-shadow-red -translate-x-1/2 z-10 transform rotate-45" />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50, rotate: isEven ? 5 : -5 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className={`ml-16 md:ml-0 md:w-[45%] comic-panel comic-shadow-white p-6 bg-zinc-900 ${isEven ? 'md:text-left' : 'md:text-right'}`}
      >
        <div className="inline-block bg-black text-amber-400 font-black px-3 py-1 border-2 border-amber-400 mb-4 transform -skew-x-12">
          VOL. {item.year}
        </div>
        <h3 className="text-2xl font-black text-white uppercase mb-3 comic-text-red">{item.title}</h3>
        <p className="text-white text-lg font-medium leading-relaxed">{item.desc}</p>
      </motion.div>
    </div>
  );
}
