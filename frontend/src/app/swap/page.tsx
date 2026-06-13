"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { MapPin, ArrowRightLeft, ShieldCheck, Truck, Leaf, Banknote } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SwapResponse {
  match_found: boolean;
  match_confidence: number;
  product: string;
  buyer_city: string;
  seller_city: string;
  logistics_saved: number;
  carbon_saved: number;
  status: string;
}

export default function SwapPage() {
  const [data, setData] = useState<SwapResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/swap");
        setData(res.data);
      } catch (error) {
        console.error(error);
        setData({
          match_found: true,
          match_confidence: 92,
          product: "Sony WH-1000XM5",
          buyer_city: "Mumbai",
          seller_city: "Pune",
          logistics_saved: 120,
          carbon_saved: 2.4,
          status: "Warehouse Bypassed"
        });
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-success/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-bold tracking-wide uppercase mb-6">
            <ArrowRightLeft className="w-4 h-4" />
            Direct Swap Network
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight uppercase mb-4">
            Peer-to-Peer <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">Matching</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Bypassing centralized warehouses by matching returns directly with local demand.
          </p>
        </motion.div>

        {/* Matching Visualization */}
        <div className="relative mb-20 py-10">
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8 md:gap-0">
            
            {/* Seller Node */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 rounded-3xl w-full md:w-72 text-center relative"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full border-4 border-background flex items-center justify-center shadow-lg">
                <span className="font-bold text-text-primary">1</span>
              </div>
              <MapPin className="w-8 h-8 text-text-secondary mx-auto mb-4" />
              <div className="text-sm font-bold tracking-widest text-text-secondary uppercase mb-1">Return Origin</div>
              <div className="text-2xl font-black text-text-primary">{data.seller_city}</div>
              <div className="mt-4 text-sm text-text-secondary bg-white/50 py-1 px-3 rounded-full inline-block">
                {data.product}
              </div>
            </motion.div>

            {/* Connection Line */}
            <div className="hidden md:block flex-1 px-8 relative">
              <motion.div 
                className="h-1 bg-gradient-to-r from-border via-primary to-border w-full relative"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ originX: 0 }}
              >
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border border-primary/20 shadow-[0_0_30px_rgba(255,153,0,0.3)] flex items-center justify-center z-20"
                  initial={{ left: "0%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                >
                  <ArrowRightLeft className="w-6 h-6 text-primary" />
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-10 text-center w-full"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-success/10 text-success rounded-full text-xs font-bold uppercase tracking-wider border border-success/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {data.match_confidence}% Match
                </div>
              </motion.div>
            </div>

            {/* Buyer Node */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-8 rounded-3xl w-full md:w-72 text-center relative border-primary/30 shadow-[0_0_40px_-10px_rgba(255,153,0,0.15)]"
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full border-4 border-background flex items-center justify-center shadow-lg shadow-primary/30 text-white">
                <span className="font-bold">2</span>
              </div>
              <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="text-sm font-bold tracking-widest text-text-secondary uppercase mb-1">Local Demand</div>
              <div className="text-2xl font-black text-text-primary">{data.buyer_city}</div>
              <div className="mt-4 text-sm text-primary font-bold bg-primary/10 py-1 px-3 rounded-full inline-block">
                Buyer Waiting
              </div>
            </motion.div>

          </div>
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Card className="glass-card p-6 rounded-3xl border-border hover:border-primary/30 transition-colors">
              <Truck className="w-8 h-8 text-text-secondary mb-4" />
              <div className="text-sm font-bold tracking-widest text-text-secondary uppercase mb-1">Logistics Status</div>
              <div className="text-2xl font-black text-text-primary">{data.status}</div>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <Card className="glass-card p-6 rounded-3xl border-border hover:border-primary/30 transition-colors">
              <Banknote className="w-8 h-8 text-success mb-4" />
              <div className="text-sm font-bold tracking-widest text-text-secondary uppercase mb-1">Cost Saved</div>
              <div className="text-4xl font-black text-text-primary">₹{data.logistics_saved}</div>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <Card className="glass-card p-6 rounded-3xl border-border hover:border-primary/30 transition-colors relative overflow-hidden group">
              <div className="absolute right-[-10%] top-[-10%] w-24 h-24 bg-success/10 rounded-full blur-xl group-hover:bg-success/20 transition-colors" />
              <Leaf className="w-8 h-8 text-success mb-4 relative z-10" />
              <div className="text-sm font-bold tracking-widest text-text-secondary uppercase mb-1 relative z-10">Carbon Prevented</div>
              <div className="text-4xl font-black text-success relative z-10">{data.carbon_saved} <span className="text-xl">kg</span></div>
            </Card>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
