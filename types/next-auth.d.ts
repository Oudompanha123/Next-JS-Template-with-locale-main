import type { Role } from "@/types/auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    role?: Role;
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    role?: Role;
  }
}
