"use client";

import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";

type AuthProviderProps = PropsWithChildren;

export function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
