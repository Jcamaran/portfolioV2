"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiGithub, FiExternalLink } from "react-icons/fi";


interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image?: string;
  tech: string[];
  github: string;
  demo: string;
  index: number;
}

export default function ProjectCard({
  id,
  title,
  description,
  image,
  tech,
  github,
  demo,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 flex flex-col h-full"
    >
      {/* Project Image/Placeholder */}
      <div className="relative w-full h-32 sm:h-36 bg-linear-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 overflow-hidden shrink-0">
        {image ? (
          <>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-white/20 text-6xl sm:text-7xl font-bold"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {id}
            </motion.div>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-4 sm:p-5 flex flex-col grow ">
        {/* Title - Fixed height */}
        <div className="mb-3 min-h-8 sm:min-h-8 flex items-start">
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Description - Fixed height with line clamp */}
        <div className="mb-4 min-h-[3rem] sm:min-h-[4rem]">
          <p className="text-gray-300 leading-relaxed text-xs sm:text-sm line-clamp-4">
            {description}
          </p>
        </div>

        {/* Tech Stack - Fixed height */}
        <div className="mb-2 min-h-[3.5rem] sm:min-h-[3rem] flex mt-auto items-end overflow-hidden">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {tech.map((techItem) => (
              <span
                key={techItem}
                className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200 whitespace-nowrap"
              >
                {techItem}
              </span>
            ))}
          </div>
        </div>

        {/* Links - Always at bottom */}
        <div className="flex gap-2 sm:gap-3 mt-auto pt-2">
          <Link
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg sm:rounded-xl transition-all border border-white/20 hover:border-white/40 group/btn"
          >
            <FiGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:rotate-12 transition-transform" />
            <span className="font-medium text-xs sm:text-sm">GitHub</span>
          </Link>
          <Link
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg sm:rounded-xl transition-all shadow-lg shadow-purple-500/30 group/btn"
          >
            <FiExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            <span className="font-medium text-xs sm:text-sm">Demo</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
