"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Box, BrainCircuit, Activity, Recycle, Leaf, Sparkles } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/ui/footer";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const laserContainerRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !laserRef.current || !laserContainerRef.current) return;

    // Dynamically calculate the exact distance from the laser start to the final card
    const updateLaserHeight = () => {
      if (!laserContainerRef.current || !lastCardRef.current) return;
      const startY = laserContainerRef.current.getBoundingClientRect().top + window.scrollY;
      const endY = lastCardRef.current.getBoundingClientRect().top + window.scrollY;
      const distance = endY - startY + 24; // Reach the center of the final node
      laserContainerRef.current.style.height = `${distance}px`;
      ScrollTrigger.refresh();
    };

    const timeout = setTimeout(updateLaserHeight, 200);
    window.addEventListener('resize', updateLaserHeight);

    // Laser line animation exactly matching scroll speed
    // By setting the container to exactly the distance to the last card,
    // the height grows exactly 1px for every 1px scrolled, stopping perfectly at the end.
    gsap.to(laserRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: laserContainerRef.current,
        start: "top 55%", // Tip sits perfectly at 55% of the viewport (center)
        end: "bottom 55%", 
        scrub: true, // instant 1:1 tracking
      },
    });

    // Card Glow animations as laser passes
    const cards = document.querySelectorAll(".journey-card-container");
    cards.forEach((card) => {
      const node = card.querySelector(".journey-node");
      const innerCard = card.querySelector(".journey-card");
      const icon = card.querySelector(".journey-icon");

      const glowTrigger = {
        trigger: card,
        start: "top 55%", // Trigger exactly when the card hits the laser tip
        toggleActions: "play none none reverse",
      };

      gsap.to(innerCard, {
        opacity: 1,
        scale: 1,
        borderColor: "rgba(255,153,0,0.5)",
        boxShadow: "0 0 40px -10px rgba(255,153,0,0.3)",
        scrollTrigger: glowTrigger
      });
      gsap.to(node, {
        backgroundColor: "#FF9900",
        borderColor: "#FF9900",
        boxShadow: "0 0 20px rgba(255,153,0,0.8)",
        scrollTrigger: glowTrigger
      });
      gsap.to(icon, {
        backgroundColor: "rgba(255,153,0,0.2)",
        scale: 1.1,
        scrollTrigger: glowTrigger
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const snakePath = "M 50 0 " + Array.from({length: 60}).map((_, i) => i === 0 ? "Q 100 100, 50 200" : `T 50 ${200 * (i + 1)}`).join(" ");

  return (
    <main className="relative min-h-screen overflow-hidden" ref={containerRef}>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto space-y-8 relative"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium tracking-wide uppercase mb-4 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Product Recovery Intelligence & Sustainability Mechanism
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-text-primary uppercase leading-[0.9] tracking-tighter mix-blend-multiply">
            Every Return <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              Has A Future.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            PRISM uses <span className="font-semibold text-text-primary">PHANTOM</span> to determine the highest-value and most sustainable future for every returned product.
          </p>

          {/* Perfectly Aligned Button and Scroll Row */}
          <div className="flex w-full max-w-4xl mx-auto items-center justify-between pt-16 relative">
            <div className="flex-1 flex justify-end pr-4 md:pr-12">
              <Link href="/inspection" className="inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap outline-none select-none h-14 px-8 text-lg bg-primary hover:bg-primary-dark text-white rounded-full shadow-[0_0_40px_-10px_rgba(255,153,0,0.5)] transition-all hover:scale-105">
                  Inspect Product <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            
            {/* Scroll Indicator exactly between buttons */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2 text-text-secondary/50 pt-2 z-10 relative">
              <span className="text-xs tracking-widest uppercase bg-background px-2 relative z-10 font-bold">Scroll</span>
              
              {/* Global Laser Snake Container starting EXACTLY below text */}
              <div 
                ref={laserContainerRef} 
                className="absolute top-6 left-1/2 -translate-x-1/2 w-[100px] pointer-events-none -z-10"
                style={{ height: '8000px' }}
              >
                {/* Dim Background Snake (Ultra-thin track) */}
                <svg className="w-full h-full" preserveAspectRatio="xMidYMin slice">
                    <path d={snakePath} fill="none" stroke="rgba(255,153,0,0.15)" strokeWidth="1" />
                </svg>
                
                {/* Active Laser Wrapper */}
                <div 
                  ref={laserRef}
                  className="absolute top-0 left-0 w-full overflow-hidden"
                  style={{ height: '0%' }}
                >
                  <svg className="w-full" style={{ height: '8000px' }} preserveAspectRatio="xMidYMin slice">
                    <defs>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    {/* Beam width reduced 70%, glow reduced 50% */}
                    <path d={snakePath} fill="none" stroke="#FF9900" strokeWidth="1.5" filter="url(#glow)" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-start pl-4 md:pl-12">
              <Link href="/analysis" className="inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap outline-none select-none h-14 px-8 text-lg rounded-full border border-border bg-white/80 backdrop-blur-md hover:bg-white text-text-primary transition-all shadow-sm">
                  View PHANTOM Analysis
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Storytelling Section */}
      <section className="relative w-full max-w-5xl mx-auto mt-24 px-4 z-10">
        {/* Journey Steps - Centered Over Laser */}
        <div className="space-y-32 relative pb-40 flex flex-col items-center">
          {[
            { icon: Box, title: "Return Initiated", desc: "Customer drops off package. Intake begins." },
            { icon: Activity, title: "AI Inspection", desc: "Computer vision grades condition and identifies damage." },
            { icon: BrainCircuit, title: "PHANTOM Analysis", desc: "Heuristic engine calculates highest-value recovery path." },
            { icon: ArrowRight, title: "Decision Engine", desc: "Automated routing to optimal facility." },
            { icon: Recycle, title: "Product Recovery", desc: "Item is refurbished, resold, or recycled." },
            { icon: Leaf, title: "Sustainability Impact", desc: "Carbon saved and green credits generated." }
          ].map((step, idx, arr) => {
            const isLast = idx === arr.length - 1;
            return (
              <div key={idx} ref={isLast ? lastCardRef : null} className="journey-card-container relative flex flex-col items-center w-full max-w-lg z-10">
                {/* Node on Laser */}
                <div className="journey-node absolute left-1/2 top-[-1rem] w-6 h-6 rounded-full bg-background border-4 border-primary/30 z-20 -translate-x-1/2 transition-colors duration-500" />
                
                <div className="journey-card glass-card p-8 rounded-3xl transition-all duration-700 inline-flex flex-col items-center text-center w-full opacity-40 scale-95 border-border/50 mt-6 bg-white/40 backdrop-blur-xl">
                  <div className="journey-icon w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 transition-all duration-700">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-text-primary">{step.title}</h3>
                  <p className="text-text-secondary">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
