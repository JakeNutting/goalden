"use client";
import { createOrUpdate, deleteGroup } from "@/app/api/groups/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Group } from "@prisma/client";
import { Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ManageGoal({ group }: { group: Group }) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="">
          <MoreVertical size={16}></MoreVertical>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <ul className="space-y-3">
          <li className="hover:cursor-pointer hover:bg-gray-100 p-2 px-3 rounded-md">
            <Link href={"/dashboard/" + group.id} className="flex gap-2 align-middle items-center"><Eye size={16} ></Eye>View</Link>
          </li>
          <EditGroup group={group}></EditGroup>
          <DeletePopup group={group}></DeletePopup>
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export function DeletePopup({ group }: { group: Group }) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <li className="flex gap-3 w-full items-center hover:cursor-pointer hover:bg-gray-100 p-2 px-3 rounded-md">
          <Trash size={16} className="text-red-500"></Trash>
          Delete
        </li>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete {group.groupName}?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            group and all information inside.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={() => deleteGroup(group.id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditGroup({ group }: { group: Group }) {
  const [nameState, setNameState] = useState(group.groupName);
  const [typeState, setTypeState] = useState(group.groupType);
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="cursor-pointer">
        <li className="flex gap-3 items-center hover:cursor-pointer hover:bg-gray-100 p-2 px-3 rounded-md">
          <Pencil size={16}></Pencil>Edit
        </li>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center my-4 gap-3">
            <span className="font-semibold">Add Group</span>
          </div>
        </SheetHeader>
        <form action={createOrUpdate}>
          <input type="hidden" name="id" value={group.id} />
          <p className="mb-2 mt-3">Group Name:</p>
          <Input type="text" name="groupName" value={nameState} onChange={(e) => setNameState(e.target.value)}></Input>
          <p className="mb-2 mt-6">Group Description:</p>
          <Input type="text" name="groupType" value={typeState} onChange={(e) => setTypeState(e.target.value)}></Input>
          <Button className="mt-5" onClick={() => setOpen(false)}>Edit</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
