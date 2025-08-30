"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const { setLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    setLoggedIn(false);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setLoggedIn(false);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      aria-label="Logout"
      className="
        p-2 sm:p-2.5 rounded-full
        bg-white/2 dark:bg-black/30 backdrop-blur-md
        border border-black/10 dark:border-white/20
        shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.39)]
        hover:bg-white/50 dark:hover:bg-black/50
        hover:border-black/30 dark:hover:border-white/50
        flex items-center justify-center
        transition-colors duration-300 ease-in-out
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={loading ? "loading" : "logout"}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <IconLogout
            size={20}
            stroke={1.5}
            className={
              loading ? "text-gray-400 animate-spin" : "text-black-500"
            }
          />
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
