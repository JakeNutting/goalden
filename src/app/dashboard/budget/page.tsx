"use client"
import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import createPrismaClient from "../../../../prisma/prisma";
import NewAccount from "./_components/new-account";
import { CircleDollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { Account } from "./models/account";

const Budget = () => {
  const { organization } = useOrganization();
  const [accounts, setAccounts] = useState([] as Account[]);

  useEffect(() => {
    if (!organization) {
      return;
    }

    const fetchAccounts = async () => {
        const prisma = createPrismaClient();
        const accounts = await prisma.accounts.findMany({
          where: {
            organizationId: parseInt(organization.id ?? "0"),
          },
          include: {
            accountType: true,
          },
        });
        setAccounts(accounts);
    };

    fetchAccounts();
  }, [organization]);

  return (
    <>
       <div className="bg-blue-50 py-20">
          <div className="mx-auto max-w-screen-xl px-2 xl:px-0">
            <div className="flex justify-between">
              <h1 className="text-dark text-3xl font-semibold flex gap-3 items-center">
                <CircleDollarSign className="text-blue-700"></CircleDollarSign>Budget
              </h1>
              <OrganizationSwitcher></OrganizationSwitcher>
            </div>
            <p className="my-1 flex text-lg font-normal">Welcome to budgeting made easy with Goalden. Manage your accounts below</p>
          </div>
        </div>
        <div className="mx-auto max-w-screen-xl px-2 xl:px-0 mt-10">
          {accounts?.length === 0 && (
            <div className="flex items-center gap-5">
              <h6>You don't have any accounts.. </h6>
              <NewAccount></NewAccount>
            </div>
          )}
          {accounts?.map((account) => (
            <div
              className="rounded-md border border-gray-200 bg-white p-4"
              key={account.id}
            >
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-lg">{account.accountName}</h1>
              </div>
              <p className="text-gray-400 text-sm mt-2">{account.accountType.type}</p>
            </div>
          ))}
        </div>
    </>
  );
}
export default Budget

