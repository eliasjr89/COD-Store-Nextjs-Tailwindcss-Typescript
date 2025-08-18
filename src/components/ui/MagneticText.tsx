"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MagneticTextProps {
  text: string;
  onComplete?: () => void;
}

export const MagneticText: React.FC<MagneticTextProps> = ({
  text,
  onComplete,
}) => {
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    setLetters((prev) => {
      const maxLength = Math.max(prev.length, text.length);
      const newLetters = Array.from({ length: maxLength }, (_, i) => {
        if (i < text.length) return text[i];
        return " ";
      });
      return newLetters;
    });
  }, [text]);

  const textShadow = "2px 2px 6px rgba(0,0,0,0.9)";

  return (
    <h1
      className="relative z-10 text-6xl font-bold text-white flex justify-center flex-wrap"
      style={{
        textShadow,
        transition: "text-shadow 1.5s ease-in-out",
      }}
    >
      {letters.map((letter, index) => {
        const xStart = (Math.random() - 0.5) * 2600;
        const yStart = (Math.random() - 0.5) * 2600;
        const rotateStart = (Math.random() - 0.5) * 180;
        const rotateEnd = (Math.random() - 0.5) * 10;
        const distance = Math.sqrt(xStart * xStart + yStart * yStart);
        const duration = 0.1 + distance / 600;
        const opacityStart = 0.1 + Math.random() * 0.7;
        const stiffness = 40 + Math.random() * 80;
        const damping = 35 + Math.random() * 3;

        return (
          <motion.span
            key={index}
            initial={{
              x: letter === " " ? 0 : xStart,
              y: letter === " " ? 0 : yStart,
              rotate: letter === " " ? 0 : rotateStart,
              opacity: letter === " " ? 1 : opacityStart,
            }}
            animate={{
              x: 0,
              y: 0,
              rotate: letter === " " ? 0 : rotateEnd,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              stiffness,
              damping,
              duration,
              delay: index * 0.05,
            }}
            onAnimationComplete={() => {
              if (index === letters.length - 1 && onComplete) onComplete();
            }}
            className={letter === " " ? "inline-block w-3" : "inline-block"}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        );
      })}
    </h1>
  );
};
