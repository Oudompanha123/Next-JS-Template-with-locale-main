"use client";

import type { PropsWithChildren } from "react";
import QueryClientProvider from "@/libs/providers/query-client-provider";
import AuthProvider from "./auth-provider";

type AppProviderProps = PropsWithChildren;

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
