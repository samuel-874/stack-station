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
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user }: { session: any; user: any }) {
      if (user) {
        session.user = {
          id: (user as any).id,
          name: user.name,
          email: user.email,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
