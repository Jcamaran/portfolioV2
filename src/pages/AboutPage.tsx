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
    <div className="min-h-screen font-sans">
      <MemoizedParticles />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-7 pt-16"
        >
          <h1 className="text-6xl font-bold text-white mb-4">About Me</h1>
          <p className="text-gray-400 text-lg">Get to know me through these glimpses of my life</p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          <ProfileCard />
          <BioCard />
          <DualClock />
          <SpotifyCard />
          <SkillsCard />
          <InternshipCard />
        </div>
      </main>
    </div>
  );
}
