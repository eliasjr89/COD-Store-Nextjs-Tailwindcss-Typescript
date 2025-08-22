import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function AuthInput({
  className,
  error,
  ...props
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <input
        {...props}
        className={clsx(
          "w-full px-4 py-2 rounded-md",
          "bg-white/20 dark:bg-black/20",
          "border border-black/20 dark:border-white/20",
          "text-black dark:text-white placeholder-black/60 dark:placeholder-white/60",
          "backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40 transition",
          error && "border-red-500 focus:ring-red-400",
          className
        )}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
