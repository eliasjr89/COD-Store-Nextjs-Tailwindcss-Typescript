"use client";

import { motion } from "framer-motion";
import LanguageToggleButton from "../buttons/LanguageToggleButton";
import ThemeToggleButton from "../buttons/ThemeToggle";
import LogoutButton from "../buttons/LogoutButton";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { loggedIn } = useAuth();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute gap-2 top-4 w-full z-50 flex justify-center sm:justify-end px-4 sm:pr-8"
    >
      <LanguageToggleButton />
      <ThemeToggleButton />
      {loggedIn && <LogoutButton />}
    </motion.nav>
  );
}
