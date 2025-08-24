// lib/response.ts
import { NextResponse } from "next/server";

export const success = (data: any, status = 200) =>
  NextResponse.json({ success: true, data }, { status });

// Cambiamos "status: 400" por "status?: number"
export const sendError = (message: string, status?: number) =>
  NextResponse.json(
    { success: false, error: message },
    { status: status ?? 400 }
  );
