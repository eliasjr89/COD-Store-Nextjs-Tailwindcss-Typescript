import { NextResponse } from "next/server";
import { success } from "@/lib/response";

export async function POST() {
  return NextResponse.json(success({ message: "Logout correcto" }));
}
