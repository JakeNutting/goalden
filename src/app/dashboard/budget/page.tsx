"use client";
import { OrganizationSwitcher, useOrganization, useUser } from "@clerk/nextjs";
import NewAccount from "./_components/new-account";
import { CircleDollarSign } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { cn } from "@/app/lib/utils";

const Budget = () => {
  const org = useOrganization();
  const user = useUser();

  let orgId = null;

  if (org.isLoaded && user.isLoaded) {
    orgId = org.organization?.id ?? user.user?.id;
  }
  const accounts = useQuery(
    api.accounts.getAccounts,
    orgId && user ? { organizationId: orgId } : "skip"
  );

  return (
    <>
      <div className="bg-blue-50 py-20">
        <div className="mx-auto max-w-screen-xl px-2 xl:px-0">
          <div className="flex justify-between">
            <h1 className="text-dark text-3xl font-semibold flex gap-3 items-center">
              <CircleDollarSign className="text-blue-700"></CircleDollarSign>
              Budget
            </h1>
            <OrganizationSwitcher></OrganizationSwitcher>
          </div>
          <p className="my-1 flex text-lg font-normal">
            Welcome to budgeting made easy with Goalden. Manage your accounts
            below
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-2 xl:px-0 mt-10">
        {accounts?.length === 0 && (
          <div className="flex items-center gap-5">
            <h6>You don't have any accounts.. </h6>
            <NewAccount orgId={orgId}></NewAccount>
          </div>
        )}
        <div className="flex justify-between items-center mb-3">
          <h6 className="font-semibold text-xl">My Accounts</h6>
          <NewAccount orgId={orgId}></NewAccount>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts?.map((account) => (
            <div
              className="rounded-md border border-gray-200 bg-white p-4"
              key={account._id}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-sm text-gray-500">{account.accountName}</h1>
                <span
                  className={cn("text-sm rounded-full px-2 py-1 font-semibold", {
                    "bg-green-200 text-green-700 ": account.accountType === "Savings",
                    "bg-blue-200 text-blue-700 ": account.accountType === "Checking",
                    "bg-cyan-200 text-cyan-700 ": account.accountType === "Credit Card",
                  })}
                >
                  {account.accountType}
                </span>
              </div>
              <h4 className="text-3xl font-semibold mt-2">
                ${account.startingAllowance.toLocaleString()}
              </h4>
            </div>
          ))}
        </div>

        <h6 className="font-semibold text-xl mt-10">Recent Activity</h6>
        <h6>There is no recent activity on your accounts...</h6>
      </div>
    </>
  );
};
export default Budget;
