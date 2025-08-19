"use client";

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, children }: AuthCardProps) {
  return (
    <div className="flex flex-col items-center justify-start pt-32 sm:pt-40 min-h-screen px-4 sm:px-6">
      <div
        className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-xl 
                      bg-white/10 dark:bg-black/10 backdrop-blur-md 
                      border border-black/20 dark:border-white/20 shadow-lg relative z-10"
      >
        <h1 className="text-2xl sm:text-3xl font-light mb-6 text-black dark:text-white text-center">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
