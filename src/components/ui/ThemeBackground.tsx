"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const ThemeBackground = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const backgroundImage =
    theme === "dark"
      ? "/images/darkMode/skull.jpg"
      : "/images/lightMode/front.jpg";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={backgroundImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="fixed inset-0 z-[-1] pointer-events-none bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      />
    </AnimatePresence>
  );
};
