"use client";

import { motion } from "framer-motion";

const skills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python',
  'Azure Databricks', 'Mongo DB', 'Langchain', 'Spotfire', 'Linux',
  'R', 'SQL', 'Tailwind CSS', 'Git', 'PostgreSQL', 'AWS', 'Docker', 'Blender'
];

export default function SkillsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="md:col-span-2 lg:col-span-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-4 md:p-3 lg:tall:p-4 shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col justify-center min-h-0"
    >
      <h3 className="text-xl md:text-lg lg:tall:text-2xl font-bold text-white mb-0">Tech Stack</h3>
      <p className="text-gray-400 text-xs lg:tall:text-sm mb-3 md:mb-2 lg:tall:mb-4">A selection of technologies and tools I&apos;ve used over the years</p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-1.5 lg:tall:gap-3 overflow-hidden min-h-0">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.03 }}
            className="px-2 sm:px-3 md:px-2.5 lg:tall:px-4 py-1 sm:py-1.5 md:py-1 lg:tall:py-2 bg-linear-to-r from-blue-600/60 to-purple-600/40 text-white rounded-full text-[10px] sm:text-xs font-medium cursor-pointer hover:from-blue-600/80 hover:to-purple-600/60 transition-all duration-300 whitespace-nowrap flex-shrink-0"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
