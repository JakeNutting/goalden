"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";

export default function NewAccount() {
  const createAccount = useMutation(api.accounts.createAccount);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="cursor-pointer">
          <Button
            size={"sm"}
            variant={"outline"}
            className="bg-blue-700 hover:bg-blue-800 hover:text-white text-white"
          >
            Create Account
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <div className="flex items-center my-4 gap-3">
              <span className="font-semibold">Add Account</span>
            </div>
          </SheetHeader>
          <form>
            <p className="mb-2 mt-3">Account Name</p>
            <Input type="text" name="groupName"></Input>
            <p className="mb-2 mt-6">Starting Allowance</p>
            <Input type="number" name="groupType"></Input>
            <Button
              className="mt-5"
              onClick={() => {
                createAccount({
                  accountName: "Checking",
                  isActive: true,
                  organizationId: "testin",
                  startingAllowance: 50,
                });
                setOpen(false);
              }}
            >
              Create
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
