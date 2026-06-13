"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Leaf, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";

interface DecisionResponse {
  decision: string;
  confidence: number;
  reasons: string[];
  carbon_saved: number;
  green_credits: number;
}

function DecisionContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<DecisionResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          phantom_score: Number(searchParams.get("score")) || 73,
          grade: searchParams.get("grade") || "B",
          category: searchParams.get("category") || "Electronics",
        };

        const res = await api.post("/decision", payload);
        setData(res.data);
      } catch (error) {
        console.error(error);
        // Fallback for demo
        setData({
          decision: "RESELL AS NEW",
          confidence: 96,
          reasons: [
            "Asset grade A meets threshold for new condition.",
            "Demand score is exceptionally high in current market.",
            "Zero repair cost required for this asset."
          ],
          carbon_saved: 4.5,
          green_credits: 50
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Cpu className="w-12 h-12 text-primary animate-spin-slow" />
          <p className="text-xl font-medium tracking-widest uppercase">Computing Optimal Path...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
            Automated Routing Decision
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight">
            INTELLIGENT RECOVERY PATH
          </h1>
        </motion.div>

        {/* Large Center Decision Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative group mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <Card className="relative glass-card p-12 rounded-[2.5rem] border-primary/20 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-secondary mb-6">
              {data?.decision}
            </h2>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success font-bold tracking-wide border border-success/20">
              <ShieldCheck className="w-5 h-5" />
              {data?.confidence}% Confidence Score
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Reasons */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              Why this path?
            </h3>
            <ul className="space-y-4">
              {data?.reasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-text-secondary leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Impact Metrics */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute right-[-20%] top-[-20%] w-40 h-40 bg-success/10 rounded-full blur-2xl group-hover:bg-success/20 transition-colors" />
              <Leaf className="w-8 h-8 text-success mb-4" />
              <div className="text-sm font-bold tracking-widest text-text-secondary uppercase mb-1">Carbon Saved</div>
              <div className="text-5xl font-black text-text-primary">{data?.carbon_saved} <span className="text-2xl text-text-secondary">kg</span></div>
            </div>

            <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute right-[-20%] top-[-20%] w-40 h-40 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
              <div className="text-sm font-bold tracking-widest text-text-secondary uppercase mb-1">Green Credits Generated</div>
              <div className="text-5xl font-black text-primary">{data?.green_credits}</div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex justify-center gap-4"
        >
          <Link href="/passport" className="inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap outline-none select-none h-14 px-8 text-lg bg-text-primary hover:bg-black text-white rounded-full">
              View Product Passport <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <Link href="/swap" className="inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap outline-none select-none h-14 px-8 text-lg rounded-full border border-border bg-white/50 hover:bg-white backdrop-blur-md text-text-primary">
              View Direct Swap Matches
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

export default function DecisionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DecisionContent />
    </Suspense>
  );
}
