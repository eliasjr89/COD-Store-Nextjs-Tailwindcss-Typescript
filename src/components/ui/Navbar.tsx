"use client";

import { useAuth } from "@/context/AuthContext";
import LanguageToggleButton from "./LanguageToggleButton";
import ThemeToggleButton from "./ThemeToggle";
import LogoutButton from "./LogoutButton";
import { motion } from "framer-motion";

export default function Navbar() {
  const { token } = useAuth();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute top-4 right-4 z-50"
    >
      <div className="flex gap-2 items-center">
        <LanguageToggleButton />
        <ThemeToggleButton />
        {token && <LogoutButton />}
      </div>
    </motion.nav>
  );
}
