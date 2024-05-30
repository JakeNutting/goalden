import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { getUser } from "./users";

async function hasAccessToOrg(
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string,
  organizationId: string
) {
  const user = await getUser(ctx, tokenIdentifier);

  const hasAccess =
    user.orgIds.includes(organizationId) ||
    user.tokenIdentifier.includes(organizationId);

  return hasAccess;
}

export const createAccount = mutation({
  args: {
    accountName: v.string(),
    startingAllowance: v.number(),
    organizationId: v.string(),
    accountType: v.string()
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("You must be logged in to create an account");
    }

    // const hasAccess = await hasAccessToOrg(
    //   ctx,
    //   identity.tokenIdentifier,
    //   args.organizationId
    // );

    // if (!hasAccess) {
    //   throw new ConvexError("You don't have access to this organization");
    // }

    await ctx.db.insert("accounts", {
      accountName: args.accountName,
      startingAllowance: args.startingAllowance,
      organizationId: args.organizationId,
      accountType: args.accountType
    });
  },
});

export const deleteAccount = mutation({
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

export const getAccounts = query({
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
      .query("accounts")
      .withIndex("by_organizationId", (q) => 
        q.eq("organizationId", args.organizationId)
      )
      .collect();
  },
});
