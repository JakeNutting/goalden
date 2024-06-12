"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createAccountSchema } from "../../schemas/create-account";
import { api } from "../../../../../convex/_generated/api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function NewAccount({
  orgId,
}: {
  orgId: string | undefined | null;
}) {
  const createAccount = useMutation(api.accounts.createAccount);
  const [open, setOpen] = useState(false);

  const formSchema = createAccountSchema;

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      accountName: "",
      organizationId: orgId ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!orgId) return;

    try {
      await createAccount({
        ...values,
        organizationId: orgId,
      });
      setOpen(false);
      form.reset();
      toast({
        title: "Account Created",
        variant: "success",
        description: "Your account was created successfully",
      });
    } catch (err) {
      toast({
        title: "Account Creation Failed",
        variant: "destructive",
        description: "There was an error creating your account",
      });
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          form.reset();
        }}
      >
        <DialogTrigger asChild>
          <Button size={"sm"} variant={"outline"} className="">
            Create Account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-8">Add Account</DialogTitle>
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
                        <Input className="text-[16px] lg:text-sm" {...field} placeholder="Type a name for your account" />
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
                        <Input className="text-[16px] lg:text-sm" {...field} type="number" value={field.value ?? ""} placeholder="Enter a dollar amount" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-[16px] lg:text-sm">
                            <SelectValue placeholder="Select an account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Checking">Checking</SelectItem>
                          <SelectItem value="Savings">Savings</SelectItem>
                          <SelectItem value="Credit Card">
                            Credit Card
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting} className="flex gap-1">
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
    </>
  );
}
