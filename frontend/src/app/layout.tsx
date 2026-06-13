import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/effects/SmoothScroll";
import MouseGlow from "@/components/effects/MouseGlow";
import Particles from "@/components/effects/Particles";
import ScrollProgress from "@/components/effects/ScrollProgress";
import BackButton from "@/components/ui/back-button";
import Navbar from "@/components/ui/navbar";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PRISM powered by PHANTOM",
  description: "Product Recovery Intelligence & Sustainability Mechanism",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700,400,900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col relative selection:bg-primary/30 selection:text-primary-dark">
        <div className="noise-overlay" />
        <div className="fixed inset-0 grid-bg -z-10 pointer-events-none opacity-50" />
        
        <SmoothScroll>
          <Navbar />
          <BackButton />
          <MouseGlow />
          <Particles />
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
