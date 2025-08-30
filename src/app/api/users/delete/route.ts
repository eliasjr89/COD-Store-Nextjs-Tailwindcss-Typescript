import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware/auth";

export async function DELETE(req: NextRequest) {
  try {
    const payload = requireAuth(req);
    const deletedUser = await prisma.user.delete({
      where: { id: payload.id },
      select: { id: true, username: true, email: true },
    });
    const res = NextResponse.json({
      message: "Usuario eliminado correctamente",
      user: deletedUser,
    });
    res.cookies.set("auth_token", "", { maxAge: 0, path: "/" });
    return res;
  } catch {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
}
