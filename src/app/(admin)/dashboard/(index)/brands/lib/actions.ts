"use server";

import { schemaBrand } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { uploadFile } from "@/lib/supabase";

export async function postBrand(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaBrand.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  try {
    const fileName = await uploadFile(validate.data.image, "brands");

    await prisma.brand.create({
      data: { name: validate.data.name, logo: fileName },
    });
    console.log(validate.data.name);
  } catch (error) {
    console.log(error);
    return {
      error: "Failed To Insert Data",
    };
  }

  return redirect("/dashboard/brands");
}
