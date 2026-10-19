"use client";

import { motion } from "framer-motion";
import SpotifyCarousel from "../SpotifyCarousel";

export default function SpotifyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-linear-to-br from-emerald-700/70 via-green-600/60 to-emerald-400/70 rounded-3xl shadow-xl overflow-hidden border border-white/10 hover:border-emerald-200/50 transition-colors duration-300"
    >
      <SpotifyCarousel />
    </motion.div>
  );    
}
