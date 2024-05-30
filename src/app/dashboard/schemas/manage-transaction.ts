import { z } from "zod";

export const manageTransactionSchema = z.object({
  itemName: z
    .string()
    .min(1, {
      message: "Name must be at least 1 character",
    })
    .max(255),
  itemAmmount: z.coerce.number(),
  itemCategory: z.enum(["Expense", "Withdrawal", "Deposit", "Transfer"]),
  spendingType: z.enum([
    "Utilities",
    "Groceries",
    "Dining",
    "Rent",
    "Insurance",
    "Transportion",
    "Loans",
    "Pleasure",
  ]),
  isRecurring: z.boolean()
});
