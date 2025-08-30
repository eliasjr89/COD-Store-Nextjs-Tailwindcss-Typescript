"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/locale/dictionary";
import FormMessage from "@/components/ui/FormMessage";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { language } = useLanguage();
  const t = dictionary[language];
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/users/me");
        if (!res.ok) throw new Error("No autorizado");
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FormMessage>{t.pleaseWait}</FormMessage>
      </div>
    );

  if (!authenticated)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FormMessage>{t.goodbye}</FormMessage>
      </div>
    );

  return (
    <div className="min-h-screen p-6 text-black dark:text-white bg-background transition-colors duration-300">
      <main>{children}</main>
    </div>
  );
}
