"use client";
import { createOrUpdate } from "@/app/api/groups/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createAccountSchema } from "../../schemas/create-account";
import { api } from "../../../../../convex/_generated/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function NewAccount({
  orgId,
}: {
  orgId: string | undefined | null;
}) {
  const createAccount = useMutation(api.accounts.createAccount);
  const [open, setOpen] = useState(false);

  const formSchema = createAccountSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      accountName: "",
      startingAllowance: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(orgId);
    if (!orgId) return;
    setOpen(false);
    createAccount({
      ...values,
      organizationId: orgId
    });
  }

  return (
    <>
    <Dialog>
      <DialogTrigger>
          <Button size={"sm"} variant={"outline"} className="">
            Create Account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-8">Add Account</DialogTitle>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startingAllowance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Starting Allowance</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
  function zodResolver(formSchema: any): import("react-hook-form").Resolver<z.infer<any>, any> | undefined {
    throw new Error("Function not implemented.");
  }

