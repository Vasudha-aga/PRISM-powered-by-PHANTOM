import Link from "next/link";
import { Sparkles } from "lucide-react";
import FooterNetwork from "@/components/effects/FooterNetwork";
import { forwardRef } from "react";

const PrismIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 42 16 A 38 38 0 1 1 30 80" stroke="#0F172A" strokeWidth="6" strokeLinecap="round"/>
    <path d="M 30 30 L 75 50 L 25.5 50 Z" fill="#F99F00" />
    <path d="M 25.5 50 L 75 50 L 21 70 Z" fill="#B76E00" />
  </svg>
);

const Footer = forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <footer className="w-full border-t border-border/50 bg-white/30 backdrop-blur-md pt-20 pb-10 px-4 mt-32 relative z-20">
      <FooterNetwork ref={ref} />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8 relative z-10">
        
        {/* Brand Column */}
        <div className="flex flex-col max-w-xs">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
            <PrismIcon className="w-12 h-12 drop-shadow-sm" />
            <div className="flex flex-col justify-center">
              <span className="text-3xl font-black tracking-widest text-[#0F172A] leading-none mb-1">PRISM</span>
              <span className="text-xs font-medium tracking-widest uppercase leading-none">
                <span className="text-text-secondary/70">Powered by </span>
                <span className="text-[#F99F00]">PHANTOM</span>
              </span>
            </div>
          </Link>
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            Intelligent reverse commerce for the next generation of sustainable retail. Powered by PHANTOM.
          </p>
          <div className="flex items-center gap-4 text-text-secondary">
            <Link href="https://github.com/Vasudha-aga/PRISM-powered-by-PHANTOM" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </Link>
          </div>
        </div>

        {/* Links Columns */}
        <div className="flex flex-wrap gap-12 md:gap-24">
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-text-primary uppercase tracking-wider text-sm mb-2">Product</h4>
            <Link href="/inspection" className="text-text-secondary hover:text-primary text-sm transition-colors">AI Inspection</Link>
            <Link href="/analysis" className="text-text-secondary hover:text-primary text-sm transition-colors">PHANTOM Analysis</Link>
            <Link href="#" className="text-text-secondary hover:text-primary text-sm transition-colors">Decision Engine</Link>
            <Link href="#" className="text-text-secondary hover:text-primary text-sm transition-colors">Sustainability</Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-secondary/60 text-sm">
          © {new Date().getFullYear()} PRISM Technologies Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-sm font-medium text-text-secondary bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          All Systems Operational
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
