import "next-auth";
import { DefaultSession } from "next-auth";

interface UserFields {
    ID: string;
    username: string;
    isAcceptingMessage: boolean;
    isVerified: boolean;
    createdAt: Date;
}

declare module "next-auth" {
    interface User extends UserFields {}
    
    interface Session {
        user: UserFields & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT extends UserFields {}
}
