import { handleSendVarificationEmail } from "@/helpers/sendVarificationEmail";
import { connectToDB } from "@/lib/connectToDB";
import { User } from "@/model/user.model";

interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    // TODO: will fix
    // await schemaValidator(signupSchema, req);
    await connectToDB();
    const { username, email, password } = await req.json();

    const isExistByUsername = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (isExistByUsername?.isVerified) {
      throw new Error("User already exists");
    }

    if (isExistByUsername && !isExistByUsername.isVerified) {
      await User.findByIdAndDelete(isExistByUsername._id);
    }

    await createUser({ username, email, password });
    return Response.json({ message: "Check your mailbox", success: true });
  } catch (error) {
    return Response.json({ message: error.message as string, success: false });
  }
}

async function createUser({ email, password, username }: CreateUserInput) {
  const verifyCode = (~~(Math.random() * 999999 + 100000)).toString();
  const verifyCodeExpiry = new Date();
  verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);

  const user = new User({
    username,
    email,
    password,
    verifyCode,
    verifyCodeExpiry,
  });

  await user.save();
  await handleSendVarificationEmail({ email, username, OTP: verifyCode });
}
