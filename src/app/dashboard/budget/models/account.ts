import { Decimal } from "@prisma/client/runtime/library";

export interface Account {
    id: number;
    accountName: string;
    accountTypeId: number;
    startingAllowance: Decimal;
    organizationId: number;
    createdAt: Date;
    isActive: boolean;
    accountType: {
        id: number;
        type: string;
        isActive: boolean;
    };
}