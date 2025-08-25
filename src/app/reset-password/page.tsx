"use client";

import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center p-4">Cargando...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
