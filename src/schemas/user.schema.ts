import { z } from "zod";

export const getUsersSchema = {
  query: z.object({
    page: z.string(),
    limit: z.string(),
  }),
};
