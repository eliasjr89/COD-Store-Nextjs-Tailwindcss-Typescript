"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslations";
import GlassButton from "@/components/ui/Button";

export default function DashboardPage() {
  const { t } = useTranslation();

  const [userData, setUserData] = useState<{
    username: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok || !data.data?.user) {
          localStorage.removeItem("token");
          return;
        }

        setUserData(data.data.user);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading)
    return <p className="text-center mt-8 text-foreground/70">{t.loading}</p>;
  if (!userData)
    return (
      <p className="text-center mt-8 text-foreground/70">
        {t.dashboardLoadError}
      </p>
    );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-background/50 to-background/80 dark:from-background/80 dark:to-background/95">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground">
          {t.dashboardWelcome}, {userData.username}!
        </h1>
        <p className="text-foreground/70 mt-2">{t.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-card/30 backdrop-blur-md border border-border rounded-2xl p-6 shadow-lg transition-transform duration-300"
        >
          <h2 className="text-xl font-semibold text-card-foreground mb-2">
            {t.dashboardUsername}
          </h2>
          <p className="text-card-foreground/80">{userData.username}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-card/30 backdrop-blur-md border border-border rounded-2xl p-6 shadow-lg transition-transform duration-300"
        >
          <h2 className="text-xl font-semibold text-card-foreground mb-2">
            {t.dashboardEmail}
          </h2>
          <p className="text-card-foreground/80">{userData.email}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-card/30 backdrop-blur-md border border-border rounded-2xl p-6 shadow-lg flex flex-col gap-4 transition-transform duration-300"
        >
          <h2 className="text-xl font-semibold text-card-foreground">
            {t.dashboardSettings}
          </h2>
          <GlassButton label={t.dashboardEditProfile} variant="secondary" />
          <GlassButton label={t.dashboardOrders} variant="secondary" />
          <GlassButton label={t.dashboardSupport} variant="secondary" />
        </motion.div>
      </div>
    </div>
  );
}
