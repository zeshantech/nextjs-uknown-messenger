import { ZodValidationSchema } from "zod";
import { clone } from "lodash";

export async function schemaValidator(
  schema: ZodValidationSchema,
  request: Request
) {
  if (schema.query) {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const result = schema.query.safeParse(params);
    if (!result.success) {
      const messages = result.error.errors.map((error) => {
        return `${error.path[0]}: ${error.message}`;
      });
      throw new Error(messages.join(", "));
    }
  }

  if (schema.body) {
    const body = await request.json();
    const result = schema.body.safeParse(body);
    if (!result.success) {
      const messages = result.error.errors.map((error) => {
        return `${error.path[0]}: ${error.message}`;
      });
      throw new Error(messages.join(", "));
    }
  }
}
