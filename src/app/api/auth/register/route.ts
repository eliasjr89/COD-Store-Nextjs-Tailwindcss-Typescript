import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendError } from "@/lib/response";
import { isUsernameOrEmailTaken } from "@/lib/validators/user";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, confirmPassword } = await req.json();

    if (!username || username.trim().length < 3 || username.trim().length > 20)
      return sendError(
        "El nombre de usuario debe tener entre 3 y 20 caracteres",
        400
      );
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return sendError("Email inválido", 400);
    if (!password || password.length < 6)
      return sendError("La contraseña debe tener al menos 6 caracteres", 400);
    if (password !== confirmPassword)
      return sendError("Las contraseñas no coinciden", 400);

    if (await isUsernameOrEmailTaken(username, email))
      return sendError("Usuario o email ya en uso", 409);

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      data: {
        token,
        user: { id: user.id, username: user.username, email: user.email },
      },
    });
  } catch {
    return sendError("Error interno del servidor", 500);
  }
}
