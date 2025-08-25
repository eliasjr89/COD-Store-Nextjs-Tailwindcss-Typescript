export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? null : "Invalid email";

export const validatePassword = (password: string) =>
  password.length >= 6 ? null : "Password must be at least 6 characters";

export const validateUsername = (username: string) =>
  username.length >= 3 ? null : "Username must be at least 3 characters";
