import { User } from "@/model/user.model";
import { checkUsernameSchema } from "@/schemas/auth.schema";
import { schemaValidator } from "@/utilities/schemaValidator";

export async function GET(request: Request) {
  try {
    await schemaValidator(checkUsernameSchema, request);

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    const isExistByUsername = await User.findOne({ username });
    if (isExistByUsername) {
      throw new Error("Username already taken");
    }

    return Response.json({ success: true, message: "Username available" });
  } catch (error) {
    return Response.json({ success: false, message: error.message });
  }
}
