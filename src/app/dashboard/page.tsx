"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlassButton from "@/components/ui/Button";

export default function DashboardPage() {
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me");
        const data = await res.json();

        if (!res.ok || !data.user) {
          setUserData(null);
          return;
        }

        setUserData(data.user);
      } catch (err) {
        console.error(err);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading)
    return <p className="text-center mt-8 text-foreground/70">Cargando...</p>;
  if (!userData)
    return (
      <p className="text-center mt-8 text-foreground/70">
        No autorizado. Por favor, inicia sesión.
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
          ¡Bienvenido, {userData.username}!
        </h1>
        <p className="text-foreground/70 mt-2">Este es tu dashboard.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div className="bg-card/30 p-6 rounded-2xl">
          <h2>Username</h2>
          <p>{userData.username}</p>
        </motion.div>

        <motion.div className="bg-card/30 p-6 rounded-2xl">
          <h2>Email</h2>
          <p>{userData.email}</p>
        </motion.div>

        <motion.div className="bg-card/30 p-6 rounded-2xl flex flex-col gap-4">
          <h2>Acciones</h2>
          <GlassButton label="Editar perfil" variant="secondary" />
        </motion.div>
      </div>
    </div>
  );
}
