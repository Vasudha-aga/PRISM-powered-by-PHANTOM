"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Scan, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { apiService } from "@/services/api";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InspectionPage() {
  const router = useRouter();
  const setProductData = useAppStore((state) => state.setProductData);
  const setAnalyzeData = useAppStore((state) => state.setAnalyzeData);
  
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const result = useAppStore((state) => state.analyzeData);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    if (!file) {
      formData.delete("image");
    }

    // Save product data to global store
    setProductData({
      product_name: formData.get("product_name") as string,
      category: formData.get("category") as string,
      return_reason: formData.get("return_reason") as string,
      condition_description: formData.get("condition_description") as string,
    });

    try {
      const data = await apiService.analyze(formData);
      
      // Simulate scanning time for dramatic effect
      setTimeout(() => {
        setAnalyzeData(data);
        setLoading(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium tracking-wide uppercase mb-4">
            <Scan className="w-3 h-3" />
            AI Computer Vision
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-text-primary uppercase tracking-tight mb-4">
            Intelligent <br /> Inspection
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Upload the product and condition details. Our vision models will analyze the damage and grade the asset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="glass-card p-8 rounded-3xl border-border bg-white/40">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="product_name">Product Name</Label>
                <Input id="product_name" name="product_name" required className="bg-white/50 border-border" placeholder="e.g. Sony WH-1000XM5" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" required className="bg-white/50 border-border" placeholder="e.g. Electronics" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="return_reason">Return Reason</Label>
                <Input id="return_reason" name="return_reason" required className="bg-white/50 border-border" placeholder="e.g. Defective, Didn't like color" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition_description">Condition Description</Label>
                <Input id="condition_description" name="condition_description" required className="bg-white/50 border-border" placeholder="e.g. Box opened, small scratch" />
              </div>

              <div className="space-y-2 pt-2">
                <Label>Product Image</Label>
                <div className="relative border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-white/50 transition-colors">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {preview ? (
                    <div className="flex flex-col items-center gap-2">
                      <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                      <span className="text-sm text-text-secondary">Image selected</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-text-secondary">
                      <Upload className="w-8 h-8 opacity-50" />
                      <span className="text-sm">Click or drag image to upload</span>
                    </div>
                  )}
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 bg-primary hover:bg-primary-dark text-white rounded-xl text-lg font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40">
                {loading ? "Initializing Scan..." : "Analyze Product"}
              </Button>
            </form>
          </Card>

          {/* Results/Scanning Section */}
          <div className="relative h-full min-h-[500px]">
            <AnimatePresence mode="wait">
              {!loading && !result && !error && (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center border border-border/50 rounded-3xl bg-white/20 backdrop-blur-sm"
                >
                  <Scan className="w-16 h-16 text-text-secondary/20 mb-4" />
                  <p className="text-text-secondary font-medium tracking-wide">Awaiting Product Input</p>
                </motion.div>
              )}

              {error && !loading && (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center border border-red-500/20 rounded-3xl bg-red-50/50 backdrop-blur-sm p-8 text-center"
                >
                  <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                  <h3 className="text-xl font-bold text-red-700 mb-2">Analysis Error</h3>
                  <p className="text-red-600/80 mb-6">{error}</p>
                  <Button onClick={() => setError(null)} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                    Try Again
                  </Button>
                </motion.div>
              )}

              {loading && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 rounded-3xl overflow-hidden bg-black/5 border border-primary/20 flex flex-col items-center justify-center"
                >
                  {preview && (
                    <img src={preview} alt="Scanning" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale" />
                  )}
                  {/* Animated scanning line */}
                  <motion.div 
                    className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_20px_4px_rgba(255,153,0,0.8)] z-10"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className="relative z-20 glass-card px-8 py-6 rounded-2xl flex flex-col items-center text-center">
                    <Scan className="w-8 h-8 text-primary animate-pulse mb-4" />
                    <h3 className="text-xl font-bold text-text-primary mb-2">Analyzing Product...</h3>
                    <p className="text-sm text-text-secondary">Running computer vision models</p>
                    
                    <div className="w-48 h-1 bg-border rounded-full mt-6 overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {result && !loading && !error && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 glass-card p-8 rounded-3xl border-border flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-success mb-8">
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="font-bold tracking-wide uppercase">Analysis Complete</span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="space-y-1">
                        <span className="text-sm text-text-secondary font-medium">Condition Grade</span>
                        <div className="text-5xl font-black text-primary">{result.grade}</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm text-text-secondary font-medium">Confidence Score</span>
                        <div className="text-5xl font-black text-text-primary">{result.confidence}%</div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white/50 p-4 rounded-xl border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-primary" />
                          <span className="font-bold text-sm">Damage Detected</span>
                        </div>
                        <p className="text-text-secondary text-sm">{result.damage}</p>
                      </div>

                      <div className="bg-white/50 p-4 rounded-xl border border-border">
                        <span className="font-bold text-sm block mb-2">Summary</span>
                        <p className="text-text-secondary text-sm leading-relaxed">{result.summary}</p>
                      </div>
                    </div>
                  </div>

                  <Link 
                    href="/analysis"
                    className="inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap outline-none select-none w-full mt-8 h-12 bg-text-primary hover:bg-black text-white rounded-xl"
                  >
                      Proceed to PHANTOM Analysis <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
