"use client";

import type { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { muiTheme } from "@/lib/mui/theme";

export function MuiThemeProvider({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export default MuiThemeProvider;
