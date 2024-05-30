"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Ellipsis, LineChart, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { Doc } from "../../../../../convex/_generated/dataModel";
import NewAccount from "./new-account";

export default function AccountActions({account}: {account: Doc<"accounts">}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const deleteFile = useMutation(api.accounts.deleteAccount);
  const { toast } = useToast();

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              "{account.accountName}" will delete be deleted forever
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                await deleteFile({
                  accountId: account._id,
                });
                toast({
                  variant: "success",
                  title: "Account Deleted",
                  description: "The account has been deleted permanently",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel className="p-4 py-3">
            Account Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="px-3 py-3 my-2 cursor-pointer">
            <LineChart className="mr-3" size={20}></LineChart>Account Overview
          </DropdownMenuItem>
          <DropdownMenuItem className="px-3 py-3 my-2 cursor-pointer">
            <Pencil className="mr-3" size={20}></Pencil>Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsConfirmOpen(true)}
            className="px-3 py-3 my-2 cursor-pointer"
          >
            <Trash2 className="mr-3 text-red-600" size={20}></Trash2>Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
