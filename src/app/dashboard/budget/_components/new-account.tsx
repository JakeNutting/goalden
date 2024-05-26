"use client";
import { createOrUpdate } from "@/app/api/groups/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export default function NewAccount() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="cursor-pointer hover:text-blue-700" >
          <Button size={"sm"} variant={"outline"} className="">
            Create Account
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <div className="flex items-center my-4 gap-3">
              <span className="font-semibold">Add Group</span>
            </div>
          </SheetHeader>
          <form action={createOrUpdate}>
              <p className="mb-2 mt-3">Group Name:</p>
              <Input type="text" name="groupName"></Input>
              <p className="mb-2 mt-6">Group Description:</p>
              <Input type="text" name="groupType"></Input>
              <Button className="mt-5" onClick={() => setOpen(false)}>Create</Button>
            </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
