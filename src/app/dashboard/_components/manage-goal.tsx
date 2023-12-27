"use client";
import { deleteGroup } from "@/app/api/groups/actions";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Group } from "@prisma/client";
import { Eye, MoreVertical, Pencil, Trash } from "lucide-react";

export default function ManageGoal({ group }: { group: Group }) {
  return (
    <Popover>
      <PopoverTrigger >
        <div className="">
          <MoreVertical size={18}></MoreVertical>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <ul className="space-y-3">
          <li className="flex gap-3 items-center hover:cursor-pointer hover:bg-gray-100 p-2 px-3 rounded-md">
            <Eye size={16}></Eye>View
          </li>
          <li className="flex gap-3 items-center hover:cursor-pointer hover:bg-gray-100 p-2 px-3 rounded-md">
            <Pencil size={16}></Pencil>Edit
          </li>
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
