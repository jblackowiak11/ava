// lib/auth-options.ts
import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const isAllowed = user.email?.endsWith("@abodie.co");
      if (!isAllowed) throw new Error("Unauthorized");
      return true;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};
