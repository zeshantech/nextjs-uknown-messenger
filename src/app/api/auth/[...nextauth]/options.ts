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
        const user = await User.get({ username: credentials.identifier });

        if (!user || !comparePassword(user.password, credentials.password))
          throw new Error("Invalid credentials specified");
        if (!user.isVerified) throw new Error("Email unverified specified");

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { ID, isVerified, isAcceptingMessage, username } = user;
        Object.assign(token, {
          ID: ID.toString(),
          isVerified,
          isAcceptingMessage,
          username,
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const { ID, isVerified, isAcceptingMessage, username } = token;
        Object.assign(session.user, {
          ID,
          isVerified,
          isAcceptingMessage,
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
