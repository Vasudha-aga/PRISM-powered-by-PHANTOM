"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { apiService } from "@/services/api";
import { ImpactResponse } from "@/types/api";
import { Leaf, Trees, Recycle, Zap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Custom hook for animated counter
function AnimatedCounter({ value, decimals = 0 }: { value: number, decimals?: number }) {
  const spring = useSpring(0, { duration: 2500, bounce: 0 });
  
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  const display = useTransform(spring, (current) => 
    current.toFixed(decimals)
  );

  return <motion.span>{display}</motion.span>;
}

export default function ImpactPage() {
  const [data, setData] = useState<ImpactResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.getImpact();
        setData(res);
      } catch (err) {
        console.error(err);
        setError("Failed to calculate sustainability impact. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Leaf className="w-16 h-16 text-success animate-pulse" />
          <p className="text-xl font-medium tracking-widest uppercase">Calculating Sustainability Impact...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="w-full max-w-lg flex flex-col items-center justify-center border border-red-500/20 rounded-3xl bg-red-50/50 backdrop-blur-sm p-8 text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-red-700 mb-2">Impact Error</h3>
          <p className="text-red-600/80 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
            Retry
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Dynamic background gradient */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-success/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-success/10 text-success mb-6 border border-success/20 shadow-[0_0_30px_rgba(22,163,74,0.2)]">
            <Leaf className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-text-primary tracking-tight uppercase mb-6">
            The PRISM <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-success to-primary">Effect</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Quantifiable environmental impact from intelligent product recovery. Every decision contributes to a circular economy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Main Hero Metric */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-12 rounded-[2.5rem] border-success/20 md:col-span-2 bg-gradient-to-br from-white/60 to-white/20 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop')] opacity-[0.03] mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div>
                <span className="text-sm font-bold tracking-widest text-text-secondary uppercase mb-2 block">
                  Total Carbon Prevented
                </span>
                <div className="text-7xl md:text-9xl font-black text-success leading-none">
                  <AnimatedCounter value={data.carbon_saved} decimals={1} />
                  <span className="text-4xl md:text-6xl text-success/50 ml-2">kg</span>
                </div>
              </div>
              
              <div className="mt-8 md:mt-0 text-right">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-success/10 border border-success/20 mb-4">
                  <Trees className="w-10 h-10 text-success" />
                </div>
                <div className="text-sm font-bold tracking-widest text-text-secondary uppercase mb-1">
                  Equivalent To Planting
                </div>
                <div className="text-4xl font-bold text-text-primary">
                  <AnimatedCounter value={data.trees_equivalent} decimals={2} /> Trees
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-10 rounded-[2rem] border-border group hover:border-primary/30 transition-colors"
          >
            <Zap className="w-8 h-8 text-primary mb-6" />
            <span className="text-sm font-bold tracking-widest text-text-secondary uppercase mb-2 block">
              Green Credits Earned
            </span>
            <div className="text-6xl font-black text-text-primary">
              <AnimatedCounter value={data.green_credits} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-10 rounded-[2rem] border-border group hover:border-primary/30 transition-colors"
          >
            <Recycle className="w-8 h-8 text-primary mb-6" />
            <span className="text-sm font-bold tracking-widest text-text-secondary uppercase mb-2 block">
              Products Reused
            </span>
            <div className="text-6xl font-black text-text-primary">
              <AnimatedCounter value={data.products_reused} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
