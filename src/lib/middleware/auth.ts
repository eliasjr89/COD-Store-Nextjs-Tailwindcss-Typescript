import { NextRequest } from "next/server";
import { getUserFromRequest } from "../auth";
import { TokenPayload } from "@/types";

export function requireAuth(req: NextRequest): TokenPayload {
  const user = getUserFromRequest(req);
  if (!user) {
    throw new Error("No autorizado");
  }
  return user;
}
