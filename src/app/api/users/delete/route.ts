// api/users/delete.ts
import { NextRequest } from "next/server";
import { deleteUser } from "@/lib/actions/auth";
import { sendError, success } from "@/lib/response";

export async function DELETE(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return sendError("No autorizado", 401);

    const data = await deleteUser(token);
    return success(data);
  } catch {
    return sendError("Error interno al eliminar usuario", 500);
  }
}
