"use client";
import { create } from "@/app/api/groups/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function NewItem() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild className="cursor-pointer hover:text-blue-700" >
          <Button size={"sm"} variant={"outline"} className="">
            Create Group
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <div className="flex items-center my-4 gap-3">
              <span className="font-semibold">Add Group</span>
            </div>
          </SheetHeader>
          <form action={create}>
              <p className="mb-2 mt-3">Group Name:</p>
              <Input type="text" name="groupName"></Input>
              <p className="mb-2 mt-6">Group Type:</p>
              <Input type="text" name="groupType"></Input>
              <Button className="mt-5">Create</Button>
            </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
