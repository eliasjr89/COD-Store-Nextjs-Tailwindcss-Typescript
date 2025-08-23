import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

interface TokenPayload {
  id: string;
  email: string;
}

export async function DELETE(req: Request) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader?.startsWith("bearer ")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  let payload: TokenPayload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: payload.id },
      select: { id: true, username: true, email: true },
    });

    return NextResponse.json({
      message: "Usuario eliminado correctamente",
      user: deletedUser,
    });
  } catch (err) {
    console.log("DELETE /api/users/delete error: ", err);
    return NextResponse.json(
      { error: "Error interno al eliminar usuario" },
      { status: 500 }
    );
  }
}
