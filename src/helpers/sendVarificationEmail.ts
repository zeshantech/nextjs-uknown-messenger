import { resend } from "@/lib/resend";
import VarificationEmail from "../../emails/VarificationEmail";

interface SendVaificationEmailInput {
  email: string;
  username: string;
  OTP: string;
}

export const handleSendVarificationEmail = async (
  input: SendVaificationEmailInput
): Promise<void> => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: input.email,
    subject: "Email varification",
    react: VarificationEmail({ username: input.username, OTP: input.OTP }),
  });
};
