"use client";

import { GlassButtonProps } from "@/types";
import clsx from "clsx";
import Link from "next/link";

export default function GlassButton({
  label,
  href,
  variant = "primary",
  className,
  ...props
}: GlassButtonProps) {
  const baseStyles =
    "rounded-xl px-4 py-2 text-sm font-medium backdrop-blur-md transition shadow-md focus:outline-none focus:ring-2 flex justify-center items-center whitespace-nowrap";

  const variants = {
    primary:
      "bg-white/20 dark:bg-black/20 text-black dark:text-white border border-black/20 dark:border-white/20 hover:bg-white/30 dark:hover:bg-black/30 focus:ring-black/40 dark:focus:ring-white/40",
    secondary:
      "bg-transparent text-black dark:text-white border border-black/30 dark:border-white/30 hover:bg-black/10 dark:hover:bg-white/10 focus:ring-black/40 dark:focus:ring-white/40",
    link: "bg-transparent text-black dark:text-white underline px-0 py-0 hover:opacity-80",
  };

  const classes = clsx(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {label}
    </button>
  );
}
