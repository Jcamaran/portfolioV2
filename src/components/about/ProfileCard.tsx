"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden shadow-xl relative group border border-white/10 hover:border-lilac/50 transition-colors duration-300 h-full"
    >
      <div className="relative w-full h-full">
        <Image
          src="/profile_pic_2.png"
          alt="Joaquin Camaran"
          fill
          // sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-night-deep/85 via-night-deep/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
          <p className="text-white font-semibold text-lg leading-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-300">Joaquin Camaran</p>
          <p className="font-mono text-[11px] text-sky-brand/90 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">Developer &amp; Student</p>
        </div>
      </div>
    </motion.div>
  );
}