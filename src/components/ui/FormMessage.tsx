import clsx from "clsx";
import { FormMessageProps } from "@/types";

export default function FormMessage({
  children,
  type = "success",
  className,
}: FormMessageProps) {
  const baseStyles = `
    mx-auto mt-2 px-4 py-3 max-w-sm text-center
    backdrop-blur-md rounded-xl shadow-md
    border
  `;

  const typeStyles = {
    success:
      "text-black/80 dark:text-white/80 bg-white/20 dark:bg-black/20 border-black/20 dark:border-white/20",
    error:
      "text-red-600 bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700",
    info: "text-blue-700 bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700",
  };

  return (
    <div className={clsx(baseStyles, typeStyles[type], className)}>
      {children}
    </div>
  );
}
