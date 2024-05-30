import { z } from "zod"
 
export const createAccountSchema = z.object({
    accountName: z.string().min(1, {
        message: "Name must be at least 1 character",
      }).max(255),
    organizationId: z.string(),
    accountType: z.enum(["Checking", "Credit Card", "Savings"]),
    startingAllowance: z.coerce.number()
})