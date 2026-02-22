"use client";

import ParticlesBackground from "@/components/ParticlesBackground";
import { useState, memo, useRef } from "react";   
import { useScroll, useMotionValueEvent } from "framer-motion";
// import AnimatedLineStarter from "@/components/xp/AnimatedLineStarter";


// Other versions available:
import AnimatedLine from "@/components/xp/AnimatedLine";  // Original 2D flexbox
// import AnimatedLine3D from "@/components/xp/AnimatedLine3D";  // 3D stacked animation
// import AnimatedLineCarousel from "@/components/xp/AnimatedLineCarousel";  // 3D rotating carousel


const MemoizedParticles = memo(ParticlesBackground);


export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [locked, setLocked] = useState(false);
  const [hasSnapped, setHasSnapped] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.45 && latest < 0.55 && !locked && !hasSnapped) {
      lockAndSnap();
    } 
  });

  

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <MemoizedParticles />
      {/* Experience section */}
      <main className="relative z-10 w-full mx-auto flex-1 flex flex-col">
        <section className="pt-24 pb-4 text-center shrink-0 px-8"> 
          <h3 className="text-3xl font-bold text-white mb-4">
            Professional Experience
          </h3>
          <p className="text-lg text-gray-200">
            Here are some of the roles I&apos;ve held over the last few years, hover over the cards for some fun!
          </p>
        </section>
        
        <div ref={sectionRef} className="h-screen w-full flex flex-1 items-center justify-center overflow-">
          <AnimatedLine />
        </div>
      </main>
    </div>
  );
}
