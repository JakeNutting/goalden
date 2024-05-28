"use client";
import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import NewAccount from "./_components/new-account";
import { CircleDollarSign } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const Budget = () => {
  const accounts = useQuery(api.accounts.getAccounts);

  const { organization } = useOrganization();

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
            <NewAccount></NewAccount>
          </div>
        )}
        <div className="flex justify-between items-center mb-5">
          <h6 className="font-semibold text-xl">My Accounts</h6>
          <NewAccount></NewAccount>
        </div>
        {accounts?.map((account) => (
          <div
            className="rounded-md border border-gray-200 bg-white p-4"
            key={account.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-lg">{account.accountName}</h1>
            </div>
            <p className="text-gray-400 text-sm mt-2">Checking</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Budget;
