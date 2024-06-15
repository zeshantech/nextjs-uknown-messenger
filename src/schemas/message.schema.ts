import { z } from "zod";

export const messageSchema = z.object({
  content: z.string().min(10).max(300),
});

export const acceptMessageSchema = z.object({
  acceptMessages: z.boolean(),
});
