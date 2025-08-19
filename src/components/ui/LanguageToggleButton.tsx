"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { MdLanguage } from "react-icons/md";

export default function LanguageToggleButton() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="
        flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full
        border border-gray-300 dark:border-gray-600
        bg-white/40 dark:bg-black/30
        backdrop-blur-md
        shadow-md hover:shadow-lg
        transition-all duration-300
        text-gray-800 dark:text-gray-100 font-medium
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={language}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1"
        >
          <MdLanguage size={18} /> {/* Mantengo el tamaño original */}
          <span className="text-sm sm:text-sm font-semibold">
            {language === "ES" ? "ES" : "EN"}
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
