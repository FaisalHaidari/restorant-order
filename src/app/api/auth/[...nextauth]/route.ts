import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    secret: process.env.SECRET,
  providers: [ CredentialsProvider({

    name: 'Credentials',
    id: 'credentials',
    credentials: {
      username: { label: "Email", type: "email", placeholder: "test@example.com" },
      password: { label: "Password", type: "password" },
    },
   async authorize(credentials, req) {
      const email = credentials.username;
      const password = credentials.password;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return null;
      }
      const passwordOk = bcrypt.compareSync(password, user.password);
      if (!passwordOk) {
        return null;
      }
      return { ...user, id: String(user.id) };
    }
  })],
})

export { handler as GET, handler as POST }