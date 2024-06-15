import { ZodValidationSchema, z, ZodSchema } from "zod";

export const checkUsernameSchema: ZodValidationSchema = {
  query: z.object({
    username: z.string(),
  }),
};
