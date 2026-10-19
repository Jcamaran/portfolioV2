"use client";

import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";

export default function BioCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="md:col-span-2 md:row-span-2 surface rounded-3xl p-5 md:p-4 lg:tall:p-8 flex flex-col justify-between overflow-hidden min-h-0"
    >
      <div className="flex flex-col h-full min-h-0 justify-between">
        <div className="shrink-0">
          <h2 className="text-2xl md:text-xl lg:tall:text-3xl font-semibold tracking-tight text-white mb-3 md:mb-2 lg:tall:mb-4">Hey there! <span className="inline-block origin-[70%_70%] hover:animate-[wave_1s_ease-in-out]">👋</span></h2>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <p className="text-white/70 line-clamp-5 md:line-clamp-4 lg:tall:line-clamp-5 text-xs sm:text-xs lg:tall:text-sm leading-relaxed mb-3 md:mb-2 lg:tall:mb-4">
                My name is <span className="font-semibold text-white">Joaquin Camaran</span>, a developer and student at{" "}
                <span className="font-semibold text-lilac">Sacred Heart University</span>. I have a passion for tech and
                data whether it&apos;s building websites, conducting data-driven research and analysis, or exploring the latest
                advancements in AI and implementing them into projects.
              </p>
              <p className={`text-white/70 line-clamp-5 md:line-clamp-3 lg:tall:line-clamp-5 text-xs md:text-xs lg:tall:text-sm leading-relaxed hidden md:block`}>
                When I&apos;m not coding, you&apos;ll find me playing sports, reading sci-fi novels, riding my motorcycle, or all of
                which done while listening to some good <span className="font-semibold text-sky-brand">music</span>.
              </p>
            </div>
            <div className="md:hidden">
              <SocialLinks />
            </div>
          </div>
        </div>

        <div className="hidden md:block shrink-0">
          <SocialLinks />
        </div>

        <div className="hidden md:flex items-center gap-2 mt-4 md:mt-2 lg:tall:mt-4 shrink-0">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping motion-reduce:animate-none" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-white/50 text-sm md:text-xs lg:tall:text-sm">Available for opportunities</span>
        </div>
      </div>
    </motion.div>
  );
}
