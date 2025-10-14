// import React from "react";
import { redirect } from "next/navigation";
import FormBrand from "../../_components/form-brand";
import { Tedit } from "@/types";
import { getBrandById } from "../../lib/data";

export default async function EditPage({ params }: Tedit) {
  const brand = await getBrandById(params.id);

  if (!brand) {
    return redirect("/dashboard/brands");
  }
  console.log(brand);

  return <FormBrand type="EDIT" data={brand} />;
}
