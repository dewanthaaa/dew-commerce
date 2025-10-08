"use client";

import { Category } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

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
        <div>
          <Button size="sm">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            <Trash className="w-4 h-4" />
            Delete
          </Button>
        </div>
      );
    },
  },
];
