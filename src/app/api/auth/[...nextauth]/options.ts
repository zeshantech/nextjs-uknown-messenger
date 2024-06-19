import { connectToDB } from "@/lib/connectToDB";
import { IUser, User } from "@/model/user.model";
import { comparePassword } from "@/utilities/bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"identifier" | "password", string>
      ): Promise<IUser | any> {
        await connectToDB();
        const { identifier } = credentials;
        const user = await User.findOne({
          $or: [{ email: identifier }, { username: identifier }],
        });

        if (!user || !comparePassword(user.password, credentials.password))
          throw new Error("Invalid credentials specified");

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { _id, isVerified, isAcceptMessages, username } = user;
        Object.assign(token, {
          _id: _id.toString(),
          isVerified,
          isAcceptMessages,
          username,
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const { _id, isVerified, isAcceptMessages, username } = token;
        Object.assign(session.user, {
          _id,
          isVerified,
          isAcceptMessages,
          username,
        });
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
