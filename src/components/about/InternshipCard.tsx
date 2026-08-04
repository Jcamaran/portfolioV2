"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function InternshipCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
      className="h-full bg-white backdrop-blur-lg border-none rounded-3xl p-4 lg:p-4 shadow-xl flex flex-col justify-between overflow-hidden transition-all duration-300 card-wrapper animate-border-spin cursor-pointer group "
    >
      <div className="card-content shrink-0">
        <p className="text-black/60 text-[10px] lg:text-xs uppercase tracking-wider font-medium mb-2 md:mb-1 lg:mb-2">Most Recent Experience</p>
        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-base lg:text-sm group-hover:ml-2 transition-all ease-in-out duration-300 leading-tight whitespace-nowrap">
          Capstone Software Engineer
        </h3>
      </div>
      <div className="flex-1 min-h-0 w-full flex items-center justify-center">
        <Image
          src="/sikorsky.png"
          alt="Sikorsky Logo"
          className="max-h-full h-auto w-52 object-contain rounded-xl"
          width={208}
          height={112}
        />
      </div>
    </motion.div>
  );
}
