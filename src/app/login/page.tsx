"use client";

import { useState } from "react";
import GlassButton from "@/components/ui/Buttons";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/locale/dictionary";
import Link from "next/link";
import ValidationModal from "@/components/ui/ValidationModal";

export default function LoginForm() {
  const { language } = useLanguage();
  const t = dictionary[language];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);

    const errors: string[] = [];

    // Validación básica
    if (!username) errors.push(t.usernameError);
    if (!password) errors.push(t.passwordError);

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);

    // Simulación de login (aquí pondrías tu API real)
    await new Promise((res) => setTimeout(res, 1000));

    // Simulamos credenciales incorrectas
    if (username !== "user" || password !== "1234") {
      setValidationErrors([t.invalidCredentials]);
      setLoading(false);
      return;
    }

    // Login correcto
    setLoading(false);
    alert("Login correcto!"); // Aquí rediriges a dashboard
  };

  return (
    <div className="flex flex-col items-center justify-start pt-50 sm:pt-50 min-h-screen px-4 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-md border border-black/20 dark:border-white/20 shadow-lg relative z-10">
        <h1 className="text-2xl sm:text-3xl font-light mb-6 text-black dark:text-white text-center">
          {t.login}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder={t.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-white/20 dark:bg-black/20 border border-black/20 dark:border-white/20 text-black dark:text-white placeholder-black/60 dark:placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40 transition"
          />
          <input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-white/20 dark:bg-black/20 border border-black/20 dark:border-white/20 text-black dark:text-white placeholder-black/60 dark:placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40 transition"
          />

          <GlassButton
            label={loading ? t.loading : t.login}
            type="submit"
            className="w-full"
          />
        </form>

        <div className="flex flex-col items-center mt-6 gap-2 text-sm text-center">
          <p className="text-black/80 dark:text-white/80">
            {t.noAccount}{" "}
            <Link href="/register" className="underline hover:opacity-80">
              {t.register}
            </Link>
          </p>
          <Link
            href="/forgot-password"
            className="text-black/80 dark:text-white/80 underline hover:opacity-80"
          >
            {t.forgotPassword}
          </Link>
        </div>

        <div className="mt-6 flex justify-center">
          <GlassButton href="/" label={t.back} className="w-full sm:w-auto" />
        </div>
      </div>

      {/* Modal de validación */}
      {validationErrors.length > 0 && (
        <ValidationModal
          errors={validationErrors}
          onClose={() => setValidationErrors([])}
        />
      )}
    </div>
  );
}
