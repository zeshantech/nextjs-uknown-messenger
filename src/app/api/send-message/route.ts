import { authenticator } from "@/helpers/authenticator";
import { Message } from "@/model/message.model";
import { User } from "@/model/user.model";
import { getMessagesSchema } from "@/schemas/message.schema";
import { schemaValidator } from "@/utilities/schemaValidator";

export async function GET(request: Request) {
  try {
    // TODO: will fix
    // await schemaValidator(sendMessagesSchema, request);
    await authenticator();
    const { username, content } = await request.json();

    const user = await checkUserAndStatus(username);
    await Message.create({ user: user._id, content });

    return Response.json({ success: true, message: "Message sent" });
  } catch (error) {
    return Response.json({ message: error.message as string, success: false });
  }
}

async function checkUserAndStatus(username: string) {
  const user = await User.findOne({ username });

  if (!user) throw new Error("User not found");
  if (!user.isAcceptMessages) throw new Error("User is not accepting messages");

  return user;
}
