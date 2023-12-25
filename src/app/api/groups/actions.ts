'use server'

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function create(formData: FormData) {
    const prisma = new PrismaClient();

    // Probably not how I'm supposed to do it, but gonna do it anyway for now.

    const groupName = formData.get('groupName');
    const groupType = formData.get('groupType');

    const group = await prisma.group?.create({
        data: {
            groupName: groupName as string,
            groupType: groupType as string,
            createdById: 1,
        }
    });

    

    revalidatePath('/dashboard');
}