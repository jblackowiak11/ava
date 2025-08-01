// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";

const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;
