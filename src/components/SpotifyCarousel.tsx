"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import Image from 'next/image';

interface Artist {
  name: string;
  image: string;
  genre?: string;
}

export default function SpotifyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Mock data - replace with your actual Spotify API data
  const artists: Artist[] = [
    { name: "The Marias", image: "https://i8.amplience.net/i/naras/the_marias_band_bethany_vargas", genre: "Psychedelic Rock" },
    { name: "Jenevieve", image: "https://api.sniffers.co.nz/wp-content/uploads/2021/09/jenevieves-debut-division-introduces-her-as-a-new-voice-of-r-and-b-1-1160x967.jpeg", genre: "R&B" },
    { name: "Giveon", image: "https://www.giveonofficial.com/dist/img/covers/blvd.png", genre: "R&B" },
    { name: "Drake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgaa_YjSjoCEjmUemm1A_tdbl3WDsKH_lthQ&s", genre: "Hip Hop" },
  ];

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % artists.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [artists.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
      zIndex: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const nextIndex = prev + newDirection;
      if (nextIndex < 0) return artists.length - 1;
      if (nextIndex >= artists.length) return 0;
      return nextIndex;
    });
  };

  return (
    <div className="relative w-full h-full  rounded-3xl  p-3 flex flex-col cursor-pointer">
     
       <p className="text-white/80 text-xs sm:text-xs p-0 pb-1 flex flex-row items-center gap-1 justify-center">Current Favorite Artists </p> 


      {/* Carousel */}
      <div className="relative flex-1 flex items-center justify-center" style={{ perspective: "1000px" }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              rotateY: { duration: 0.4 },
              scale: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="relative w-full h-full max-w-60 pb-3 cursor-grab active:cursor-grabbing"
          >
            {/* Artist Card */}
            <div className="relative h-full  flex items-center justify-center flex-col">
              {/* Album/Artist Image */}
              <div className="relative aspect-video h-auto max-h-full w-full max-w-52 md:max-w-36 lg:max-w-44 lg:tall:max-w-52 overflow-hidden rounded-2xl shadow-2xl bg-transparent">
                <Image
                  src={artists[currentIndex].image}
                  alt={artists[currentIndex].name}
                  className="w-full h-full object-cover rounded-2xl  "
                  draggable={false}
                  width={400}
                  height={400}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
                
                {/* Artist Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-2 lg:p-4 px-6">
                  <p className="text-white font-bold texs-lg truncate ">
                    {artists[currentIndex].name}
                  </p>
                  <p className="text-white/80 text-xs">{artists[currentIndex].genre}</p>
                </div>
              </div>

             
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {artists.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-6" : "bg-white/40"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

      </div>

      {/* Play Animation */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-3 right-3 z-50"
      >
        <a
          href="https://open.spotify.com/playlist/65AoMfVqLkeNCGsoyMAY4g?si=ZcmAg6A0SDy7iTCkwMlw8A"
          target="_blank"
          rel="noopener noreferrer external"
          title="Check out my Spotify Playlist: Quinoa"
          aria-label="Open Spotify playlist"
          className="pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
          onPointerDownCapture={(e) => e.stopPropagation()}
        >
          <FaSpotify className="text-white w-6 h-6" />
        </a>
      </motion.div>
    </div>
  );
}
