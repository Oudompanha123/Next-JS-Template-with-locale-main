"use client";
import { createContext, useContext, useState, type PropsWithChildren } from "react";
import { useSession } from "next-auth/react";

export interface AuthState {
  permissions: Record<string, string[]>;
}

interface AuthContextType extends AuthState {
  hasPermission: (resource: string, action: string) => boolean;
  checkPermissions: (requiredPermissions: Array<[string, string]>) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data } = useSession();

  const ERP = data?.user?.scope === "SYS_ADMIN" ? ["*"] : ["view", "edit"];

  const [authState] = useState<AuthState>({
    permissions: {
      // Example permissions structure
      ERP_INTEGRATION: ERP,
      // "User": ["view", "create", "edit"],
      // Add more resources and their permissions as needed
    },
  });

  // Check if user has a specific permission
  const hasPermission = (resource: string, action: string): boolean => {
    if (data?.user?.scope === "SYS_ADMIN") return true;

    const resourcePermissions = authState.permissions[resource];
    if (!resourcePermissions) return false;

    return resourcePermissions.includes(action) || resourcePermissions.includes("*");
  };

  // Check multiple permissions (all must be true)
  const checkPermissions = (requiredPermissions: Array<[string, string]>): boolean => {
    return requiredPermissions.every(([resource, action]) => hasPermission(resource, action));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        hasPermission,
        checkPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
