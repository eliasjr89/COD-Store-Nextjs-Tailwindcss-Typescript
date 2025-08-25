import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { FormMessageProps } from "@/types";

export default function FormMessage({
  children,
  type = "success",
  className,
}: FormMessageProps) {
  const baseStyles =
    "mx-auto mt-2 px-4 py-3 max-w-sm text-center rounded-2xl shadow-xl border border-black/20 dark:border-white/20 backdrop-blur-lg bg-white/20 dark:bg-black/20 text-black/80 dark:text-white/80 transition-colors duration-300";

  const typeStyles = {
    success:
      "bg-white/20 dark:bg-black/20 border-black/20 dark:border-white/20 text-black/80 dark:text-white/80",
    error:
      "bg-red-100/40 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-600",
    info: "bg-blue-100/40 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700",
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={clsx(baseStyles, typeStyles[type], className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
