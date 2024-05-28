"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "../../../../../convex/_generated/api";

export default function NewAccount() {
  const createAccount = useMutation(api.accounts.createAccount);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"default"}
            className="bg-blue-700 hover:bg-blue-800 text-white"
          >
            Add Account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Account</DialogTitle>
            <DialogDescription>
                <p className="mb-2 mt-3">Account Name</p>
                <Input type="text"></Input>
                <p className="mb-2 mt-6">Starting Allowance</p>
                <Input type="number"></Input>
                <Button
                  className="mt-5"
                  onClick={() => {
                    setOpen(false);
                    createAccount({
                      accountName: "Checking",
                      isActive: true,
                      organizationId: "testin",
                      startingAllowance: 50,
                    });
                  }}
                >
                  Create
                </Button>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
