import { z } from "zod";

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

// export type SignUpData = z.infer<typeof signupSchema>;
