"use client";

import Link from "next/link";
import Image from "next/image";
import { Brand } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { getImageUrl } from "@/lib/supabase";
// import FormDelete from "./_components/form-delete";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: "Brand",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="inline-flex">
          <Image
            src={getImageUrl(brand.logo)}
            alt="Product"
            width={80}
            height={80}
          ></Image>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="space-x-4 inline-flex">
          <Button size="sm" asChild>
            <Link href={`/dashboard/brands/edit/${brand.id}`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </Button>
          {/* <FormDelete id={location.id} /> */}
        </div>
      );
    },
  },
];
