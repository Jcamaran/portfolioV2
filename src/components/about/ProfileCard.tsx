"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden shadow-xl relative group border hover:border-purple-400 transition-all duration-300"
    >
      <div className="relative w-full h-full">
        <Image
          src="/profile_pic_2.png"
          alt="Joaquin Camaran"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <p className="text-white font-semibold text-lg">Joaquin Camaran</p>
        </div>
      </div>
    </motion.div>
  );
}
