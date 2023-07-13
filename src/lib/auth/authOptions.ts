import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../models/prisma";
import { comparePasswords } from "./utils";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });

        // If user validate password
        if (user) {
          const passwordMatch = await comparePasswords(credentials?.password, user.password);
          if (passwordMatch) {
            // Return the user object if the passwords match
            return user;
          }
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }: any) => {
      session.user.id = token.id
      return session
    },
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
}
