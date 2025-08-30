"use client";

import { AuthContextProps } from "@/types";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const AuthContext = createContext<AuthContextProps>({
  loggedIn: false,
  setLoggedIn: () => {},
  checking: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/users/me");
        setLoggedIn(res.ok);
      } catch {
        setLoggedIn(false);
      } finally {
        setChecking(false);
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, checking }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
