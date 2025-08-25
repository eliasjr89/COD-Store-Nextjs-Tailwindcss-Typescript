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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6"
    >
      <div className="w-full max-w-md bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-6">
        {/* Back Button */}
        {showBackButton && (
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-black/70 dark:text-white/70 hover:underline"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </Link>
        )}

        {/* Title */}
        {title && (
          <h1 className="text-2xl font-semibold text-center text-black dark:text-white">
            {title}
          </h1>
        )}

        {/* Content */}
        <div>{children}</div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-black/10 dark:border-white/10 pt-4 text-center text-sm">
            {footer}
          </div>
        )}
      </div>
    </motion.div>
  );
}
