"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  path: string; // shown as a terminal-style breadcrumb, e.g. "about"
  title: string;
  subtitle: string;
  align?: "center" | "left";
  className?: string;
}

export default function PageHeader({ path, title, subtitle, align = "center", className = "" }: PageHeaderProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col ${alignment} ${className}`}
    >
      <span className="font-mono text-[11px] sm:text-xs tracking-wide text-sky-brand/80 mb-2">
        <span className="text-lilac/70">~/</span>
        {path}
      </span>
      <h1 className="text-[clamp(2rem,3.4vw,3rem)] font-semibold tracking-tight text-white leading-none">
        {title}
      </h1>
      <p className="mt-3 text-white/60 text-[clamp(0.875rem,1.3vw,1.05rem)] max-w-xl">{subtitle}</p>
    </motion.header>
  );
}
