import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.8, ease: "power3.out" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.8, ease: "power3.out" });
    
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, borderColor: 'rgba(6, 182, 212, 0.8)', duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };
    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, borderColor: 'rgba(6, 182, 212, 0.3)', duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-interactive]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-12 h-12 border border-cyan-500/30 rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center mix-blend-screen"
      >
        {/* Crosshairs */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-500/50 -translate-x-1/2" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-cyan-500/50 -translate-y-1/2" />
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-cyan-400 rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 hidden md:block shadow-[0_0_10px_#06b6d4]"
      />
    </>
  );
}
