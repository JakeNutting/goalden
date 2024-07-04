import { ColumnDef } from "@tanstack/react-table";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
export const columns: ColumnDef<Doc<"transactions">>[] = [
    {
      accessorKey: "transactionName",
      header: "Name",
    },
    {
        accessorKey: "accountName",
        header: "Account",
      },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "spendingType",
      header: "Type",
    },
    {
      accessorKey: "_creationTime",
      header: "Date",
      cell: ({ row }) => {
        const date = row.getValue("_creationTime") as Date;
        return new Date(date).toLocaleDateString();
      }
    },
    {
        accessorKey: "ammount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("ammount"))
            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)

            const category = row.getValue("category");

       
            return <>
                <div className="font-medium text-right">
                    {category === "Withdrawal" || category === "Expense" && (
                        <span className="bg-red-200 text-xs font-semibold text-red-800 rounded-full px-2 py-1.5">-{formatted}</span>
                    )}
                    {category === "Deposit" && (
                        <span className="bg-green-200 text-xs font-semibold text-green-800 rounded-full px-2 py-1.5">+{formatted}</span>
                    )}
                </div>
            </>
          },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const payment = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment._id)}
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
  ]