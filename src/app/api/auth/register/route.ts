import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/actions/auth";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/lib/auth/cookies";

export async function POST(req: NextRequest) {
  const { username, email, password, confirmPassword } = await req.json();
  try {
    const { token, user } = await registerUser(
      username,
      email,
      password,
      confirmPassword
    );
    const res = NextResponse.json({ user });
    res.cookies.set(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);
    return res;
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error interno" },
      { status: 400 }
    );
  }
}
