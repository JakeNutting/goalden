"use server";

import NewItem from "./_components/new-item";
import { LayoutDashboard } from "lucide-react";
import ManageGoal from "./_components/manage-goal";
import createPrismaClient from "../../../prisma/prisma";

export default async function Dashboard() {
  const prisma = createPrismaClient();

  const groups = await prisma.group.findMany({
    where: {
      isActive: true
    }
  });

  return (
    <>
      <div className="bg-blue-50">
        <div className="mx-auto max-w-screen-xl px-2 xl:px-0 py-10">
          <h1 className="text-gray-500 text-sm flex items-center gap-2"><LayoutDashboard size={22} className="text-blue-700"></LayoutDashboard>Jake's Dashboard</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-8 mt-3">
            {groups.map((group) => (
              <div
                className="rounded-md border border-gray-200 bg-white p-4"
                key={group.id}
              >
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-lg">{group.groupName}</h1>
                  <ManageGoal group={group}></ManageGoal>
                </div>
                <p className="text-gray-400 text-sm mt-2">{group.groupType}</p>
              </div>
            ))}
          </div>


        </div>
      </div>
    </>
  );
}
