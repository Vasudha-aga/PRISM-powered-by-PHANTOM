"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, Activity, Tag, Wrench, RotateCcw, Leaf } from "lucide-react";
import Link from "next/link";

interface PhantomResponse {
  score: number;
  condition_score: number;
  demand_score: number;
  resale_value: number;
  repair_cost: number;
  return_reason_score: number;
  sustainability_score: number;
  asset_class: string;
}

function AnalysisContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<PhantomResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Animated counter state
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          product_name: searchParams.get("product") || "Unknown Product",
          category: searchParams.get("category") || "General",
          condition_description: searchParams.get("condition") || "No description",
          return_reason: searchParams.get("reason") || "Unknown reason",
        };

        const res = await api.post("/phantom", payload);
        setData(res.data);
      } catch (error) {
        console.error(error);
        // Fallback for demo purposes if backend fails
        setData({
          score: 73,
          condition_score: 22,
          demand_score: 12,
          resale_value: 15,
          repair_cost: 8,
          return_reason_score: 6,
          sustainability_score: 10,
          asset_class: "MEDIUM VALUE ASSET"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    if (data) {
      let start = 0;
      const end = data.score;
      const duration = 2000;
      const incrementTime = 20;
      const steps = duration / incrementTime;
      const increment = end / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayScore(end);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.floor(start));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <BrainCircuit className="w-12 h-12 text-primary animate-pulse" />
          <p className="text-xl font-medium tracking-widest uppercase">Initializing PHANTOM...</p>
        </div>
      </div>
    );
  }

  const subScores = [
    { label: "Condition", value: data?.condition_score, icon: Activity },
    { label: "Demand", value: data?.demand_score, icon: Tag },
    { label: "Resale Val", value: data?.resale_value, icon: ArrowRight },
    { label: "Repair", value: data?.repair_cost, icon: Wrench },
    { label: "Reason", value: data?.return_reason_score, icon: RotateCcw },
    { label: "Eco Impact", value: data?.sustainability_score, icon: Leaf },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 overflow-hidden relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-6 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,153,0,0.2)]"
            >
              {data?.asset_class}
            </motion.div>
          </div>
          <h1 className="text-5xl font-black text-text-primary tracking-tight">PHANTOM ANALYSIS</h1>
        </div>

        {/* Hero Visualization */}
        <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center">
          
          {/* Animated rings */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-primary/20 border-dashed"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-4 rounded-full border-2 border-primary/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-xl" />

          {/* Sub-scores orbiting */}
          {subScores.map((score, i) => {
            const angle = (i * 360) / subScores.length;
            const radius = 220; // Distance from center
            return (
              <div
                key={i}
                className="absolute z-20 hidden md:block"
                style={{
                  transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                }}
              >
                <motion.div
                  className="flex flex-col items-center justify-center glass-card w-24 h-24 rounded-full border border-primary/20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                >
                  <score.icon className="w-5 h-5 text-text-secondary mb-1" />
                  <span className="text-xl font-bold text-primary">{score.value}</span>
                  <span className="text-[10px] uppercase font-bold text-text-secondary tracking-tighter text-center leading-tight px-2">{score.label}</span>
                </motion.div>
              </div>
            );
          })}

          {/* Center Score */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="relative z-30 w-64 h-64 rounded-full glass-card border border-primary/30 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(255,153,0,0.15)] bg-white/60"
          >
            <span className="text-sm font-bold tracking-widest text-text-secondary uppercase mb-2">Total Score</span>
            <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary-dark leading-none">
              {displayScore}
            </div>
            
            {/* Circular Progress SVG */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
              <circle 
                cx="128" cy="128" r="124" 
                fill="none" stroke="rgba(17, 24, 39, 0.05)" strokeWidth="4" 
              />
              <motion.circle 
                cx="128" cy="128" r="124" 
                fill="none" stroke="#FF9900" strokeWidth="4" 
                strokeDasharray="780" // 2 * PI * R
                strokeDashoffset={780 - (780 * displayScore) / 100}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 780 }}
                animate={{ strokeDashoffset: 780 - (780 * displayScore) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Mobile sub-scores (fallback for small screens) */}
        <div className="mt-16 md:hidden grid grid-cols-3 gap-4 w-full">
           {subScores.map((score, i) => (
             <div key={i} className="glass-card p-3 rounded-2xl flex flex-col items-center text-center">
               <score.icon className="w-4 h-4 text-primary mb-1" />
               <span className="text-lg font-bold">{score.value}</span>
               <span className="text-[10px] uppercase text-text-secondary font-bold">{score.label}</span>
             </div>
           ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <Link href={`/decision?score=${data?.score}&grade=${searchParams.get("grade") || "B"}&category=${searchParams.get("category") || "Electronics"}`} className="inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap outline-none select-none h-14 px-10 text-lg bg-text-primary hover:bg-black text-white rounded-full">
              Generate Decision <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

export default function PhantomAnalysisPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnalysisContent />
    </Suspense>
  );
}
