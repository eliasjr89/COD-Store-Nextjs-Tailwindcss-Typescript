import { TokenPayload } from "@/types";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "./auth/cookies";

const JWT_SECRET = process.env.JWT_SECRET!;

export function getUserFromCookie(req: NextRequest): TokenPayload | null {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}
