"use client";

import ParticlesBackground from "@/components/ParticlesBackground";
import { useState, memo, useRef } from "react";   
import { useScroll, useMotionValueEvent } from "framer-motion";
import AnimatedLine from "@/components/xp/AnimatedLine";


const MemoizedParticles = memo(ParticlesBackground);


export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [locked, setLocked] = useState(false);
  const [hasSnapped, setHasSnapped] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.45 && latest < 0.55 && !locked && !hasSnapped) {
      lockAndSnap();
    } 
  });

  const lockAndSnap = () => {
    setLocked(true);
    setHasSnapped(true); // Mark that snap has occurred

    // lock scrolling
    document.body.style.overflow = "hidden";

    // Scroll to second half of section
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    window.scrollTo({
      top: sectionTop + sectionHeight / 2,
      behavior: "smooth"
    });
    
    // unlock after animation 
    setTimeout(() => {
      setLocked(false);
      document.body.style.overflow = "auto";
    }, 900); // match duration of scroll
  };

  return (
    <div className="min-h-screen font-sans">
      <MemoizedParticles />
      {/* Experience section */}
      <main className="relative z-10 max-w-6xl mx-auto px-8 pt-16">
        <section className="pt-16 mb-9 text-center"> 
          <h1 className="text-5xl font-bold text-white mb-4">
            Professional Experience
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Here are some of the places i worked at over the last few years. Hover over the cards for some fun! 
          </p>
        </section>
        
        <div ref={sectionRef}>
          <AnimatedLine />
        </div>
      </main>
    </div>
  );
}
