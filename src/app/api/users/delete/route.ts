import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { success, sendError } from "@/lib/response";
import { requireAuth } from "@/lib/middleware/auth";

export async function DELETE(req: NextRequest) {
  try {
    const payload = requireAuth(req);

    const deletedUser = await prisma.user.delete({
      where: { id: payload.id },
      select: { id: true, username: true, email: true },
    });

    return success({
      message: "Usuario eliminado correctamente",
      user: deletedUser,
    });
  } catch {
    return sendError("Error interno al eliminar usuario", 500);
  }
}
