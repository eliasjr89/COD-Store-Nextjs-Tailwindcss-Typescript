"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

export const Spotlight = ({
  translateY = -350,
  width = 560,
  height = 1880,
  smallWidth = 240,
  duration = 15,
  xOffset = 999,
  gradientFirst,
  gradientSecond,
  gradientThird,
}: SpotlightProps = {}) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  const darkGradients = {
    first:
      gradientFirst ??
      "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, 0.25) 0, hsla(210, 100%, 55%, 0.1) 50%, hsla(210, 100%, 45%, 0) 80%)",
    second:
      gradientSecond ??
      "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, 0.2) 0, hsla(210, 100%, 55%, 0.08) 80%, transparent 100%)",
    third:
      gradientThird ??
      "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, 0.15) 0, hsla(210, 100%, 45%, 0.05) 80%, transparent 100%)",
  };

  const lightGradients = {
    first:
      gradientFirst ??
      "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 0%, 0%, 0.15) 0, hsla(0, 0%, 0%, 0.05) 50%, hsla(0, 0%, 0%, 0) 80%)",
    second:
      gradientSecond ??
      "radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 0%, 0.12) 0, hsla(0, 0%, 0%, 0.05) 80%, transparent 100%)",
    third:
      gradientThird ??
      "radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 0%, 0.08) 0, hsla(0, 0%, 0%, 0.03) 80%, transparent 100%)",
  };

  const gradients = theme
    ? isDarkMode
      ? darkGradients
      : lightGradients
    : lightGradients;

  const backgroundImage = isDarkMode
    ? "/images/darkMode/skull.jpg"
    : "/images/lightMode/front.jpg";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={backgroundImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/10 transition-colors duration-500" />

        {/* BLOQUE IZQUIERDO */}
        <motion.div
          animate={{ x: [0, xOffset, 0] }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none"
        >
          <div
            className="absolute top-0 left-0 transition-[background] duration-1000 ease-in-out"
            style={{
              transform: `translateY(${translateY}px) rotate(-45deg)`,
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
          animate={{ x: [0, -xOffset, 0] }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none"
        >
          <div
            className="absolute top-0 right-0 transition-[background] duration-1000 ease-in-out"
            style={{
              transform: `translateY(${translateY}px) rotate(45deg)`,
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
