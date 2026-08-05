"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiFileText } from "react-icons/fi";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image?: string;
  tech: string[];
  github?: string;
  demo?: string;
  website?: string;
  index: number;
}

const MAX_VISIBLE_TECH = 4;

export default function ProjectCard({
  id,
  title,
  description,
  image,
  tech,
  github,
  demo,
  website,
  index,
}: ProjectCardProps) {
  const visibleTech = tech.slice(0, MAX_VISIBLE_TECH);
  const hiddenCount = tech.length - visibleTech.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group relative bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden hover:border-purple-400/70 transition-colors duration-300 hover:shadow-xl hover:shadow-purple-500/20 flex flex-col h-full"
    >
      {/* Image with overlaid title + index badge */}
      <div className="relative w-full h-32 sm:h-32 md:h-34 bg-linear-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 overflow-hidden shrink-0">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/15 text-6xl font-bold">{id}</span>
          </div>
        )}

        {/* Permanent bottom gradient so the title is always readable */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0d0b1e]/95 via-[#0d0b1e]/40 to-transparent" />

        {/* Index badge */}
        <span className="absolute top-2.5 left-2.5 w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 text-purple-300 text-xs font-bold flex items-center justify-center">
          {String(id).padStart(2, "0")}
        </span>

        {/* Quick links - top right, revealed on hover (always visible on touch) */}
        <div className="absolute top-2.5 right-2.5 flex gap-1.5 md:opacity-0 md:group-hover:opacity-100 md:translate-y-[-4px] md:group-hover:translate-y-0 transition-all duration-300">
          {github && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className="w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-purple-500/60 hover:border-purple-300 transition-colors"
            >
              <FiGithub className="w-3.5 h-3.5" />
            </Link>
          )}
          {demo && (
            <Link
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live demo"
              className="w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-blue-500/60 hover:border-blue-300 transition-colors"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
          {website && (
            <Link
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Published article"
              className="w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-pink-500/60 hover:border-pink-300 transition-colors"
            >
              <FiFileText className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Title overlaid on image */}
        <h3 className="absolute bottom-2 left-3 right-3 text-sm sm:text-base font-bold text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-1 drop-shadow">
          {title}
        </h3>
      </div>

      {/* Body */}
      <div className="p-3 sm:p-3.5 flex flex-col grow gap-2.5">
        <p className="text-gray-300 leading-relaxed text-[11px] sm:text-xs line-clamp-3">
          {description}
        </p>

        {/* Tech chips - capped with +N overflow */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {visibleTech.map((techItem) => (
            <span
              key={techItem}
              className="px-2 py-0.5 text-[10px] sm:text-[11px] font-medium bg-blue-500/15 text-blue-300 rounded-full border border-blue-500/25 whitespace-nowrap"
            >
              {techItem}
            </span>
          ))}
          {hiddenCount > 0 && (
            <span
              title={tech.slice(MAX_VISIBLE_TECH).join(", ")}
              className="px-2 py-0.5 text-[10px] sm:text-[11px] font-medium bg-purple-500/15 text-purple-300 rounded-full border border-purple-500/25 whitespace-nowrap cursor-default"
            >
              +{hiddenCount}
            </span>
          )}
        </div>

        {/* Footer link row */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-[10px] uppercase tracking-widest text-gray-500">
            {website ? "Publication" : demo ? "Live Project" : github ? "Open Source" : "Internal Work"}
          </span>
          {(website || demo || github) && (
            <Link
              href={website || demo || github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 group/link"
            >
              {website ? "Read Article" : demo ? "View Demo" : "View Code"}
              <FiExternalLink className="w-3 h-3 text-purple-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>

      {/* Subtle glow accent on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(120px_60px_at_top_right,rgba(168,85,247,0.15),transparent)]" />
    </motion.div>
  );
}
