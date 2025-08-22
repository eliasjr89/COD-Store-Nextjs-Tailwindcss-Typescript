"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("tokem");
    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  return loading;
};
