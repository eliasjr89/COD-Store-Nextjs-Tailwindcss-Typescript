"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MagneticTextProps } from "@/types";

export const MagneticText: React.FC<MagneticTextProps> = ({
  text,
  onComplete,
}) => {
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    setLetters(Array.from(text));
  }, [text]);

  const textShadow = "2px 2px 6px rgba(0,0,0,0.9)";

  return (
    <div className="w-full flex justify-center">
      <h1
        className="relative z-10 text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center flex flex-wrap justify-center"
        style={{ textShadow }}
      >
        {letters.map((letter, index) => {
          // Ajuste de animación responsiva
          const maxOffset =
            typeof window !== "undefined" && window.innerWidth < 640
              ? 800
              : 2600;
          const xStart = letter === " " ? 0 : (Math.random() - 0.5) * maxOffset;
          const yStart = letter === " " ? 0 : (Math.random() - 0.5) * maxOffset;
          const rotateStart = letter === " " ? 0 : (Math.random() - 0.5) * 180;
          const rotateEnd = letter === " " ? 0 : (Math.random() - 0.5) * 10;
          const distance = Math.sqrt(xStart * xStart + yStart * yStart);
          const duration = 0.1 + distance / 600;
          const opacityStart = 0.1 + Math.random() * 0.7;
          const stiffness = 40 + Math.random() * 80;
          const damping = 35 + Math.random() * 3;

          return (
            <motion.span
              key={index}
              initial={{
                x: xStart,
                y: yStart,
                rotate: rotateStart,
                opacity: opacityStart,
              }}
              animate={{ x: 0, y: 0, rotate: rotateEnd, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness,
                damping,
                duration,
                delay: index * 0.02,
              }}
              onAnimationComplete={() => {
                if (index === letters.length - 1 && onComplete) onComplete();
              }}
              className={
                letter === " " ? "inline-block w-2 sm:w-3" : "inline-block"
              }
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          );
        })}
      </h1>
    </div>
  );
};
