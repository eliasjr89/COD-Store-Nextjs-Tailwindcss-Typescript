"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="
        p-2 sm:p-2.5 rounded-full
        bg-white/30 dark:bg-black/30 backdrop-blur-md
        border border-black/10 dark:border-white/20
        shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.39)]
        hover:bg-white/50 dark:hover:bg-black/50
        hover:border-black/20 dark:hover:border-white/30
        flex items-center justify-center
        transition-colors duration-300 ease-in-out
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <IconSun size={20} stroke={1.5} className="text-white-400" />
          ) : (
            <IconMoon size={20} stroke={1.5} className="text-gray-800" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
