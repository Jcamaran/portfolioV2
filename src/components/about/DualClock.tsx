"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function DualClock() {
  const [myTime, setMyTime] = useState(new Date());
  const [visitorTime, setVisitorTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setMyTime(new Date());
      setVisitorTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const myTimeString = myTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'America/New_York'
  });

  const visitorTimeString = visitorTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const visitorTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-black/50 rounded-3xl p-6 shadow-xl flex flex-col justify-center items-start h-full hover:border-purple-300 border-transparent border hover:border transition-all duration-300"
    >
      <div className="space-y-3 w-full">
        <div className="border-b border-white/20 pb-3">
          <p className="text-white/80 text-xs mb-1">My Time (CT)</p>
          <p className="text-white font-bold text-2xl">{mounted ? myTimeString : '--:--:-- --'}</p>
        </div>
        <div>
          <p className="text-white/80 text-xs mb-1">Your Time</p>
          <p className="text-white font-bold text-2xl">{mounted ? visitorTimeString : '--:--:-- --'}</p>
          <p className="text-white/60 text-[10px] mt-1 truncate">{mounted ? visitorTimezone : 'Loading...'}</p>
        </div>
      </div>
    </motion.div>
  );
}
