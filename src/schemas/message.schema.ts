import { z } from "zod";

export const messageSchema = {
  body: z.object({
    content: z.string().min(10).max(300),
  }),
};

export const acceptMessagesSchema = {
  body: z.object({
    isAcceptMessages: z.boolean(),
  }),
};

export const getMessagesSchema = {
  query: z.object({
    page: z.number(),
    limit: z.number(),
  }),
};

export const sendMessagesSchema = {
  body: z.object({
    username: z.string(),
    content: z.string(),
  }),
};
