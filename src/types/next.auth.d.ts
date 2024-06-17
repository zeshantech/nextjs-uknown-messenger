import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface UserFields {
    _id: string;
    username: string;
    isAcceptMessages: boolean;
    isVerified: boolean;
    createdAt: Date;
  }

  interface User extends UserFields {}

  type SessionUser = UserFields & DefaultSession["user"];

  interface Session {
    user: SessionUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserFields {}
}
