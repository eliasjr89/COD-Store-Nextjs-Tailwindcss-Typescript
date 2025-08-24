import { prisma } from "@/lib/prisma";

// Retorna true si el username o email ya existen
export async function isUsernameOrEmailTaken(
  username: string,
  email: string
): Promise<boolean> {
  const existing = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });
  return existing ? true : false;
}
