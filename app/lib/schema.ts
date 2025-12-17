import { z } from 'zod';

const types = ["under", "over"] as const;
export const validationSchema = z.strictObject({
  num: z.coerce
    .number({ message: "Must be a number" })
    .min(1, { message: "Minimum value may be 1" })
    .max(100, { message: "Maximum value may be 100" }),

  type: z.enum(types, {
    message: "Wrong comparison type",
  }),
});