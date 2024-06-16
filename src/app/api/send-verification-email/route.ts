import { handleSendVarificationEmail } from "@/helpers/sendVarificationEmail";
import { connectToDB } from "@/lib/connectToDB";
import { User } from "@/model/user.model";

export async function POST(req: Request) {
  try {
    // TODO: will fix
    // await schemaValidator(sendVerificationEmailSchema, req);
    await connectToDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.isVerified) {
      throw new Error("User already verified");
    }

    await updateUser(email);

    return Response.json({ message: "Check your mailbox", success: true });
  } catch (error) {
    return Response.json({ message: error.message as string, success: false });
  }
}

async function updateUser(email: string) {
  const verifyCode = (~~(Math.random() * 999999 + 100000)).toString();
  const verifyCodeExpiry = new Date();
  verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);

  const user = await User.findOneAndUpdate(
    { email },
    {
      verifyCode,
      verifyCodeExpiry,
    }
  );

  await handleSendVarificationEmail({
    email,
    username: user?.username!,
    OTP: verifyCode,
  });
}
