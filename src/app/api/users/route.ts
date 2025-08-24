import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { success, sendError } from "@/lib/response";
import { requireAuth } from "@/lib/middleware/auth";

export async function GET(req: NextRequest) {
  try {
    const payload = requireAuth(req); // TokenPayload seguro

    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true },
      orderBy: { username: "asc" },
    });

    return success({ users });
  } catch (err: any) {
    if (err.message === "No autorizado") return sendError(err.message, 401);
    console.error("GET /api/users error:", err);
    return sendError("Error al obtener usuarios", 500);
  }
}
