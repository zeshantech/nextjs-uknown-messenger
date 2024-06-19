import { authenticator } from "@/helpers/authenticator";
import { connectToDB } from "@/lib/connectToDB";
import { Message } from "@/model/message.model";
import { getMessagesSchema } from "@/schemas/message.schema";
import { schemaValidator } from "@/utilities/schemaValidator";

export async function GET(request: Request) {
  try {
    await connectToDB()
    await schemaValidator(getMessagesSchema, request);
    const { _id: userId } = await authenticator();

    const { searchParams } = new URL(request.url);
    const page = +searchParams.get("page")!;
    const limit = +searchParams.get("limit")!;

    const startIndex = (page - 1) * limit;

    const totalCounts = await Message.countDocuments({ user: userId });
    const totalPossiblePages = Math.ceil(totalCounts / limit);
    const message = totalPossiblePages === page ? "nomore" : "more";

    const messages = await Message.find({ user: userId })
      .skip(startIndex)
      .limit(limit);

    return Response.json({ success: true, message, messages });
  } catch (error) {
    return Response.json({ message: error.message as string, success: false });
  }
}
