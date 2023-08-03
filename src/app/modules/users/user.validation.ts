import { z } from 'zod';

const createUserZodeSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'Role is required',
    }),
    password: z.string().optional(),
  }),
});
// await createUserZodeSchema.parseAsync(req)

export const UserValidation = {
  createUserZodeSchema,
};
