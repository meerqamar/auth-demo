import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';
const adapter = PrismaAdapter(prisma);

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: {
    ...adapter,
    createUser: async (data) => {
      delete data.id;
      const user = await adapter.createUser(data);
      return { ...user, id: user.id.toString() };
    },
    getUser: async (id) => {
      const user = await adapter.getUser(Number(id));
      return user ? { ...user, id: user.id.toString() } : null;
    },
    getUserByEmail: async (email) => {
      const user = await adapter.getUserByEmail(email);
      return user ? { ...user, id: user.id.toString() } : null;
    },
    getUserByAccount: async (providerAccountId) => {
      const user = await adapter.getUserByAccount(providerAccountId);
      return user ? { ...user, id: user.id.toString() } : null;
    },
    updateUser: async (data) => {
      if (data.id) data.id = Number(data.id);
      const user = await adapter.updateUser(data);
      return { ...user, id: user.id.toString() };
    },
    linkAccount: async (data) => {
      data.userId = Number(data.userId);
      return await adapter.linkAccount(data);
    },
    createSession: async (data) => {
      data.userId = Number(data.userId);
      const session = await adapter.createSession(data);
      return { ...session, userId: session.userId.toString() };
    },
    getSessionAndUser: async (sessionToken) => {
      const result = await adapter.getSessionAndUser(sessionToken);
      if (!result) return null;
      return {
        user: { ...result.user, id: result.user.id.toString() },
        session: { ...result.session, userId: result.session.userId.toString() }
      };
    },
    updateSession: async (data) => {
      if (data.userId) data.userId = Number(data.userId);
      const session = await adapter.updateSession(data);
      return { ...session, userId: session.userId.toString() };
    }
  },
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
