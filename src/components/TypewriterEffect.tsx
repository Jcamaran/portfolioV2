"use client";

import { useState, useEffect } from "react";

interface TypewriterEffectProps {
  text: string;
  className?: string;
  speed?: number;
  as?: "h1" | "h2" | "p" | "span" | "div";
  delay?: number;
}

export default function TypewriterEffect({ text, className = "", speed = 100, as: Tag = "span", delay = 0 }: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0 && !started) {
      const delayTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(delayTimeout);
    }
  }, [delay, started]);

  useEffect(() => {
    if (started && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, started]);

  return (
    <Tag className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </Tag>
  );
}
