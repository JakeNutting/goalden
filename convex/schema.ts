import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  accounts: defineTable({
    accountName: v.string(),
    organizationId: v.string(),
    startingAllowance: v.float64(),
    accountType: v.string()
  })
  .index("by_organizationId", ["organizationId"]),

  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.string(),
    orgIds: v.array(v.string())
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),

  accountItems: defineTable({
    itemName: v.string(),
    itemAmmount: v.float64(),
    itemCategory: v.string(),
    spendingType: v.string(),
    isRecurring: v.boolean(),
    accountId: v.id("accounts")
  })
});
