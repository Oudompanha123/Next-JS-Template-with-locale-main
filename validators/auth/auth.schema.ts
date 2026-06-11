import { z } from "zod";

export const loginSchema = z.object({
  email: z.union([
    z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email is invalid" }),
    z.string().regex(/^[a-zA-Z0-9@._-]+$/, { message: "Username can only contain letters, numbers, @, ., _, and -" })
  ]).refine((value) => {
    // If it's not an email, ensure it's a valid username (at least 3 characters)
    if (!value.includes('@') || !value.includes('.')) {
      return value.length >= 3;
    }
    return true;
  }, { message: "Username must be at least 3 characters long" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
