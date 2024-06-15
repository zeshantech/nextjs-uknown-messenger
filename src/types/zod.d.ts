import { ZodSchema } from "zod";

declare module "zod" {
  interface ZodValidationSchema<T = ZodSchema> {
    body?: ZodSchema;
    query?: ZodSchema;
  }
}
