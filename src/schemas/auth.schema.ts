import { ZodValidationSchema, z, ZodSchema } from "zod";

export const checkUsernameSchema: ZodValidationSchema = {
  query: z.object({
    username: z.string(),
  }),
};

export const sendVerificationEmailSchema = {
  body: z.object({
    email: z.string().email(),
  }),
};

export const signinSchema = {
  body: z.object({
    identifier: z.string().trim().min(1, "Required").max(24, "Too long"),
    password: z.string().min(1, "Required").max(18, "Too long"),
  }),
};

export const signupSchema = {
  body: z.object({
    username: z.string().trim().min(1, "Required").max(24, "Too long"),
    email: z.string().email("Invalid format"),
    password: z
      .string()
      .min(6)
      .max(18, "Too long")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,18}$/, "Not matching format"),
  }),
};

export const verifyEmailSchema = {
  body: z.object({
    OTP: z.string().length(6),
    email: z.string().email(),
  }),
};
