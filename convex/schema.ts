import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  accounts: defineTable({
    _id: v.string(),
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

  transactions: defineTable({
    transactionName: v.string(),
    ammount: v.float64(),
    category: v.string(),
    spendingType: v.string(),
    accountId: v.id("accounts"),
    accountName: v.string(),
    organizationId: v.string()
  })
  .index("by_organizationId", ["organizationId"]),
});
