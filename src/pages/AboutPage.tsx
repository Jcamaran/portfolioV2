"use client";

import ParticlesBackground from "@/components/ParticlesBackground";
import { motion } from "framer-motion";
import { useEffect, memo } from "react";
import ProfileCard from "@/components/about/ProfileCard";
import BioCard from "@/components/about/BioCard";
import DualClock from "@/components/about/DualClock";
import SpotifyCard from "@/components/about/SpotifyCard";
import SkillsCard from "@/components/about/SkillsCard";
import InternshipCard from "@/components/about/InternshipCard";

const MemoizedParticles = memo(ParticlesBackground);

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);   

  return (
    <div className="h-full   font-sans pt-4">
      <MemoizedParticles />
      

      <main className="relative z-10 h-full w-full flex flex-col gap-4 sm:gap-6 items-center justify-center px-4 sm:px-6 sm:mb-4 pt-16 sm:pt-0">
        {/* Header */}
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-[clamp(1.25rem,3vw,1.75rem)] pt-[clamp(1rem,6vw,4rem)]  sm:flex flex-col w-full max-w-6xl mx-auto px-4 text-center"
        >
          <h1 className="text-[clamp(2rem,3vw,3rem)] font-bold text-white mb-[clamp(0.5rem,1svw,0.5rem)]">About Me</h1>
          <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1.125rem)]">Get to know me through these glimpses of my life</p>
        </motion.div>
       

        {/* Bento Grid */}
        <div className="w-full sm:pt-20 md:pt-0 max-w-6xl lg:max-h-4xl grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-[clamp(0.75rem,2vw,1rem)] items-stretch mx-auto" style={{ gridAutoRows: 'clamp(180px, 20vh, 180px)' }}>
          
          <ProfileCard />
          <BioCard />
          <DualClock />
          <SpotifyCard />
          <SkillsCard />
          <div className="md:col-span-2 lg:col-span-1 h-full">
            <InternshipCard />
          </div>
        
        </div>
      </main>
    </div>
  );
}
