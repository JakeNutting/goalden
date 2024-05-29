import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  accounts: defineTable({
    accountName: v.string(),
    isActive: v.boolean(),
    organizationId: v.string(),
    startingAllowance: v.float64(),
  }).index("by_organizationId", ["organizationId"]),
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.string(),
    orgIds: v.array(v.string())
  }).index("by_tokenIdentifier", ["tokenIdentifier"])
});
