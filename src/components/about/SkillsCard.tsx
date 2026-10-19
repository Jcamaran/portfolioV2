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
      className="md:col-span-2 lg:col-span-3 surface rounded-3xl p-4 md:p-3 lg:tall:p-5 overflow-hidden flex flex-col justify-center min-h-0"
    >
      <h3 className="text-xl md:text-lg lg:tall:text-2xl font-semibold tracking-tight text-white mb-0">Tech Stack</h3>
      <p className="text-white/50 text-xs lg:tall:text-sm mb-3 md:mb-2 lg:tall:mb-4">A selection of technologies and tools I&apos;ve used over the years</p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-1.5 lg:tall:gap-3">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.03 }}
            className="px-2 sm:px-3 md:px-2.5 lg:tall:px-3.5 py-1 sm:py-1.5 md:py-1 lg:tall:py-1.5 bg-white/[0.06] border border-white/10 text-white/80 rounded-full text-[10px] sm:text-xs font-medium hover:bg-violet-brand/30 hover:border-lilac/40 hover:text-white transition-colors duration-200 whitespace-nowrap flex-shrink-0"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
