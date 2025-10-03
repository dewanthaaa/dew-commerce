import { z } from "zod";

export const schemaSignIn = z.object({
  email: z
    .string("Email is required")
    .email({ message: "Invalid email address" }),
  password: z
    .string("Password is required")
    .min(5, { message: "Password must be at least 6 characters" }),
});
