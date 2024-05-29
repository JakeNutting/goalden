import { z } from "zod"
 
export const createAccountSchema = z.object({
    accountName: z.string().min(1, {
        message: "Name must be at least 1 character",
      }).max(255),
    isActive: z.boolean().default(true),
    organizationId: z.string(),
    startingAllowance: z.coerce.number().positive({message: "Allowance must be greater than 0"})
})