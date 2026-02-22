"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function InternshipCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
      className="h-full bg-white backdrop-blur-lg border-none rounded-3xl p-4 lg:p-4 shadow-xl flex flex-col justify-between transition-all duration-300 card-wrapper animate-border-spin cursor-pointer group"
    >
      <div className ="card-content " >
        <p className="text-black/80 text-xs lg:text-sm  whitespace-nowrap  ">Recent Summer Internship</p>
        <p className="text-blue-700 font-bold text-sm lg:text-md group-hover:ml-2  transition-all ease-in-out duration-300 whitespace-nowrap ">Data Analytics Engineer Intern</p>
      </div>
      <div className="h-24 lg:h-32 w-full flex items-center justify-center ">
        <Image src="/ASML_Holding_transparent.svg" alt="ASML Logo" className="h-28 w-52 object-cover-contain rounded-xl" width={208} height={112} />
      </div>
    </motion.div>
  );
}
