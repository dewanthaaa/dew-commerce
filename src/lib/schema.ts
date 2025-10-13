import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];

export const schemaSignIn = z.object({
  email: z
    .string({ error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ error: "Password is required" })
    .min(5, { message: "Password must be at least 6 characters" }),
});

export const schemaCategory = z.object({
  name: z
    .string({ error: "Category Name is Required" })
    .min(4, { message: "Should have at least 4 characters" }),
});

export const schemaLocation = z.object({
  name: z
    .string({ error: "Location Name is Required" })
    .min(4, { message: "Should have at least 4 characters" }),
});

export const schemaBrand = schemaCategory.extend({
  image: z
    .any()
    .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {
      message: "File is not valid",
    })
    .refine((file: File) => file?.name, { message: "Image is Required" }),
});
