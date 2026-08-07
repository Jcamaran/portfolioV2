

import ParticlesBackground from "@/components/ParticlesBackground";
import { LuMessageCircleDashed } from "react-icons/lu";
import { memo } from "react";
import CodeWindowEffect from "@/components/home/CodeWindowEffect copy";

const MemoizedParticles = memo(ParticlesBackground);

export default function HomePage() {
  return (
    <div className="flex h-screen items-center justify-center font-sans overflow-hidden">
      <MemoizedParticles />

      <main className="flex w-full max-w-5xl items-center justify-center relative z-10 px-4 ">
        {/* Code Window - Full width responsive rectangle */}
        <CodeWindowEffect
          name="Joaquin Camaran"
          role="Developer & Student"
          university="Sacred Heart University"
          speed={5}
          font="3d"/>

      </main>
      
    </div>
  );
}
