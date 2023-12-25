"use server";
import { Button } from "@/components/ui/button";
import { createPrismaClient } from "../../../prisma/prisma";
import NewItem from "./_components/new-item";
import { MoreVertical } from "lucide-react";
import ManageGoal from "./_components/manage-goal";

export default async function Dashboard() {
  const prisma = createPrismaClient();

  const groups = await prisma.group.findMany();

  return (
    <>
      <div className="bg-blue-50">
        <div className="mx-auto max-w-screen-xl px-2 xl:px-0 py-10">
          <h1 className="font-semibold text-sm">User's Dashboard</h1>
          {groups?.length === 0 && (
            <div className="flex items-center gap-5 mt-3">
              <h6>You don't have any groups.. </h6>
              <NewItem></NewItem>
            </div>
          )}
          {groups?.length > 0 && (
            <div className="flex justify-between items-center mt-5">
              <h4 className="text-xl font-semibold">My Groups</h4>
              <NewItem></NewItem>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {groups.map((group) => (
              <div
                className="rounded-md border border-gray-200 bg-white mt-3 p-4"
                key={group.id}
              >
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-lg">{group.groupName}</h1>

                  <ManageGoal goalId={group.id}></ManageGoal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
