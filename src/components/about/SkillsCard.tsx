"use client";

import { motion } from "framer-motion";

const skills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python',
  'Azure Databricks', 'Mongo DB', 'Langchain', 'Spotfire', 'Linux',
  'R', 'Power BI', 'SQL', 'Tailwind CSS', 'Git', 'PostgreSQL'
];

export default function SkillsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="md:col-span-2 lg:col-span-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl hover:border-purple-300 transition-all duration-300"
    >
      <h3 className="text-2xl font-bold text-white mb-0">Tech Stack</h3>
      <p className="text-gray-400 text-sm mb-4">A selection of technologies and tools I've used over the years</p>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.03 }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600/60 to-purple-600/40 text-white rounded-full text-sm font-medium cursor-default hover:from-blue-600/80 hover:to-purple-600/60 transition-all"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
