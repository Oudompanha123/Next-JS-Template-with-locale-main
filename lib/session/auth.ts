import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth/next";
import { loginService } from "@/services/auth.service";

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
            // Persist tokens and role on the user object for the JWT callback
            accessToken,
            refreshToken,
            expiresIn,
            role: userInfo.role,
          };
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
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        // Store absolute expiry time in epoch seconds
        // const nowSec = Math.floor(Date.now() / 1000);
        // token.expiresAt = user.expiresIn ? nowSec + user.expiresIn : undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.expiresAt = token.expiresAt;
        session.role = token.role;
      }
      return session;
    },
  },
};

export const getAuth = () => getServerSession(authOptions);

export type AppSession = Awaited<ReturnType<typeof getAuth>>;
