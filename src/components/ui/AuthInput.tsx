import clsx from "clsx";
import { AuthInputProps } from "@/types";

export default function AuthInput({
  className,
  error,
  ...props
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        {...props}
        className={clsx(
          "w-full px-4 py-3 rounded-2xl bg-white/20 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/20 text-black dark:text-white placeholder-black/70 dark:placeholder-white/70",
          "text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40 transition-all duration-300 ease-in-out",
          error && "border-red-500 focus:ring-red-400",
          className
        )}
      />
      {error && (
        <span className="text-red-500 text-xs sm:text-sm">{error}</span>
      )}
    </div>
  );
}
