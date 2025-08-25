// lib/actions/auth.ts
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { isUsernameOrEmailTaken } from "@/lib/validators/user";

/* ===========================
   LOGIN
=========================== */
export async function loginUser(email: string, password: string) {
  if (!email || !password) throw new Error("Email y contraseña son requeridos");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Email o contraseña incorrectos");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("Email o contraseña incorrectos");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: { id: user.id, username: user.username, email: user.email },
  };
}

/* ===========================
   REGISTER
=========================== */
export async function registerUser(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  if (!username || username.trim().length < 3)
    throw new Error("El nombre de usuario debe tener al menos 3 caracteres");

  if (!email) throw new Error("Email inválido");

  if (!password || password.length < 6)
    throw new Error("La contraseña debe tener al menos 6 caracteres");

  if (password !== confirmPassword)
    throw new Error("Las contraseñas no coinciden");

  const taken = await isUsernameOrEmailTaken(username, email);
  if (taken) throw new Error("Usuario o email ya en uso");

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: { id: user.id, username: user.username, email: user.email },
  };
}

/* ===========================
   CURRENT USER
=========================== */
export async function getCurrentUser(token: string) {
  if (!token) throw new Error("Token inválido");

  let payload: { id: string };
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  } catch {
    throw new Error("Token inválido o expirado");
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: { id: true, username: true, email: true },
  });

  if (!user) throw new Error("Usuario no encontrado");
  return user;
}

/* ===========================
   DELETE USER
=========================== */
export async function deleteUser(token: string) {
  if (!token) throw new Error("Token inválido");

  let payload: { id: string };
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  } catch {
    throw new Error("Token inválido o expirado");
  }

  const deletedUser = await prisma.user.delete({
    where: { id: payload.id },
    select: { id: true, username: true, email: true },
  });

  return {
    message: "Usuario eliminado correctamente",
    user: deletedUser,
  };
}

/* ===========================
   FORGOT PASSWORD (envía link)
=========================== */
export async function sendResetPasswordEmail(email: string) {
  if (!email) throw new Error("El email es requerido");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return { message: "Si el email existe, se envió el link de recuperación" };

  const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const resetLink = `${baseUrl}/reset-password?token=${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Recuperación de contraseña",
    html: `<p>Hola ${user.username},</p>
           <p>Haz clic en el enlace para restablecer tu contraseña:</p>
           <a href="${resetLink}">${resetLink}</a>
           <p>Este enlace expira en 15 minutos.</p>`,
  };

  await transporter.sendMail(mailOptions);

  return {
    message: "Se envió el link de recuperación a tu email",
  };
}

/* ===========================
   RESET PASSWORD (PATCH)
=========================== */
export async function resetPassword(
  token: string,
  newPassword: string,
  confirmPassword: string
) {
  if (!token) throw new Error("Token inválido o inexistente");
  if (!newPassword || newPassword.length < 6)
    throw new Error("La contraseña debe tener al menos 6 caracteres");
  if (newPassword !== confirmPassword)
    throw new Error("Las contraseñas no coinciden");

  let payload: { id: string };
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  } catch {
    throw new Error("Token inválido o expirado");
  }

  const user = await prisma.user.findUnique({ where: { id: payload.id } });
  if (!user) throw new Error("Usuario no encontrado");

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return { message: "Contraseña actualizada correctamente" };
}
