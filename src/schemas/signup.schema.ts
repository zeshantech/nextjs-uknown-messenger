import { ZodValidationSchema, z } from "zod";

export const signupSchema: ZodValidationSchema = {
  body: z.object({
    username: z.string().min(3).max(30),
    email: z.string().email("Invalid format"),
    password: z
      .string()
      .min(6)
      .max(18)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,18}$/, "Not matching format"),
  }),
};

// export type SignUpData = z.infer<typeof signupSchema>;
