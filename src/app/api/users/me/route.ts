import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

interface TokenPayload {
  id: string;
  email: string;
}

export async function GET(req: Request) {
  // Recibimos el header de la petición
  const authHeader = req.headers.get("Authorization");

  // Verificamos que el token exista y tenga formato Bearer
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Extraemos el token
  const token = authHeader.split(" ")[1];

  // Validamos el token
  let payload: TokenPayload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  try {
    // Buscamos al usuario correspondiente al token
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Devolvemos los datos del usuario autenticado
    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error al obtener usuario" },
      { status: 500 }
    );
  }
}
