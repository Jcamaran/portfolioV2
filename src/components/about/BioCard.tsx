"use client";

import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";

export default function BioCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="md:col-span-2 md:row-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-5 md:p-4 lg:tall:p-8 shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col justify-between overflow-hidden min-h-0"
    >
      <div className="flex flex-col h-full min-h-0 justify-between">
        <div className="min-h-0">
          <h2 className="text-2xl md:text-xl lg:tall:text-3xl font-bold text-white mb-3 md:mb-2 lg:tall:mb-4">Hey there!</h2>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <p className="text-gray-300 line-clamp-5 md:line-clamp-4 lg:tall:line-clamp-5 text-xs sm:text-xs lg:tall:text-sm leading-relaxed mb-3 md:mb-2 lg:tall:mb-4">
                My name is <span className="font-semibold text-white">Joaquin Camaran</span>, a developer and student at{" "}
                <span className="font-semibold text-red-300">Sacred Heart University</span>. I have a passion for tech and
                data whether it&apos;s building websites, conducting data-driven research and analysis, or exploring the latest
                advancements in AI and implementing them into projects.
              </p>
              <p className={`text-gray-300 line-clamp-5 md:line-clamp-3 lg:tall:line-clamp-5 text-xs md:text-xs lg:tall:text-sm leading-relaxed hidden md:block`}>
                When I&apos;m not coding, you&apos;ll find me playing sports, reading sci-fi novels, riding my motorcycle, or all of
                which done while listening to some good <span className="font-semibold text-emerald-300/90">music</span>.
              </p>
            </div>
            <div className="md:hidden">
              <SocialLinks />
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <SocialLinks />
        </div>

        <div className="hidden md:flex items-center gap-2 mt-4 md:mt-2 lg:tall:mt-4 shrink-0">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-400 text-sm md:text-xs lg:tall:text-sm">Available for opportunities</span>
        </div>
      </div>
    </motion.div>
  );
}
