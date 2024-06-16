import { z } from "zod";

export const verifyEmailSchema = {
  body: z.object({
    OTP: z.string().length(6),
    email: z.string().email(),
  }),
};
