"use client";

import AuthCard from "@/components/ui/AuthCard";
import AuthInput from "@/components/ui/AuthInput";
import GlassButton from "@/components/ui/Button";
import { useForm } from "@/hooks/useForm";
import { useSearchParams, useRouter } from "next/navigation";
import { dictionary } from "@/locale/dictionary";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "@/components/ui/Spinner";

export default function ResetPasswordForm() {
  const { language } = useLanguage();
  const t = dictionary[language];

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const { values, handleChange, errors, loading, submitted, handleSubmit } =
    useForm({ newPassword: "", confirmPassword: "" });

  const submit = async () => {
    const fieldErrors: Record<string, string> = {};
    if (!values.newPassword) fieldErrors.newPassword = t.passwordError;
    if (values.newPassword !== values.confirmPassword)
      fieldErrors.confirmPassword = t.confirmPasswordError;

    if (Object.keys(fieldErrors).length > 0) throw { fieldErrors };

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Error al actualizar la contraseña");

      // Después de enviar correctamente, dejamos el mensaje y redirigimos
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Ocurrió un error inesperado";
      throw { fieldErrors: { general: message } };
    }
  };

  return (
    <AuthCard
      title={submitted ? "" : t.resetPassword} // Oculta el título cuando se envía
      showBackButton={!submitted} // Oculta el botón de volver cuando se envía
      backLabel={t.back}
      footer={null} // Sin footer en el mensaje de confirmación
    >
      {submitted ? (
        <p className="text-center text-black/80 dark:text-white/80 text-xl -mt-4">
          {t.passwordUpdated}
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(submit);
          }}
          className="flex flex-col gap-4"
        >
          <AuthInput
            type="password"
            placeholder={t.password}
            value={values.newPassword}
            onChange={handleChange("newPassword")}
            error={errors.newPassword}
          />
          <AuthInput
            type="password"
            placeholder={t.confirmPassword}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            error={errors.confirmPassword}
          />
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="spinner"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-2"
              >
                <Spinner size={24} />
              </motion.div>
            ) : (
              <GlassButton
                key="submit"
                type="submit"
                label={t.updatePassword}
                className="w-full"
              />
            )}
          </AnimatePresence>
        </form>
      )}
    </AuthCard>
  );
}
