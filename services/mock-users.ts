import type { Role } from "@/types/auth";

// These are placeholder credentials for local development only (see MOCK_AUTH
// in auth.service.ts, which is hard-disabled outside development). They are
// not secrets: they grant no access to any real system, and are intentionally
// published in this template so contributors know how to sign in locally.
export type MockUser = {
  userId: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: Role;
};

export const mockUsers: MockUser[] = [
  {
    userId: "mock-admin-1",
    username: "admin",
    email: "admin@example.com",
    password: "admin123", // NOSONAR typescript:S2068 - dev-only placeholder, see file header
    fullName: "Admin User",
    role: "admin",
  },
  {
    userId: "mock-manager-1",
    username: "manager",
    email: "manager@example.com",
    password: "manager123", // NOSONAR typescript:S2068 - dev-only placeholder, see file header
    fullName: "Manager User",
    role: "manager",
  },
  {
    userId: "mock-user-1",
    username: "user",
    email: "user@example.com",
    password: "user123", // NOSONAR typescript:S2068 - dev-only placeholder, see file header
    fullName: "Regular User",
    role: "user",
  },
];

export const findMockUser = (identifier: string, password: string) =>
  mockUsers.find(
    (candidate) =>
      (candidate.username === identifier || candidate.email === identifier) &&
      candidate.password === password
  );
