"use client";

import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";

export default function BioCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="md:col-span-2 md:row-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Hey there!</h2>
          <p className="text-gray-300 text-md leading-relaxed mb-4">
            My name is <span className="font-semibold text-white">Joaquin Camaran</span>, a developer and student at{" "}
            <span className="font-semibold text-red-300">Sacred Heart University</span>. I have a passion for tech and
            data whether it's building websites, conducting data-driven research and analysis, or exploring the latest
            advancements in AI and implementing them into projects.
          </p>
          <p className="text-gray-300 text-md leading-relaxed">
            When I'm not coding, you'll find me playing sports, reading sci-fi novels, riding my motorcycle, or all of
            which done while listening to some good music.
          </p>
        </div>

        <SocialLinks />

        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-400 text-sm">Available for opportunities</span>
        </div>
      </div>
    </motion.div>
  );
}
