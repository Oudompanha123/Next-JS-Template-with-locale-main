"use client";

import type { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

import QueryClientProvider from "@/lib/providers/query-client-provider";
import { AuthContextProvider } from "@/lib/context/auth-context";

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <SessionProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default AuthLayout;
