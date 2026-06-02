import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';
export const { handlers, auth, signIn, signOut } = NextAuth({
 adapter: PrismaAdapter(prisma),
 providers: [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true,
  }),
  GitHub({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    allowDangerousEmailAccountLinking: true,
  }),
 ],
 callbacks: {
 session({ session, user }) {
 session.user.id = user.id; // Add user ID to session
 return session;
 },
 },
});
