import { prisma } from "@/lib/prisma";

export async function isUsernameOrEmailTaken(
  username: string,
  email: string
): Promise<boolean> {
  const existing = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });
  return existing ? true : false;
}
