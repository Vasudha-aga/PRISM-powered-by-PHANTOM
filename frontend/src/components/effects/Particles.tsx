"use client";

import { useEffect, useRef } from "react";

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speedY: number; opacity: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const spawnParticle = (yPos?: number) => {
      const x = Math.random() * canvas.width;
      // Define the middle 70% of the screen
      const isMiddle = x > canvas.width * 0.15 && x < canvas.width * 0.85;
      
      // Darker particles should mostly appear on the sides
      // 5% chance in the middle, 40% chance on the sides
      const isDark = isMiddle ? Math.random() > 0.95 : Math.random() > 0.6;
      
      return {
        x,
        y: yPos !== undefined ? yPos : Math.random() * canvas.height,
        size: isDark ? Math.random() * 3.5 + 1.5 : Math.random() * 1.5 + 0.5,
        speedY: Math.random() * 0.4 + 0.1,
        opacity: isDark ? Math.random() * 0.5 + 0.5 : Math.random() * 0.3 + 0.1,
      };
    };

    const createParticles = () => {
      particles = [];
      const numParticles = Math.floor(window.innerWidth / 30);
      for (let i = 0; i < numParticles; i++) {
        particles.push(spawnParticle());
      }
    };

    createParticles();

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, index) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 126, 0, ${p.opacity})`;
        ctx.fill();

        p.y -= p.speedY;

        if (p.y < -10) {
          particles[index] = spawnParticle(canvas.height + 10);
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[-5]" />;
}
