"use client";

import GlassButton from "@/components/ui/Buttons";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/locale/dictionary";

import Link from "next/link";

export default function RegisterForm() {
  const { language } = useLanguage();
  const t = dictionary[language];

  return (
    <div className="flex flex-col items-center justify-start pt-50 min-h-screen px-4">
      <div className="w-full max-w-sm p-6 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-md border border-black/20 dark:border-white/20 shadow-lg relative z-10">
        {/* Título */}
        <h1 className="text-2xl font-light mb-6 text-black dark:text-white text-center">
          {t.register}
        </h1>

        {/* Formulario */}
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder={t.username}
            className="px-4 py-2 rounded-md bg-white/20 dark:bg-black/20 border border-black/20 dark:border-white/20 text-black dark:text-white placeholder-black/60 dark:placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40 transition"
          />
          <input
            type="password"
            placeholder={t.password}
            className="px-4 py-2 rounded-md bg-white/20 dark:bg-black/20 border border-black/20 dark:border-white/20 text-black dark:text-white placeholder-black/60 dark:placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40 transition"
          />
          <input
            type="password"
            placeholder={t.confirmPassword}
            className="px-4 py-2 rounded-md bg-white/20 dark:bg-black/20 border border-black/20 dark:border-white/20 text-black dark:text-white placeholder-black/60 dark:placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40 transition"
          />

          {/* Botón Registrarse */}
          <GlassButton href="/" label={t.register} />
        </form>

        {/* Enlaces auxiliares */}
        <div className="flex flex-col items-center mt-6 gap-2 text-sm">
          <p className="text-black/80 dark:text-white/80">
            {t.alreadyAccount}{" "}
            <Link href="/login" className="underline hover:opacity-80">
              {t.login}
            </Link>
          </p>
        </div>

        {/* Botón Volver */}
        <div className="mt-6 flex justify-center">
          <GlassButton href="/" label={t.back} />
        </div>
      </div>
    </div>
  );
}
