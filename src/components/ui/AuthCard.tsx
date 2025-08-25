"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AuthCardProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  showBackButton?: boolean;
  backLabel?: string;
}

export default function AuthCard({
  title,
  children,
  footer,
  showBackButton,
  backLabel,
}: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6"
    >
      <motion.div
        initial={{
          opacity: 0,
          backdropFilter: "blur(1px)",
          backgroundColor: "rgba(255,255,255,0)",
        }}
        animate={{
          opacity: 1,
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-6 border border-white/30 dark:border-white/30"
      >
        {showBackButton && (
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-black/90 dark:text-white/90 hover:underline transition-all duration-300 ease-in-out"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </Link>
        )}

        {title && (
          <h1 className="text-2xl font-semibold text-center text-black/80 dark:text-white transition-colors duration-300">
            {title}
          </h1>
        )}

        <div>{children}</div>

        {footer && (
          <div className="border-t border-black/10 dark:border-white/10 pt-4 text-center text-sm transition-colors duration-300">
            {footer}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
