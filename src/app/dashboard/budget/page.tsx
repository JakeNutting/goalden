"use client";
import { OrganizationSwitcher, useOrganization, useUser } from "@clerk/nextjs";
import NewAccount from "./_components/new-account";
import {
  Banknote,
  Car,
  CircleDollarSign,
  CirclePercent,
  CreditCard,
  HandPlatter,
  Handshake,
  Heater,
  Home,
  PiggyBank,
  ShoppingBag,
  ShoppingBasket,
  Smile,
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import { useState } from "react";
import AccountActions from "./_components/account-actions";
import AccountTransaction from "./_components/account-transaction";
import { DataTable } from "./_components/transactions-table";
import { columns } from "./_components/transaction-columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <div className="bg-blue-50 py-16 pb-10">
        <div className="mx-auto max-w-screen-xl px-2 xl:px-0">
          <div className="flex justify-between">
            <h1 className="text-dark text-3xl font-semibold flex gap-3 items-center">
              <CircleDollarSign className="text-blue-700"></CircleDollarSign>
              Budget
            </h1>
            <OrganizationSwitcher></OrganizationSwitcher>
          </div>
          <p className="my-1 mb-4 flex text-lg font-normal">
            Welcome to budgeting made easy with Goalden. Manage your accounts
            below
          </p>
        </div>
      </div>
      <Tabs defaultValue="summary">
        <TabsList className="grid w-full grid-cols-2 lg:w-1/3 lg:mx-auto mt-4">
          <TabsTrigger value="summary"><CreditCard size={18} className="mr-1"></CreditCard>Summary</TabsTrigger>
          <TabsTrigger value="budget"><PiggyBank size={18} className="mr-1"></PiggyBank> Budget</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <div className="mx-auto max-w-screen-xl px-2 xl:px-0 pt-10 bg-white">
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
                    <h1 className="text-sm text-gray-500">
                      {account.accountName}
                    </h1>
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
                    <h4 className="text-2xl font-semibold mt-2">
                      ${account.startingAllowance.toLocaleString()}
                    </h4>
                    <AccountActions account={account}></AccountActions>
                  </div>
                </div>
              ))}
            </div>
            {accounts &&
              accounts?.length > 0 &&
              transactions &&
              transactions?.length == 0 && (
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
                {/* Mobile view */}
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
                          <p className="text-gray-800 text-sm flex gap-1 items-center">
                            {getSpendingTypeIcon(transaction.spendingType)}
                            {transaction.spendingType}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {transaction.accountName}
                          </p>
                        </div>
                        <h1 className=" text-gray-500">
                          {transaction.category === "Withdrawal" ||
                            (transaction.category === "Expense" && (
                              <span className="bg-red-200 text-sm font-semibold text-red-800 rounded-full px-2 py-1.5">
                                -${transaction.ammount.toLocaleString()}
                              </span>
                            ))}
                          {transaction.category === "Deposit" && (
                            <span className="bg-green-200 text-sm font-semibold text-green-800 rounded-full px-2 py-1.5">
                              +${transaction.ammount.toLocaleString()}
                            </span>
                          )}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="budget">Nothing to see...</TabsContent>
      </Tabs>
    </>
  );
};

const getSpendingTypeIcon = (type: string) => {
  switch (type) {
    case "Groceries":
      return <ShoppingBasket size={15}></ShoppingBasket>;
    case "Transportation":
      return <Car size={15}></Car>;
    case "Salary":
      return <Banknote size={15}></Banknote>;
    case "Pleasure":
      return <Smile size={15}></Smile>;
    case "Utilities":
      return <Heater size={15}></Heater>;
    case "Tithes":
      return <CirclePercent size={15}></CirclePercent>;
    case "Dining":
      return <HandPlatter size={15}></HandPlatter>;
    case "Other":
      return <ShoppingBag size={15}></ShoppingBag>;
    case "Rent":
      return <Home size={15}></Home>;
    case "Loans":
      return <Handshake size={15}></Handshake>;
  }
};
export default Budget;
