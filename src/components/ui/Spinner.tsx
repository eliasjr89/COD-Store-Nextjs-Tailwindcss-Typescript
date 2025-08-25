// components/ui/Spinner.tsx
"use client";

import { SpinnerProps } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export default function Spinner({
  size = 24,
  color = "#ffffff",
}: SpinnerProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key="spinner"
        className="flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        exit={{ opacity: 0 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        style={{ width: size, height: size }}
      >
        <svg
          className="animate-spin"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
          <path d="M22 12a10 10 0 0 1-10 10" />
        </svg>
      </motion.div>
    </AnimatePresence>
  );
}
