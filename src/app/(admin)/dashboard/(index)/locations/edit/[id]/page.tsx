import React from "react";
import { getLocationById } from "../../lib/data";
import { redirect } from "next/navigation";
import FormCategory from "../../_components/form-category";

type Tparams = {
  id: string;
};

interface EditPageProp {
  params: Tparams;
}

export default async function EditPage({ params }: EditPageProp) {
  const data = await getLocationById(params.id);

  if (!data) {
    return redirect("/dashboard/locations");
  }
  console.log(data);

  return <FormCategory type="EDIT" data={data} />;
}
