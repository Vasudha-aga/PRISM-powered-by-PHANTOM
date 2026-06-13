"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const PrismIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* The C-shaped outer ring */}
    <path d="M 42 16 A 38 38 0 1 1 30 80" stroke="#0F172A" strokeWidth="6" strokeLinecap="round"/>
    {/* Top Orange Triangle */}
    <path d="M 30 30 L 75 50 L 25.5 50 Z" fill="#F99F00" />
    {/* Bottom Brown Triangle */}
    <path d="M 25.5 50 L 75 50 L 21 70 Z" fill="#B76E00" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Inspection", href: "/inspection" },
    { name: "Analysis", href: "/analysis" },
    { name: "Decision", href: "/decision" },
    { name: "Passport", href: "/passport" },
    { name: "Impact", href: "/impact" },
    { name: "Swap", href: "/swap" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 glass-card bg-white/40 backdrop-blur-md border-b border-border/50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <PrismIcon className="h-10 w-10 drop-shadow-sm" />
        </Link>
        
        <div className="hidden md:flex items-center gap-1 bg-white/50 p-1 rounded-full border border-primary/10">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium tracking-wide transition-all ${
                  isActive ? "text-white" : "text-text-secondary hover:text-text-primary hover:bg-black/5"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_15px_rgba(255,153,0,0.4)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>
        
        {/* Mobile menu fallback - just showing a simple text or button if needed, but since it's a demo, showing text */}
        <div className="md:hidden text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
          Menu
        </div>
      </div>
    </motion.nav>
  );
}
