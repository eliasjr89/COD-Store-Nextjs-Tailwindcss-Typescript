"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return; // 👈 importante: no sigas ejecutando
      }

      try {
        const res = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        console.log("Respuesta del backend:", data); // 👈 debug

        if (data.error || !data.user) {
          localStorage.removeItem("token");
          router.push("/login");
          return; // 👈 importante
        }

        setUserData(data.user);
      } catch (err) {
        console.error("Error fetching user data:", err);
        localStorage.removeItem("token");
        router.push("/login");
        return; // 👈 importante
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <p>Cargando...</p>;

  if (!userData) return <p>No se pudo cargar el usuario.</p>; // 👈 fallback

  return (
    <div className="p-4 text-black dark:text-white">
      <h1>Bienvenido al Dashboard</h1>
      {userData ? (
        <>
          <p>Usuario: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </>
      ) : (
        <p>No se encontró usuario</p>
      )}
    </div>
  );
}
