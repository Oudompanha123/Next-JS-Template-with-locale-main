"use client";

import { createContext, useContext, useMemo, type PropsWithChildren } from "react";
import { useSession } from "next-auth/react";

import type { Role } from "@/types/auth";

type AuthContextValue = {
  role: Role | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasRole: (...roles: Role[]) => boolean;
  isAdmin: boolean;
  isManager: boolean;
  isUser: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const { data: session, status } = useSession();
  const role = session?.role ?? null;

  const value = useMemo<AuthContextValue>(
    () => ({
      role,
      isAuthenticated: status === "authenticated",
      isLoading: status === "loading",
      hasRole: (...roles) => role !== null && roles.includes(role),
      isAdmin: role === "admin",
      isManager: role === "manager",
      isUser: role === "user",
    }),
    [role, status]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
