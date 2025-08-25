"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { MdLanguage } from "react-icons/md";

export default function LanguageToggleButton() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Change Language"
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
          key={language}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1 sm:gap-2"
        >
          <MdLanguage size={20} className="text-dark-500 dark:text-white-400" />
          <span className="text-sm font-semibold">
            {language === "ES" ? "ES" : "EN"}
          </span>
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
