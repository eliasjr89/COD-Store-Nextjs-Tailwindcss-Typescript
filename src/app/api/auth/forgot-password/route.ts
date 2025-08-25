import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { sendError } from "@/lib/response";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return sendError("El email es requerido", 400);

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "15m",
      });

      console.log(
        `Reset password link: https://tu-app.com/reset-password?token=${resetToken}`
      );
    }

    return NextResponse.json({
      data: {
        message: "Si el email existe, se envió el link de recuperación",
      },
    });
  } catch (err) {
    console.error("POST /api/forgot-password error:", err);
    return sendError("Error interno del servidor", 500);
  }
}
