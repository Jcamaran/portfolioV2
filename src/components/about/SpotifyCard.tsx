"use client";

import { motion } from "framer-motion";
import SpotifyCarousel from "../SpotifyCarousel";

export default function SpotifyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-[#1db954]/60 rounded-3xl shadow-xl overflow-hidden hover:border-purple-300 border-transparent border hover:border transition-all duration-300"
    >
      <SpotifyCarousel />
    </motion.div>
  );
}
