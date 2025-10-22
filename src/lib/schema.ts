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

export const schemaBrand = z.object({
  name: z
    .string({ error: "Brand Name is Required" })
    .min(4, { message: "Should have at least 4 characters" }),
  image: z
    .any()
    .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {
      message: "File is not valid",
    })
    .refine((file: File) => file?.name, { message: "Image is Required" }),
});

export const schemaProduct = z.object({
  name: z
    .string({ error: "Product Name is Required" })
    .min(4, { message: "Should have at least 4 characters" }),
  description: z
    .string({ error: "Description is Required" })
    .min(10, { message: "Should have at least 10 characters" }),
  price: z.string({ error: "Price is Required" }),
  stock: z.string({ error: "Stock is Required" }),
  brand_id: z.string({ error: "Brand is Required" }),
  category_id: z.string({ error: "Category is Required" }),
  location_id: z.string({ error: "Location is Required" }),
  images: z
    .any()
    .refine((files: File[]) => files.length === 3, {
      message: "Please upload 3 image product",
    })
    .refine(
      (files: File[]) => {
        let validate = false;

        Array.from(files).find((file) => {
          validate = ALLOW_MIME_TYPES.includes(file.type);
        });

        return validate;
      },
      {
        message: "Uploaded file should image",
      }
    ),
});

export const schemaProductEdit = schemaProduct
  .extend({
    id: z.number({ message: "Product Id is Required" }),
  })
  .omit({ images: true });

// export const schemaBrand = schemaCategory.extend({
//   image: z
//     .any()
//     .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {
//       message: "File is not valid",
//     })
//     .refine((file: File) => file?.name, { message: "Image is Required" }),
// });
