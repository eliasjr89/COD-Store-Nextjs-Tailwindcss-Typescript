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
      className="absolute gap-2 top-4 w-full z-50 flex justify-center sm:justify-end px-4 sm:pr-8"
    >
      <LanguageToggleButton />
      <ThemeToggleButton />
      {token && <LogoutButton />}
    </motion.nav>
  );
}
