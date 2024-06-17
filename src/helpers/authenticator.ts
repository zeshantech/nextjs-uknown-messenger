import authOptions from "@/app/api/auth/[...nextauth]/options";
import { IUser, User } from "@/model/user.model";
import { getServerSession } from "next-auth";

export const authenticator = async (): Promise<IUser> => {
  const session = await getServerSession(authOptions);

  const currentUser = session?.user;

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  const user = await User.findById(currentUser._id);

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
};
