import ParticlesBackground from "@/components/ParticlesBackground";
import TypewriterEffect from "@/components/TypewriterEffect";
import { LuMessageCircleDashed } from "react-icons/lu";
import { memo } from "react";


const MemoizedParticles = memo(ParticlesBackground);

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans px-8">
      <MemoizedParticles />

      <main className="flex w-full max-w-6xl items-center justify-between gap-16 relative z-10">
        {/* Left Side - Intro Text */}
        <div className="flex flex-col gap-4 flex-1">
          <TypewriterEffect 
            text="Hey there, I'm Joaquin!"
            className="text-6xl font-bold text-blue-400"
            speed={80}
            as="h1"
          />
          <p className="text-2xl text-white font-light">
            <TypewriterEffect 
              text="A Developer & Student @ Sacred Heart University"
              className="inline-block"
              speed={50}
              delay={2000}
              as="span"
            />

          </p>
          
        </div>

        {/* Right Side - Profile Picture */}
        <div className="shrink-0">
          <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-purple-300 shadow-2xl shadow-blue-500/50">
            <img
              src="/profile_pic_2.png"
              alt="Joaquin Camaran"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </main>
      <div className="absolute bottom-8 right-8 z-10 rounded-full bg-blue-800/90 p-2 shadow-lg shadow-blue-500/20 hover:scale-110 transition-transform">
        <LuMessageCircleDashed className="w-7 h-7 text-blue-400 animate-pulse cursor-pointer" />
      </div>
    </div>
  );
}
