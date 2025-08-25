"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/locale/dictionary";
import StatusModal from "@/components/ui/StatusModal";
import { DashboardLayoutProps } from "@/types";

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

  return (
    <>
      {loading ? (
        <StatusModal message={t.pleaseWait} />
      ) : !token ? (
        <StatusModal message={t.goodbye} />
      ) : (
        <div className="min-h-screen p-6 text-black dark:text-white bg-background transition-colors duration-300">
          <main>{children}</main>
        </div>
      )}
    </>
  );
}
