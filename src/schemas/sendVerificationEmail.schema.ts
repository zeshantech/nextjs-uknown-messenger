import { z } from "zod";

export const sendVerificationEmailSchema = {
  body: z.object({
    email: z.string().email(),
  }),
};
