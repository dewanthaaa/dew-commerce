"use client";

import Link from "next/link";
import { Order } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
// import FormDelete from "./_components/form-delete";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "name",
    header: "Order",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="space-x-4 inline-flex">
          <Button size="sm" asChild>
            <Link href={`/dashboard/orders/edit/${order.id}`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </Button>
          {/* <FormDelete id={order.id} /> */}
        </div>
      );
    },
  },
];
