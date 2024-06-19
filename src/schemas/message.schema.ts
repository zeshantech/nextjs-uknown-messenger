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
    page: z.string(),
    limit: z.string(),
  }),
};

export const sendMessagesSchema = {
  body: z.object({
    userId: z.string(),
    content: z.string(),
  }),
};

export const autoPredictionSchema = {
  query: z.object({
    message: z.string(),
  }),
};

export const deleteMessageSchema = {
  query: z.object({
    _id: z.string(),
  }),
};
