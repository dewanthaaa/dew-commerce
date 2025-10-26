"use server";

import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { deleteFile, uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import prisma from "../../../../../../../lib/prisma";
import { redirect } from "next/navigation";
import { ProductStock } from "@/generated/prisma";

export async function storeProduct(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
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

export async function updateProduct(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  const validate = schemaProductEdit.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    stock: formData.get("stock"),
    id: id,
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  const product = await prisma.product.findFirst({
    where: {
      id: id,
    },
  });

  if (!product) {
    return {
      error: "Product is Not Found",
    };
  }

  const uploaded_images = formData.getAll("images") as File[];
  let filenames = [];

  if (uploaded_images.length === 3) {
    const parseImages = schemaProduct.pick({ images: true }).safeParse({
      images: uploaded_images,
    });

    if (!parseImages.success) {
      return {
        error: "Failed to Upload Images",
      };
    }

    for (const image of uploaded_images) {
      const filename = await uploadFile(image, "product");
      filenames.push(filename);
    }
  } else {
    filenames = product.images;
  }

  try {
    await prisma.product.update({
      where: {
        id: id,
      },
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
      error: "Failed to Update Data",
    };
  }
  return redirect("/dashboard/products");
}

export async function deleteProduct(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  const product = await prisma.product.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      images: true,
    },
  });

  if (!product) {
    return {
      error: "Product is Not Found",
    };
  }

  try {
    for (const image of product.images) {
      await deleteFile(image, "product");
    }

    await prisma.product.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed To Delete Data",
    };
  }

  return redirect("/dashboard/products");
}
