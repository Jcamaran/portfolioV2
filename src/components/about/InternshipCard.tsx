"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function InternshipCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-blue-300/30 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-purple-300 transition-all duration-300"
    >
      <div>
        <p className="text-white/80 text-sm">Recent Summer Internship</p>
        <p className="text-white font-bold text-md">Data Analytics Engineer Intern</p>
      </div>
      <div className="h-32 w-full flex items-center justify-center ">
        <img src="/ASML-Symbol.png" alt="ASML Logo" className="h-28 w-56 object-cover-contain rounded-xl" />
      </div>
    </motion.div>
  );
}
