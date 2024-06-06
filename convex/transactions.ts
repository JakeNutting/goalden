import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const deleteTransaction = mutation({
    args: {
      accountId: v.id("accounts")
    },
    async handler(ctx, args) {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new ConvexError("You must be logged in to delete an account");
      }
  
      await ctx.db.delete(args.accountId);
    }
  });

  export const manageTransaction = mutation({
    args: {
      itemName: v.string(),
      itemAmmount: v.number(),
      organizationId: v.string(),
      accountId: v.id("accounts"),
      itemCategory: v.string(),
      spendingType: v.string()
    },
    async handler(ctx, args) {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new ConvexError("You must be logged in to create a transaction");
      }
  
      // const hasAccess = await hasAccessToOrg(
      //   ctx,
      //   identity.tokenIdentifier,
      //   args.organizationId
      // );
  
      // if (!hasAccess) {
      //   throw new ConvexError("You don't have access to this organization");
      // }

      const account = await ctx.db.get(args.accountId);

      if (account == null) return new ConvexError("Account doesn't exist");

      if (args.itemCategory !== "Deposit" && account.accountType !== "Credit Card") {
        account.startingAllowance = account.startingAllowance - args.itemAmmount;
      } else {
        account.startingAllowance = account.startingAllowance + args.itemAmmount;
      }

      ctx.db.patch(args.accountId, account);
  
      await ctx.db.insert("transactions", {
        transactionName: args.itemName,
        ammount: args.itemAmmount,
        organizationId: args.organizationId,
        spendingType: args.spendingType,
        accountId: args.accountId,
        accountName: account.accountName,
        category: args.itemCategory
      });
    },
  });

  export const getTransactions = query({
    args: {
      organizationId: v.string(),
    },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) return [];
  
      // const hasAccess = await hasAccessToOrg(
      //   ctx,
      //   identity.tokenIdentifier,
      //   args.organizationId
      // );
  
      // if (!hasAccess) {
      //   return [];
      // }
  
      return await ctx.db
        .query("transactions")
        .withIndex("by_organizationId", (q) => 
          q.eq("organizationId", args.organizationId)
        )
        .order("desc")
        .collect();
    },
  });