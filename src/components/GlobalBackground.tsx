import { useEffect, useRef, useState } from 'react';

export function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas HUD Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    const mouse = { 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2, 
      tx: window.innerWidth / 2, 
      ty: window.innerHeight / 2 
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const particles: {x: number, y: number, speed: number, size: number}[] = Array.from({length: 100}, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: 0.5 + Math.random() * 2,
      size: Math.random() * 2
    }));

    const drawHUD = () => {
      time += 0.02;
      
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      const px = (mouse.x - cx) * 0.02;
      const py = (mouse.y - cy) * 0.02;

      ctx.clearRect(0, 0, w, h);

      // Particles
      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) p.y = h;
        ctx.beginPath();
        ctx.arc(p.x + px, p.y + py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Visor Edges (Cinematic Cyan/Blue)
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(w * 0.1, h * 0.05, w * 0.2, 0);
      ctx.moveTo(w * 0.8, 0);
      ctx.quadraticCurveTo(w * 0.9, h * 0.05, w, 0);
      ctx.moveTo(0, h);
      ctx.quadraticCurveTo(w * 0.1, h * 0.95, w * 0.2, h);
      ctx.moveTo(w * 0.8, h);
      ctx.quadraticCurveTo(w * 0.9, h * 0.95, w, h);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Subtle center reticle
      ctx.save();
      ctx.translate(cx + px, cy + py);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 300, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(-320, 0); ctx.lineTo(-280, 0);
      ctx.moveTo(320, 0); ctx.lineTo(280, 0);
      ctx.moveTo(0, -320); ctx.lineTo(0, -280);
      ctx.moveTo(0, 320); ctx.lineTo(0, 280);
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(drawHUD);
    };

    drawHUD();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none font-mono">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(6,182,212,0.03)_50%,transparent_100%)] h-[200%] animate-scan opacity-50" />
    </div>
  );
}
