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
      {/* Hover background: brand gradient sweeps up from the bottom */}
      <div
        aria-hidden
        className="absolute! inset-[0.1rem] z-0! rounded-[inherit] bg-linear-to-tr from-[#1e2a5a] via-[#3b3f9a] to-[#7c3aed] bg-[length:200%_200%] bg-left-bottom group-hover:bg-right-top scale-y-0 origin-bottom group-hover:scale-y-100 transition-[transform,background-position] duration-700 ease-out"
      />
      <div className="card-content shrink-0">
        <p className="text-black/60 group-hover:text-white/70 text-[10px] lg:text-xs uppercase tracking-wider font-medium mb-2 md:mb-1 lg:mb-2 transition-colors duration-500">Most Recent Experience</p>
        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-white group-hover:to-purple-200 font-bold text-base lg:text-sm group-hover:ml-2 transition-all ease-in-out duration-300 leading-tight whitespace-nowrap">
          Full Stack Engineer
        </h3>
      </div>
      <div className="flex-1 min-h-0 w-full flex items-center justify-center px-2">
        <div className="relative w-full max-w-52 max-h-full aspect-[520/143]">
          <Image
            src="/petvet_logo_navy.png"
            alt="PetVet Care Centers Logo"
            fill
            sizes="208px"
            className="object-contain transition-opacity duration-500 group-hover:opacity-0"
          />
          <Image
            src="/petvet_logo_white.png"
            alt=""
            aria-hidden
            fill
            sizes="208px"
            className="object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>
      </div>
    </motion.div>
  );
}
