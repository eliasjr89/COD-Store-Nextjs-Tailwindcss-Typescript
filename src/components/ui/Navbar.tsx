"use client";

import LanguageToggleButton from "./LanguageToggleButton";
import ThemeToggleButton from "./ThemeToggle";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute top-4 right-4 z-50"
    >
      <div className="flex gap-2">
        <ThemeToggleButton />
        <LanguageToggleButton />
      </div>
    </motion.nav>
  );
}
