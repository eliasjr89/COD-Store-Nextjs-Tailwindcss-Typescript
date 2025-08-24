import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { success, sendError } from "@/lib/response";
import { isUsernameOrEmailTaken } from "@/lib/validators/user";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, confirmPassword } = await req.json();

    // Validaciones
    const validations = [
      {
        valid:
          typeof username === "string" &&
          username.trim().length >= 3 &&
          username.trim().length <= 20 &&
          /^[a-zA-Z0-9_]+$/.test(username),
        error:
          "El nombre de usuario debe tener entre 3 y 20 caracteres y solo puede contener letras, números o _",
      },
      {
        valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        error: "Email inválido",
      },
      {
        valid: typeof password === "string" && password.length >= 6,
        error: "La contraseña debe tener al menos 6 caracteres",
      },
      {
        valid: password === confirmPassword,
        error: "Las contraseñas no coinciden",
      },
    ];

    const failed = validations.find((v) => !v.valid);
    if (failed) return sendError(failed.error, 400);

    // Verificar duplicados
    if (await isUsernameOrEmailTaken(username, email)) {
      return sendError("Usuario o email ya en uso", 409);
    }

    // Crear usuario
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    // Generar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: { id: user.id, username: user.username, email: user.email },
      },
    });
  } catch (err) {
    console.error("POST /api/register error:", err);
    return sendError("Error interno del servidor", 500);
  }
}
