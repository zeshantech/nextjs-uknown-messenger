import { authenticator } from "@/helpers/authenticator";
import { User } from "@/model/user.model";

export async function POST(req: Request) {
  try {
    const user = await authenticator();
    const { isAcceptMessages } = await req.json();

    await User.findByIdAndUpdate(user._id, { isAcceptMessages });

    return Response.json({
      message: "Status Updated",
      success: true,
      isAcceptMessages,
    });
  } catch (error) {
    return Response.json({
      message: error.message as string,
      success: false,
    });
  }
}

export async function GET() {
  try {
    const { _id } = await authenticator();

    const user = await User.findById(_id);

    return Response.json({
      message: "Success",
      success: true,
      isAcceptMessages: user?.isAcceptMessages,
    });
  } catch (error) {
    return Response.json({
      message: error.message as string,
      success: false,
    });
  }
}
