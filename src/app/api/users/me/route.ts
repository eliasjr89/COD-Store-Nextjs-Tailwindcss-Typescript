import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { success, sendError } from "@/lib/response";
import { requireAuth } from "@/lib/middleware/auth";

export async function GET(req: NextRequest) {
  try {
    const payload = requireAuth(req);

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, username: true, email: true },
    });

    if (!user) return sendError("Usuario no encontrado", 404);

    return success({ user });
  } catch {
    return sendError("Error al obtener usuario", 500);
  }
}
