import ParticlesBackground from "@/components/ParticlesBackground";
import Link from "next/link";
import { memo } from "react";
import CodeWindowEffect from "@/components/home/CodeWindowEffect copy";

const MemoizedParticles = memo(ParticlesBackground);

const quickCommands = [
  { cmd: "about", href: "/about" },
  { cmd: "xp", href: "/xp" },
  { cmd: "projects", href: "/projects" },
];

export default function HomePage() {
  return (
    <div className="flex h-screen items-center justify-center font-sans overflow-hidden">
      <MemoizedParticles />

      <main className="flex flex-col w-full max-w-5xl items-center justify-center relative z-10 px-4 gap-5">
        {/* Ambient glow behind the terminal */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-1/2 -translate-y-1/2 h-2/3 rounded-full bg-[radial-gradient(closest-side,rgba(139,122,224,0.35),rgba(119,190,240,0.12)_60%,transparent)] blur-2xl"
        />

        {/* Code Window - Full width responsive rectangle */}
        <CodeWindowEffect
          name="Joaquin Camaran"
          role="Developer & Student"
          university="Sacred Heart University"
          speed={5}
          font="3d"/>

        {/* Quick nav for people who would rather click than type */}
        <nav aria-label="Quick commands" className="relative flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
          <span className="text-white/40 mr-1">quick run:</span>
          {quickCommands.map(({ cmd, href }) => (
            <Link
              key={cmd}
              href={href}
              className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 border-b-2 border-b-white/20 text-white/70 hover:text-white hover:border-lilac/50 hover:bg-violet-brand/20 active:translate-y-px active:border-b transition-colors"
            >
              <span className="text-sky-brand">$</span> {cmd}
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
