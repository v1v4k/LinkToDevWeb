import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "Required").max(50, "Too long"),
  lastName: z.string().min(1, "Required").max(50, "Too long"),
  age: z.coerce
    .number()
    .min(18, "Must be at least 18")
    .max(100, "Must be under 100"),
  gender: z.enum(["Male", "Female", "Others"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  about: z.string().max(300, "Max 300 characters").optional().or(z.literal("")),
  photoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  skills: z.array(z.string()).optional()
});
