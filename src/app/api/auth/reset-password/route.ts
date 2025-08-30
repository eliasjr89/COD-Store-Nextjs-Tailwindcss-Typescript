import { NextRequest, NextResponse } from "next/server";
import { resetPassword } from "@/lib/actions/auth";
import { ErrorWithMessage } from "@/types";

export async function PATCH(req: NextRequest) {
  try {
    const { token, newPassword, confirmPassword } = await req.json();
    const response = await resetPassword(token, newPassword, confirmPassword);
    return NextResponse.json({ data: response });
  } catch (err) {
    const error = err as ErrorWithMessage;
    return NextResponse.json(
      { error: error.message || "Error al actualizar la contraseña" },
      { status: 400 }
    );
  }
}
