"use client";
import { OrganizationSwitcher, useOrganization, useUser } from "@clerk/nextjs";
import NewAccount from "./_components/new-account";
import { CircleDollarSign } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import { useState } from "react";
import AccountActions from "./_components/account-actions";
import AccountItem from "./_components/account-transaction";
import AccountTransaction from "./_components/account-transaction";
import { DataTable } from "./_components/transactions-table";
import { columns } from "./_components/transaction-columns";

const Budget = () => {
  const org = useOrganization();
  const user = useUser();

  let orgId: string | undefined;

  if (org.isLoaded && user.isLoaded) {
    orgId = org.organization?.id ?? user.user?.id;
  }
  const accounts = useQuery(
    api.accounts.getAccounts,
    orgId && user ? { organizationId: orgId } : "skip"
  );

  const transactions = useQuery(
    api.transactions.getTransactions,
    orgId && user ? { organizationId: orgId } : "skip"
  );

  const [open, setOpen] = useState(false);

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
        {accounts && accounts?.length > 0 && (
          <div className="flex justify-between items-center mb-3">
            <h6 className="font-semibold text-xl">My Accounts</h6>
            <NewAccount orgId={orgId}></NewAccount>
          </div>
        )}
        {accounts && accounts?.length === 0 && (
          <div className="flex flex-col gap-8 items-center mt-24">
            <Image
              alt="an image of a picture and a bank vault"
              width="420"
              height="420"
              src={"/empty.svg"}
            ></Image>
            <div className="flex flex-col gap-4 items-center">
              <h6 className="text-2xl">You don't have any accounts.. </h6>
              <span>
                <NewAccount orgId={orgId}></NewAccount>
              </span>
            </div>
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts?.map((account) => (
            <div
              className="rounded-md border border-gray-200 bg-white p-4"
              key={account._id}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-sm text-gray-500">{account.accountName}</h1>
                <span
                  className={cn(
                    "text-xs rounded-full px-2 py-1 font-semibold",
                    {
                      "bg-green-200 text-green-700 ":
                        account.accountType === "Savings",
                      "bg-blue-200 text-blue-700 ":
                        account.accountType === "Checking",
                      "bg-cyan-200 text-cyan-700 ":
                        account.accountType === "Credit Card",
                    }
                  )}
                >
                  {account.accountType}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <h4 className="text-3xl font-semibold mt-2">
                  ${account.startingAllowance.toLocaleString()}
                </h4>
                <AccountActions account={account}></AccountActions>
              </div>
            </div>
          ))}
        </div>
        {(accounts && accounts?.length > 0 && transactions && transactions?.length == 0) && (
          // Show default view if no transactions
          <div className="flex flex-col gap-8 items-center py-24">
            <Image
              alt="an image of a picture and a bank vault"
              width="300"
              height="300"
              src={"/no-recent-activity.svg"}
            ></Image>
            <div className="flex flex-col gap-4 items-center">
              <h6 className="text-2xl text-center">
                There hasn't been any activity on your accounts yet, keep
                saving!
              </h6>
              <AccountTransaction
                orgId={orgId ?? ""}
                accounts={accounts}
              ></AccountTransaction>
            </div>
          </div>
        )}
        {accounts && transactions && transactions.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-3 mt-16">
              <h6 className="font-semibold text-xl">Recent Transactions</h6>
              <AccountTransaction
                orgId={orgId ?? ""}
                accounts={accounts}
              ></AccountTransaction>
            </div>
            <div className="mb-10 hidden md:block">
              <DataTable columns={columns} data={transactions} />
            </div>
            <div className="block md:hidden">
              {transactions?.map((transaction) => (
                <div
                  className="border-b border-gray-200 bg-white py-4 px-1"
                  key={transaction._id}
                >
                  <div className="flex items-center justify-between">
                    <div className="test">
                      <h1 className="font-semibold text-lg">
                        {transaction.transactionName}
                      </h1>
                      <p className="text-gray-500 mt-1">{transaction.category}</p>
                    </div>
                    <h1 className=" text-gray-500">
                      {transaction.category === "Withdrawal" || transaction.category === "Expense" && (
                          <span className="bg-red-200 text-xs font-semibold text-red-800 rounded-full px-2 py-1.5">-${transaction.ammount.toLocaleString()}</span>
                      )}
                      {transaction.category === "Deposit" && (
                          <span className="bg-green-200 text-xs font-semibold text-green-800 rounded-full px-2 py-1.5">+${transaction.ammount.toLocaleString()}</span>
                      )}
                    </h1>
                  </div>
                 
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Budget;
