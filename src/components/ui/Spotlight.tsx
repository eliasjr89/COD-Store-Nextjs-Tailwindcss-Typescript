"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number | string;
  width?: number | string;
  height?: number | string;
  smallWidth?: number | string;
  duration?: number;
  xOffset?: number | string;
};

export const Spotlight = ({
  translateY = "-20vh",
  width = "140vw",
  height = "120vh",
  smallWidth = "60vw",
  duration = 15,
  xOffset = "50vw",
  gradientFirst,
  gradientSecond,
  gradientThird,
}: SpotlightProps = {}) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  const gradients = {
    first:
      gradientFirst ??
      (isDarkMode
        ? "radial-gradient(68% 68% at 55% 31%, hsla(210, 100%, 85%, 0.25) 0, hsla(210,100%,55%,0.1) 50%, transparent 80%)"
        : "radial-gradient(68% 68% at 55% 31%, rgba(0,0,0,0.15) 0, rgba(0,0,0,0.05) 50%, transparent 80%)"),
    second:
      gradientSecond ??
      (isDarkMode
        ? "radial-gradient(50% 50% at 50% 50%, hsla(210,100%,85%,0.2) 0, hsla(210,100%,55%,0.08) 80%, transparent 100%)"
        : "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.12) 0, rgba(0,0,0,0.05) 80%, transparent 100%)"),
    third:
      gradientThird ??
      (isDarkMode
        ? "radial-gradient(50% 50% at 50% 50%, hsla(210,100%,85%,0.15) 0, hsla(210,100%,45%,0.05) 80%, transparent 100%)"
        : "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.08) 0, rgba(0,0,0,0.03) 80%, transparent 100%)"),
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div className="pointer-events-none fixed inset-0 h-full w-full z-0">
        {/* BLOQUE IZQUIERDO */}
        <motion.div
          animate={{ x: [0, xOffset, 0] }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-screen h-screen pointer-events-none"
        >
          <div
            className="absolute top-0 left-0 transition-[background] duration-1000 ease-in-out"
            style={{
              transform: `translateY(${translateY}) rotate(-45deg)`,
              width,
              height,
              background: gradients.first,
            }}
          />
          <div
            className="absolute top-0 left-0 origin-top-left transition-[background] duration-1000 ease-in-out"
            style={{
              transform: "rotate(-45deg) translate(5%, -50%)",
              width: smallWidth,
              height,
              background: gradients.second,
            }}
          />
          <div
            className="absolute top-0 left-0 origin-top-left transition-[background] duration-1000 ease-in-out"
            style={{
              transform: "rotate(-45deg) translate(-180%, -70%)",
              width: smallWidth,
              height,
              background: gradients.third,
            }}
          />
        </motion.div>

        {/* BLOQUE DERECHO */}
        <motion.div
          animate={{ x: [0, `-${xOffset}`, 0] }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-screen h-screen pointer-events-none"
        >
          <div
            className="absolute top-0 right-0 transition-[background] duration-1000 ease-in-out"
            style={{
              transform: `translateY(${translateY}) rotate(45deg)`,
              width,
              height,
              background: gradients.first,
            }}
          />
          <div
            className="absolute top-0 right-0 origin-top-right transition-[background] duration-1000 ease-in-out"
            style={{
              transform: "rotate(45deg) translate(-5%, -50%)",
              width: smallWidth,
              height,
              background: gradients.second,
            }}
          />
          <div
            className="absolute top-0 right-0 origin-top-right transition-[background] duration-1000 ease-in-out"
            style={{
              transform: "rotate(45deg) translate(180%, -70%)",
              width: smallWidth,
              height,
              background: gradients.third,
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
