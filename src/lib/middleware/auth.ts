import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { AuthPayload } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET!;

export function requireAuth(req: NextRequest): AuthPayload {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) throw new Error("No autorizado");

  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch {
    throw new Error("Token inválido o expirado");
  }
}
