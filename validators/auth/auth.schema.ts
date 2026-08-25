import { z } from "zod";

export const loginSchema = z.object({
  user_id: z.string().min(3, { message: "User ID must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
