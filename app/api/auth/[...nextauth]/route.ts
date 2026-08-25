import NextAuth from "next-auth";
import { authOption } from "@/lib/session";

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };


