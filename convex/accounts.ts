import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createAccount = mutation({
    args: {
        accountName: v.string(),
        startingAllowance: v.number(),
        organizationId: v.string(),
        isActive: v.boolean()
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("You must be logged in to create an account")
        }
        await ctx.db.insert("accounts", {
            accountName: args.accountName,
            startingAllowance: args.startingAllowance,
            organizationId: args.organizationId,
            isActive: args.isActive
        });
    }
})

export const getAccounts = query({
    args: {},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) return [];
        
        return await ctx.db.query("accounts").collect();
    }
})