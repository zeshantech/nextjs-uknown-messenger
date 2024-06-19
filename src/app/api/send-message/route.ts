import { connectToDB } from "@/lib/connectToDB";
import { Message } from "@/model/message.model";
import { User } from "@/model/user.model";
import { authenticator } from "@/helpers/authenticator";

export async function POST(request: Request) {
  try {
    await connectToDB();
    // TODO: will fix
    // await schemaValidator(sendMessagesSchema, request);

    await authenticator();
    const { userId, content } = await request.json();

    const user = await checkUserAndStatus(userId);
    await Message.create({ user: user._id, content });

    return Response.json({ success: true, message: "Message sent" });
  } catch (error) {
    return Response.json({ message: error.message as string, success: false });
  }
}

async function checkUserAndStatus(userId: string) {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");
  if (!user.isAcceptMessages) throw new Error("User is not accepting messages");

  return user;
}
