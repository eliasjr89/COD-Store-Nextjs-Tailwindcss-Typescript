import { NextRequest, NextResponse } from "next/server";
import { success } from "@/lib/response";

export async function POST(req: NextRequest) {
  // Para logout simple
  return NextResponse.json(success({ message: "Logout correcto" }));
}
