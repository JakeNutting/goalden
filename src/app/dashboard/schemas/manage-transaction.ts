import { z } from "zod";
import { zid } from "convex-helpers/server/zod";
export const manageTransactionSchema = z.object({
  itemName: z
    .string()
    .min(1, {
      message: "Name must be at least 1 character",
    })
    .max(255),
  itemAmmount: z.coerce.number(),
  organizationId: z.string(),
  accountId: zid("accounts"),
  itemCategory: z.enum(["Expense", "Withdrawal", "Deposit", "Transfer"]),
  spendingType: z.enum([
    "Utilities",
    "Groceries",
    "Dining",
    "Rent",
    "Insurance",
    "Transportation",
    "Loans",
    "Pleasure",
    "Salary",
    "Tithes",
    "Other"
  ])
});
