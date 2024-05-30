import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const deleteItem = mutation({
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