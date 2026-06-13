"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-20 left-8 z-40"
    >
      <Button 
        variant="outline" 
        size="icon"
        className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border-border hover:bg-white shadow-lg transition-all"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-5 h-5 text-text-primary" />
      </Button>
    </motion.div>
  );
}
