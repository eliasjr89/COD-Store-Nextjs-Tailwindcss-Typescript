import { NextRequest, NextResponse } from "next/server";
import { sendResetPasswordEmail } from "@/lib/actions/auth";
import { ErrorWithMessage } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const response = await sendResetPasswordEmail(email);
    return NextResponse.json({ data: response });
  } catch (err) {
    const error = err as ErrorWithMessage;
    return NextResponse.json(
      { error: error.message || "Error al enviar el email" },
      { status: 500 }
    );
  }
}
