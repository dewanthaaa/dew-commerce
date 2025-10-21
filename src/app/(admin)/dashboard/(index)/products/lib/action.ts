"use server";

import { schemaProduct } from "@/lib/schema";
import { uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import prisma from "../../../../../../../lib/prisma";
import { redirect } from "next/navigation";
import { ProductStock } from "@/generated/prisma";

export async function storeProduct(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  console.log({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    stock: formData.get("stock"),
    images: formData.getAll("images"),
  });

  const validate = schemaProduct.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    stock: formData.get("stock"),
    images: formData.getAll("images"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  const uploaded_images = validate.data.images as File[];
  const filenames = [];

  for (const image of uploaded_images) {
    const filename = await uploadFile(image, "product");
    filenames.push(filename);
  }

  try {
    await prisma.product.create({
      data: {
        name: validate.data.name,
        description: validate.data.description,
        stock: validate.data.stock as ProductStock,
        category_id: Number.parseInt(validate.data.category_id),
        location_id: Number.parseInt(validate.data.location_id),
        brand_id: Number.parseInt(validate.data.brand_id),
        price: Number.parseInt(validate.data.price),
        images: filenames,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed To Insert Data",
    };
  }

  return redirect("/dashboard/products");
}
