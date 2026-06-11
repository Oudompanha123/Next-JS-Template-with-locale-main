import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth/next";
import { loginService } from "@/services/login/login.service";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const result = await loginService.login({
            username: credentials.email,
            password: credentials.password,
          });
          const { accessToken, refreshToken, expiresIn, userInfo } =
            result.data;

          return {
            id: userInfo.userId,
            name: userInfo.fullName,
            email: userInfo.email,
            // Persist tokens on the user object for the JWT callback
            accessToken,
            refreshToken,
            expiresIn,
          } as unknown as import("next-auth").User;
        } catch (_) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        const u = user as unknown as {
          accessToken?: string;
          refreshToken?: string;
          expiresIn?: number;
        };
        token.accessToken = u.accessToken;
        token.refreshToken = u.refreshToken;
        // Store absolute expiry time in epoch seconds
        // const nowSec = Math.floor(Date.now() / 1000);
        // token.expiresAt = u.expiresIn ? nowSec + u.expiresIn : undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session as unknown as Record<string, unknown>).accessToken =
          token.accessToken;
        (session as unknown as Record<string, unknown>).refreshToken =
          token.refreshToken;
        (session as unknown as Record<string, unknown>).expiresAt =
          token.expiresAt;
      }
      return session;
    },
  },
};

export const getAuth = () => getServerSession(authOptions);

export type AppSession = Awaited<ReturnType<typeof getAuth>>;
