"use client";

import { useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FooterNetwork = forwardRef<HTMLDivElement, {}>((props, forwardedRef) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreInternalRef = useRef<HTMLDivElement>(null);
  const coreRef = (forwardedRef as React.RefObject<HTMLDivElement>) || coreInternalRef;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !coreRef.current) return;
    const core = coreRef.current;
    
    const triggerOptions = {
      trigger: core,
      start: "center 55%",
    };

    // 1. Core Activation Pulse Ring (Expanding ripple)
    gsap.fromTo(
      ".network-pulse-ring",
      { scale: 1, opacity: 1, borderWidth: "2px" },
      {
        scale: 6,
        opacity: 0,
        borderWidth: "0px",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: triggerOptions,
      }
    );

    // 2. Core Brightness
    gsap.fromTo(
      ".network-core",
      { opacity: 0.3 },
      {
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: triggerOptions,
      }
    );

    // 3. Inner & Outer Rings & Ambient Glow Fade In
    gsap.fromTo(
      ".network-ambient-glow, .network-inner-ring, .network-outer-ring",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: triggerOptions,
      }
    );

    // 4. Lines propagate outwards
    gsap.fromTo(
      ".network-line",
      { strokeDasharray: 2000, strokeDashoffset: 2000, opacity: 0 },
      {
        strokeDashoffset: 0,
        opacity: 0.6,
        duration: 2.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: triggerOptions,
      }
    );

    // 5. Tiny Energy Particles
    gsap.fromTo(
      ".network-particle",
      { strokeDasharray: "4 2000", strokeDashoffset: 0, opacity: 0 },
      {
        strokeDashoffset: -2000,
        opacity: 1,
        duration: 3,
        stagger: { each: 0.15, repeat: -1, repeatDelay: 5 },
        ease: "power1.inOut",
        scrollTrigger: triggerOptions,
      }
    );

    // 6. Breathing State for Rings and Ambient Glow
    gsap.to(".network-ambient-glow", {
      opacity: 0.6,
      scale: 0.95,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      scrollTrigger: triggerOptions,
      delay: 1.5 
    });

  }, [coreRef]);

  // Generate Organic SVG Paths
  const createPath = (side: "left" | "right", index: number) => {
    const dir = side === "left" ? -1 : 1;
    const startX = 600;
    const startY = 20; 
    
    const endX = 600 + (dir * 600);
    // Tighter vertical spread to fit more lines beautifully
    const endY = 25 + (index * 16); 
    
    const cp1X = startX + (dir * 120);
    const cp1Y = startY + (index * 8);
    
    const cp2X = startX + (dir * 350);
    const cp2Y = 80 + (index * 12);
    
    return `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
  };

  // Generate 12 lines per side (24 total) for a much richer network
  const lines = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div ref={containerRef} className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[200px] pointer-events-none z-0">
      
      {/* Network SVG Canvas */}
      <svg viewBox="0 0 1200 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradLeft" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF9900" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#FF9900" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF9900" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9900" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#FF9900" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF9900" stopOpacity="0" />
          </linearGradient>
          <filter id="tightGlow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Crisp Inner Base Paths */}
        {lines.map(i => (
          <g key={`lines-${i}`}>
            <path className="network-line" d={createPath("left", i)} fill="none" stroke="url(#lineGradLeft)" strokeWidth={1} />
            <path className="network-line" d={createPath("right", i)} fill="none" stroke="url(#lineGradRight)" strokeWidth={1} />
          </g>
        ))}

        {/* Tiny Traveling Particles with tight glow */}
        {lines.map(i => (
          <g key={`particles-${i}`}>
            <path className="network-particle" d={createPath("left", i)} fill="none" stroke="#FFF7E6" strokeWidth={1.5} filter="url(#tightGlow)" />
            <path className="network-particle" d={createPath("right", i)} fill="none" stroke="#FFF7E6" strokeWidth={1.5} filter="url(#tightGlow)" />
          </g>
        ))}
      </svg>

      {/* Central Core container */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10" style={{ top: '20px' }}>
        
        {/* Soft radial glow fading naturally in all directions (Max 80px radius = 160px diameter) */}
        <div className="network-ambient-glow absolute w-[160px] h-[160px] rounded-full bg-[radial-gradient(circle,rgba(255,153,0,0.12)_0%,rgba(255,153,0,0.03)_40%,transparent_70%)] opacity-0 pointer-events-none" />

        {/* Very subtle outer ring */}
        <div className="network-outer-ring absolute w-10 h-10 rounded-full border border-[#FF9900]/15 opacity-0 pointer-events-none" />

        {/* Thin circular ring around the core */}
        <div className="network-inner-ring absolute w-5 h-5 rounded-full border border-[#FF9900]/40 opacity-0 pointer-events-none" />

        {/* Activation Pulse Ring */}
        <div className="network-pulse-ring absolute w-3 h-3 rounded-full border border-[#FF9900] opacity-0 pointer-events-none" />
        
        {/* Small Precise Core Node */}
        <div 
          ref={coreRef}
          className="network-core relative w-[6px] h-[6px] rounded-full bg-[#FFF7E6] shadow-[0_0_4px_1px_rgba(255,153,0,0.8)] z-10"
        />
      </div>
    </div>
  );
});

FooterNetwork.displayName = "FooterNetwork";
export default FooterNetwork;
