"use client";

import Link from "next/link";
import { Category } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import FormDelete from "./_components/form-delete";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="space-x-4 inline-flex">
          <Button size="sm" asChild>
            <Link href={`/dashboard/categories/edit/${category.id}`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </Button>
          <FormDelete id={category.id} />
        </div>
      );
    },
  },
];
