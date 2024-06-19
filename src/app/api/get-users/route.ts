import { authenticator } from "@/helpers/authenticator";
import { connectToDB } from "@/lib/connectToDB";
import { Message } from "@/model/message.model";
import { User } from "@/model/user.model";
import { getUsersSchema } from "@/schemas/user.schema";
import { schemaValidator } from "@/utilities/schemaValidator";

export async function GET(request: Request) {
  try {
    await connectToDB();
    await schemaValidator(getUsersSchema, request);
    // const { _id: userId } = await authenticator();
    const userId = "66716706a5af688b934e5999";

    const { searchParams } = new URL(request.url);
    const page = +searchParams.get("page")!;
    const limit = +searchParams.get("limit")!;

    const startIndex = (page - 1) * limit;

    const totalCounts = await User.countDocuments();
    const totalPossiblePages = Math.ceil(totalCounts / limit);
    const message = totalPossiblePages === page ? "nomore" : "more";

    const users = await User.find({ _id: { $ne: userId } })
      .populate("username", "_id")
      .skip(startIndex)
      .limit(limit);

    return Response.json({ success: true, message, users });
  } catch (error) {
    return Response.json({ message: error.message as string, success: false });
  }
}
