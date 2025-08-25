import { NextResponse } from "next/server";

export const success = <T>(data: T, status = 200) =>
  NextResponse.json({ success: true, data }, { status });

export const sendError = (message: string, status?: number) =>
  NextResponse.json(
    { success: false, error: message },
    { status: status ?? 400 }
  );
