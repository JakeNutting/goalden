"use server";

import NewItem from "./budget/_components/new-account";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { CircleDollarSign } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  return (
    <>
      <div className="bg-blue-50">
        <div className="mx-auto max-w-screen-xl px-2 xl:px-0 py-10">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">Dashboard</h4>
            <OrganizationSwitcher />
          </div>
          <h4 className="text-md mt-1">
            Your space to track and manage your organization.
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-8 mt-5">
            <div className="rounded-md border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-2xl flex gap-3 items-center">
                  <CircleDollarSign className="text-blue-700"></CircleDollarSign>
                  Budget
                </h1>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                In need of saving some money for that new car? You're in luck!
              </p>
              <div className="flex justify-center">
                <Link href={"/dashboard/budget"} className="w-full md:w-1/2">
                  <Button
                    variant={"default"}
                    className="mt-4 bg-blue-700 hover:bg-blue-800 transition-colors w-full"
                  >
                    Start Budgeting
                  </Button>
                </Link>
              </div>
            </div>
            {/* {groups.map((group) => (
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
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
}
