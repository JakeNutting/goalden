import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Eye, MoreVertical, Pencil, Trash } from "lucide-react";

export default function ManageGoal({ goalId }: { goalId: number }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"outline"} size={"sm"}>
          <MoreVertical size={16}></MoreVertical>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ul className="space-y-3">
            <li className="flex gap-2 items-center hover:cursor-pointer hover:bg-gray-100 p-2 px-3 rounded-md"><Eye size={16}></Eye>View</li>
            <li className="flex gap-2 items-center hover:cursor-pointer hover:bg-gray-100 p-2 px-3 rounded-md"><Pencil size={16}></Pencil>Edit</li>
            <li className="flex gap-2 items-center hover:cursor-pointer hover:bg-gray-100 p-2 px-3 rounded-md group"><Trash size={16} className="group-hover:text-red-500 transition-colors duration-100"></Trash>Delete</li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
