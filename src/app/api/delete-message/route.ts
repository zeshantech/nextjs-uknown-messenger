import { Message } from "@/model/message.model";
import { deleteMessageSchema } from "@/schemas/message.schema";
import { schemaValidator } from "@/utilities/schemaValidator";

export async function POST(request: Request) {
  try {
    await schemaValidator(deleteMessageSchema, request);
    // const { _id: userId } = await authenticator();

    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get("_id");

    const message  = await Message.findOneAndDelete({ _id: messageId, /* user: userId */ });
    if (!message) {
      throw new Error("Message not specified");
    }

    return Response.json({ message: "Message deleted", success: true });

  } catch (error) {
    return Response.json({ message: error.message as string, success: false });
  }
}
