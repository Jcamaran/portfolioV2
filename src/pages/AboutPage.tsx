"use client";

import ParticlesBackground from "@/components/ParticlesBackground";
import PageHeader from "@/components/PageHeader";
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
        <PageHeader
          path="about"
          title="About Me"
          subtitle="Get to know me through these glimpses of my life"
          className="mb-[clamp(0.75rem,2vh,1.75rem)] pt-[clamp(1rem,6vw,4rem)] md:pt-[clamp(0.5rem,4vh,3rem)] w-full max-w-6xl mx-auto px-4"
        />
       

        {/* Bento Grid */}
        <div className="w-full sm:pt-20 md:pt-0 max-w-6xl grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-[clamp(0.5rem,1.5vh,1rem)] items-stretch mx-auto auto-rows-[180px] md:auto-rows-[clamp(130px,19vh,180px)] grid-rows-[180px_minmax(180px,auto)_180px_180px_minmax(180px,auto)_180px] md:grid-rows-[repeat(3,minmax(clamp(130px,19vh,180px),auto))]">
          
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
