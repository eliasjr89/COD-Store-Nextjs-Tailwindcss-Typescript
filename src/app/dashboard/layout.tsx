"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/locale/dictionary";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { token, loading } = useAuth();
  const { language } = useLanguage();
  const t = dictionary[language];

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/login");
    }
  }, [loading, token, router]);
  if (!loading && !token) {
    router.replace("/login");
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-black/10 dark:border-white/20 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t.goodbye}
          </h2>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-black/10 dark:border-white/20 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t.loading}
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            {t.pleaseWait}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 text-black dark:text-white bg-background transition-colors duration-300">
      <main>{children}</main>
    </div>
  );
}
