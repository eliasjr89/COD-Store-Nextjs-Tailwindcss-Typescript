"use client";

import GlassButton from "@/components/ui/Button";
import { AuthCardProps } from "@/types";

export default function AuthCard({
  title,
  children,
  footer,
  showBackButton = false,
  backLabel = "Back",
  backHref = "/",
}: AuthCardProps) {
  return (
    <div className="flex flex-col items-center justify-start pt-50 sm:pt-50 min-h-screen px-4 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-md border border-black/20 dark:border-white/20 shadow-lg relative z-10">
        <h1 className="text-2xl sm:text-3xl font-light mb-6 text-black dark:text-white text-center">
          {title}
        </h1>

        {children}

        {footer && (
          <div className="flex flex-col items-center mt-6 gap-2 text-sm text-center">
            {footer}
          </div>
        )}

        {showBackButton && (
          <div className="mt-6 flex justify-center">
            <GlassButton
              href={backHref}
              label={backLabel}
              className="w-full sm:w-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
