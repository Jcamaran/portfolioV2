"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { NavLinks } from "../app/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 md:h-16 bg-none backdrop-blur-">
      <div className="max-w-full mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            <span className="text-blue-400">JC&apos;s</span> Portfolio
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 p-1 rounded-full">
            {NavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-white"
                    : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
                } text-sm transition-colors px-4 py-2 rounded-full relative`}
              >
                <span className="relative z-10 flex items-center justify-center h-full m-0">{link.label}</span>
                {pathname === link.href && (
                  <motion.span
                    layoutId="bubble-tab"
                    transition={{ type: "spring", duration: 0.5 }}
                    className="absolute inset-0 z-0 bg-linear-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors relative z-50 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <DropDownMenu 
        pathname={pathname || '/'} 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </nav>
  );
}

interface DropDownMenuProps {
  pathname: string;
  isOpen: boolean;
  onClose: () => void;
}

const DropDownMenu = ({ pathname, isOpen, onClose }: DropDownMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0  backdrop-blur-sm md:hidden"
            onClick={onClose}
            style={{ top: '64px' }}
          />

          {/* Dropdown Menu */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute top-full left-0 right-0 mx-4 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl py-2 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-2">
              {NavLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`${
                      pathname === link.href
                        ? "text-white"
                        : "text-slate-300 hover:text-slate-200 hover:bg-slate-700/50"
                    } text-sm transition-colors px-4 py-3 rounded-xl relative block w-full`}
                  >
                    <span className="relative z-10 flex items-center h-full">{link.label}</span>
                    {pathname === link.href && (
                      <motion.span
                        layoutId="bubble-mobile"
                        transition={{ type: "spring", duration: 0.5 }}
                        className="absolute inset-0 z-0 bg-linear-to-r from-violet-600 to-indigo-600 rounded-xl"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};