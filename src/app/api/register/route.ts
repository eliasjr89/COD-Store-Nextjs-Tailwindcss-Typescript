import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, email, password, confirmPassword } = await req.json();

    // Validaciones rápidas
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
    if (failed)
      return NextResponse.json({ error: failed.error }, { status: 400 });

    // Verificación de duplicados en paralelo
    const [existingUsername, existingEmail] = await Promise.all([
      prisma.user.findUnique({ where: { username } }),
      prisma.user.findUnique({ where: { email } }),
    ]);

    const duplicateError = existingUsername
      ? "El nombre de usuario ya está en uso"
      : existingEmail
      ? "El email ya está en uso"
      : null;

    if (duplicateError)
      return NextResponse.json({ error: duplicateError }, { status: 409 });

    // Crear usuario con contraseña hasheada
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      { message: "Usuario creado con éxito", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
