"use server";

import { schemaCategory } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function postCategory(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  try {
    await prisma.category.create({
      data: { name: validate.data.name },
    });
  } catch (error) {
    console.log(error);
    return redirect("/dashboard/categories/create");
  }

  return redirect("/dashboard/categories");
}
