import { z } from "zod";
export const signinSchema = z.object({
  emailId: z
    .string()
    .min(1, "Required")
    .max(50, "Too long")
    .email("Invalid email"),
  password: z
    .string()
    .min(1, "Required")
    .min(8, "Min 8 characters")
    .max(50, "Too long"),
});

export const signupSchema = z.object({
  firstName: z.string().min(1, "Required").max(50, "Too long"),
  lastName: z.string().min(1, "Required").max(50, "Too long"),
  emailId: z
    .string()
    .min(1, "Required")
    .email("Invalid email")
    .max(50, "Too long"),
  password: z
    .string()
    .min(1, "Required")
    .min(8, "Min 8 characters")
    .max(50, "Too long"),
});
