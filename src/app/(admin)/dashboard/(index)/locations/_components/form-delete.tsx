"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ActionResult } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import { deleteLocation } from "../lib/actions";

const initialState: ActionResult = {
  error: "",
};

interface FormDeleteProps {
  id: number;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="destructive" size="sm" disabled={pending}>
      <Trash className="w-4 h-4 mr-2" />
      {pending ? "Loading..." : "Delete"}
    </Button>
  );
}

export default function FormDelete({ id }: FormDeleteProps) {
  const deleteLocationWithId = (_: unknown, formData: FormData) =>
    deleteLocation(_, formData, id);

  const [state, formAction] = useFormState(deleteLocationWithId, initialState);
  console.log(state);

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
}
