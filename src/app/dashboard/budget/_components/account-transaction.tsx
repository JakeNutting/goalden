"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { manageTransactionSchema } from "../../schemas/manage-transaction";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { cn } from "@/app/lib/utils";
import { Doc } from "../../../../../convex/_generated/dataModel";

export default function AccountTransaction({ orgId, accounts }: { orgId: string, accounts: Doc<"accounts">[]}) {
  const manageTransaction = useMutation(api.transactions.manageTransaction);

  const [open, setOpen] = useState(false);

  const formSchema = manageTransactionSchema;

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      itemName: "",
      organizationId: orgId
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values == null) return;

      await manageTransaction({
        ...values,
        organizationId: orgId,
      });
      
      setOpen(false);
      form.reset();
      toast({
        title: "Transaction Created",
        variant: "success",
        description: "Your transaction was created successfully",
      });
    } catch (err) {
      toast({
        title: "Transaction Creation Failed",
        variant: "destructive",
        description: "There was an error creating your transaction",
      });
    }
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"} className="">
          Create Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">Add Account Transaction</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Name</FormLabel>
                    <FormControl>
                      <Input className="text-[16px] lg:text-sm" {...field} placeholder="Enter a transaction name"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="itemCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-[16px] lg:text-sm" >
                          <SelectValue  placeholder="Select a transaction type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Expense">Expense</SelectItem>
                        <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                        <SelectItem value="Deposit">Deposit</SelectItem>
                        <SelectItem value="Transfer">Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="spendingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spending Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger  className="text-[16px] lg:text-sm" >
                          <SelectValue placeholder="Select a spending category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Utilities">Utilities</SelectItem>
                        <SelectItem value="Groceries">Groceries</SelectItem>
                        <SelectItem value="Dining">Dining</SelectItem>
                        <SelectItem value="Rent">Rent</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                        <SelectItem value="Transportation">Transportation</SelectItem>
                        <SelectItem value="Loans">Loans</SelectItem>
                        <SelectItem value="Pleasure">Pleasure</SelectItem>
                        <SelectItem value="Salary">Salary</SelectItem>
                        <SelectItem value="Tithes">Tithes</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="itemAmmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Amount</FormLabel>
                    <FormControl>
                      <Input className="text-[16px] lg:text-sm"  {...field} type="number" value={field.value ?? ""} placeholder="The amount of your transaction" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-[16px] lg:text-sm" >
                          <SelectValue  placeholder="Select an account for the transaction" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts?.map((account) => (
                          <SelectItem value={account._id} key={account._id}>
                            <div className="flex items-center justify-between">
                              <h1 className="text-sm text-gray-500 mr-2">{account.accountName}</h1>
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
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Recurring Transaction</Label>
              </div> */}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex gap-1"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="size-4 animate-spin"></Loader2>
                )}
                Submit
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
