import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { success, sendError } from "@/lib/response";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return sendError("Email y contraseña son requeridos", 400);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendError("Email o contraseña incorrectos", 400);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      success: true,
      data: {
        user: { id: user.id, username: user.username, email: user.email },
        token,
      },
    });
  } catch (err) {
    console.error("POST /api/login error:", err);
    return sendError("Error interno del servidor", 500);
  }
}
