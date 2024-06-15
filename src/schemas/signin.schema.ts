import { z } from "zod";

export const signinSchema = {
  body: z.object({
    identifier: z.string().trim().min(1, "Required").max(24, "Too long"),
    password: z.string().min(1, "Required").max(18, "Too long"),
  }),
};
