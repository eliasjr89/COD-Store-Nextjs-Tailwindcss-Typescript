import { NextRequest } from "next/server";
import { getUserFromRequest, TokenPayload } from "../auth";

// Siempre devuelve TokenPayload o lanza error
export function requireAuth(req: NextRequest): TokenPayload {
  const user = getUserFromRequest(req);
  if (!user) {
    throw new Error("No autorizado");
  }
  return user;
}

// Ejemplo futuro: validar rol de usuario
export function requireRole(req: NextRequest, role: string): TokenPayload {
  const user = requireAuth(req);
  // @ts-ignore: si agregas role al payload
  if (user.role !== role) throw new Error("No autorizado");
  return user;
}
