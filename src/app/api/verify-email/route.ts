import { connectToDB } from "@/lib/connectToDB";
import { User } from "@/model/user.model";

export async function POST(request: Request) {
  try {
    await connectToDB();
    // await schemaValidator(verifyEmailSchema, request);
    const { email, OTP } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("OTP not matching");
    }

    if (user.verifyCodeExpiry < new Date()) {
      throw new Error("OTP is expired");
    }

    if (user.verifyCode !== OTP) {
      throw new Error("OTP not matching");
    }

    await User.findOneAndUpdate({ email }, { isVerified: true });

    return Response.json({ success: true, message: "Email verified success" });
  } catch (error) {
    return Response.json({ success: false, message: error.message });
  }
}
