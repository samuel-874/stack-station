import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prismadb";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma as any),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.hashedPassword) return null;
        const match = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!match) return null;
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },
  callbacks: {
    async jwt({ token, user, trigger, session: updateSession }: any) {
      // On sign in, attach user data to token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        // Fetch full user data from DB to get role and workspaceId
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            workspaceId: true,
          },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.workspaceId = dbUser.workspaceId;
        }
      }
      // On session update (e.g., after onboarding), refresh from DB
      if (trigger === "update") {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            workspaceId: true,
          },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.workspaceId = dbUser.workspaceId;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      // Attach token data to session
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.workspaceId = token.workspaceId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
