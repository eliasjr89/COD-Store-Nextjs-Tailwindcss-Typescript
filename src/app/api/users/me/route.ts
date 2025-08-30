import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware/auth";

export async function GET(req: NextRequest) {
  try {
    const payload = requireAuth(req) as { id: string };
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, username: true, email: true },
    });
    if (!user)
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    return NextResponse.json({ data: user });
  } catch {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
}
