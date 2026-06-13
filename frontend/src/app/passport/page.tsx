"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiService } from "@/services/api";
import { PassportResponse } from "@/types/api";
import { useAppStore } from "@/store/useAppStore";
import { Fingerprint, Check, Clock, Cpu, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PassportPage() {
  const [data, setData] = useState<PassportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const decisionData = useAppStore((state) => state.decisionData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.getPassport({
          decision: decisionData?.decision || undefined,
        });
        setData(res);
      } catch (err) {
        console.error(err);
        setError("Failed to generate Product DNA. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [decisionData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Fingerprint className="w-16 h-16 text-primary animate-pulse" />
          <p className="text-xl font-medium tracking-widest uppercase">Generating Product DNA...</p>
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
          <h3 className="text-xl font-bold text-red-700 mb-2">Passport Error</h3>
          <p className="text-red-600/80 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
            Retry
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <Fingerprint className="w-16 h-16 text-primary mx-auto mb-6 opacity-80" />
        <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight uppercase">
          Product DNA
        </h1>
        <p className="text-text-secondary mt-4 max-w-md mx-auto">
          Immutable lifecycle record demonstrating the journey from initial purchase to sustainable recovery.
        </p>
      </motion.div>

      {/* DNA Visualization */}
      <div className="relative w-full max-w-3xl py-10">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/10 via-primary/30 to-primary/5 -translate-x-1/2 rounded-full" />
        
        <div className="space-y-16">
          {data?.timeline.map((item, index) => {
            const isCompleted = item.status === "completed";
            const isActive = item.status === "active";
            const isPending = item.status === "pending";
            
            // Alternate left and right
            const isLeft = index % 2 === 0;

            return (
              <div key={index} className="relative flex items-center justify-center w-full">
                {/* Connecting Line (DNA strand effect) */}
                <svg className="absolute w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
                  <path 
                    d={`M ${isLeft ? 'calc(50% - 100px)' : '50%'} 50 Q 50 100 ${isLeft ? '50%' : 'calc(50% + 100px)'} 50`} 
                    fill="none" 
                    stroke="#FF9900" 
                    strokeWidth="2" 
                  />
                </svg>

                {/* Node */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: isActive ? 1.2 : 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 
                    ${isCompleted ? "bg-white border-primary text-primary" : ""}
                    ${isActive ? "bg-primary border-primary-dark text-white shadow-[0_0_30px_rgba(255,153,0,0.6)]" : ""}
                    ${isPending ? "bg-background border-border text-border" : ""}
                  `}
                >
                  {isCompleted && <Check className="w-6 h-6" />}
                  {isActive && <div className="w-4 h-4 rounded-full bg-white animate-pulse" />}
                  {isPending && <Clock className="w-6 h-6" />}
                </motion.div>

                {/* Label */}
                <motion.div 
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className={`absolute w-[calc(50%-4rem)] ${isLeft ? "text-right pr-16 right-1/2" : "text-left pl-16 left-1/2"}`}
                >
                  <h3 className={`text-xl font-bold ${isActive ? "text-primary text-2xl" : "text-text-primary"} transition-all`}>
                    {item.stage}
                  </h3>
                  <p className="text-sm font-medium tracking-widest uppercase mt-1 text-text-secondary/70">
                    {item.status}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
